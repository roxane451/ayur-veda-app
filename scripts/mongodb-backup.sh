#!/bin/bash

# 🔄 MongoDB Backup & Restore Script
# Automatise les backups MongoDB et gère la rétention
# Legacy script: préférer scripts/mongodb-backup-r2.sh

set -euo pipefail

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
    cat << 'EOF'
Legacy script (local backup/restore workflow).
Preferred script:
  bash scripts/mongodb-backup-r2.sh
EOF
    exit 0
fi

# Configuration
NAMESPACE="ayur"
BACKUP_DIR="${HOME}/.ayur-backups"
RETENTION_DAYS=30  # Garder 30 jours de backups
BACKUP_FORMAT="tar.gz"  # ou "mongodump"
S3_ENABLED=false  # À activer pour S3
S3_BUCKET="your-s3-bucket/ayur-backups"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Functions
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Vérifier si MongoDB est accessible
check_mongodb() {
    print_info "Vérification de MongoDB..."

    if ! kubectl exec -n "$NAMESPACE" mongodb-0 -- mongosh --eval "db.adminCommand('ping')" &>/dev/null; then
        print_error "MongoDB non accessible"
        return 1
    fi

    print_success "MongoDB accessible"
    return 0
}

# Créer le répertoire de backup
setup_backup_dir() {
    mkdir -p "$BACKUP_DIR"
    print_info "Répertoire de backup: $BACKUP_DIR"
}

# Backup MongoDB method 1: mongodump
backup_mongodump() {
    print_header "🔄 BACKUP MONGODB - Méthode mongodump"

    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_name="mongodb-backup-${timestamp}"
    local backup_path="${BACKUP_DIR}/${backup_name}"

    print_info "Démarrage du backup: $backup_name"

    # Créer répertoire temporaire
    kubectl exec -n "$NAMESPACE" mongodb-0 -- mkdir -p /tmp/mongodump

    # Exécuter mongodump
    print_info "Exécution de mongodump..."
    kubectl exec -n "$NAMESPACE" mongodb-0 -- \
        mongodump \
        --out=/tmp/mongodump \
        --quiet

    # Compresser
    print_info "Compression du backup..."
    kubectl exec -n "$NAMESPACE" mongodb-0 -- \
        tar -czf "/tmp/${backup_name}.tar.gz" -C /tmp mongodump/

    # Copier localement
    print_info "Téléchargement du backup..."
    kubectl cp "$NAMESPACE/mongodb-0:/tmp/${backup_name}.tar.gz" "${backup_path}.tar.gz"

    # Nettoyer pods
    kubectl exec -n "$NAMESPACE" mongodb-0 -- rm -rf /tmp/mongodump "/tmp/${backup_name}.tar.gz"

    # Calculate size
    local size=$(du -h "${backup_path}.tar.gz" | cut -f1)

    print_success "Backup créé: ${backup_path}.tar.gz (${size})"

    # Upload to S3 if enabled
    if [ "$S3_ENABLED" = "true" ]; then
        upload_to_s3 "${backup_path}.tar.gz" "$backup_name"
    fi

    echo "$backup_path"
}

# Backup MongoDB method 2: Snapshot (pour replicated MongoDB)
backup_snapshot() {
    print_header "📸 BACKUP MONGODB - Méthode Snapshot"

    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_name="mongodb-snapshot-${timestamp}"

    print_info "Exécution du snapshot MongoDB..."

    # Create checkpoint
    kubectl exec -n "$NAMESPACE" mongodb-0 -- mongosh --eval \
        "db.fsyncLock()" || true

    sleep 2

    # Backup les volumes PVC
    print_info "Snapshot des volumes PVC..."

    # Get PVC names
    local pvcs=$(kubectl get pvc -n "$NAMESPACE" -l app=mongodb -o jsonpath='{.items[*].metadata.name}')

    for pvc in $pvcs; do
        print_info "Sauvegarde de PVC: $pvc"
        kubectl get pvc "$pvc" -n "$NAMESPACE" -o yaml > "${BACKUP_DIR}/${pvc}-${timestamp}.yaml"
    done

    # Release lock
    kubectl exec -n "$NAMESPACE" mongodb-0 -- mongosh --eval \
        "db.fsyncUnlock()" || true

    print_success "Snapshot complété: $backup_name"

    echo "${BACKUP_DIR}/${backup_name}"
}

# Restore from backup
restore_backup() {
    local backup_file="$1"

    if [ -z "$backup_file" ] || [ ! -f "$backup_file" ]; then
        print_error "Fichier de backup non trouvé: $backup_file"
        return 1
    fi

    print_header "🔄 RESTAURATION MONGODB"

    print_info "Fichier de backup: $backup_file"

    # Demander confirmation
    echo -e "${YELLOW}⚠️  ATTENTION: Ceci va remplacer les données existantes!${NC}"
    read -p "Êtes-vous sûr? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Restauration annulée"
        return 0
    fi

    # Copier backup vers pod
    print_info "Upload du backup vers pod..."
    local backup_filename=$(basename "$backup_file")
    kubectl cp "$backup_file" "$NAMESPACE/mongodb-0:/tmp/$backup_filename"

    # Extract
    print_info "Extraction du backup..."
    kubectl exec -n "$NAMESPACE" mongodb-0 -- \
        tar -xzf "/tmp/$backup_filename" -C /tmp

    # Drop existing data
    print_warning "Suppression des données existantes..."
    kubectl exec -n "$NAMESPACE" mongodb-0 -- mongosh --eval \
        "db.getMongo().getDBs().databases.forEach(db => { if(db.name != 'admin' && db.name != 'config' && db.name != 'local') db.dropDatabase(); })"

    # Restore
    print_info "Restauration en cours..."
    kubectl exec -n "$NAMESPACE" mongodb-0 -- \
        mongorestore /tmp/mongodump --quiet

    # Cleanup
    kubectl exec -n "$NAMESPACE" mongodb-0 -- rm -rf /tmp/mongodump "/tmp/$backup_filename"

    print_success "Restauration complétée!"
}

# List backups
list_backups() {
    print_header "📋 BACKUPS DISPONIBLES"

    if [ ! -d "$BACKUP_DIR" ] || [ -z "$(ls -A "$BACKUP_DIR")" ]; then
        print_info "Aucun backup trouvé"
        return
    fi

    echo "Date              | Nom                           | Taille"
    echo "─────────────────────────────────────────────────────────"

    ls -lht "$BACKUP_DIR" | tail -n +2 | while read -r line; do
        local size=$(echo "$line" | awk '{print $5}')
        local date=$(echo "$line" | awk '{print $6, $7, $8}')
        local file=$(echo "$line" | awk '{print $NF}')
        printf "%-17s | %-29s | %s\n" "$date" "$file" "$size"
    done
}

# Cleanup old backups
cleanup_old_backups() {
    print_header "🧹 NETTOYAGE DES VIEUX BACKUPS"

    print_info "Gardant backups de moins de $RETENTION_DAYS jours..."

    find "$BACKUP_DIR" -name "*.tar.gz" -mtime "+$RETENTION_DAYS" | while read -r file; do
        local size=$(du -h "$file" | cut -f1)
        print_info "Suppression: $(basename "$file") ($size)"
        rm "$file"
    done

    print_success "Nettoyage complété"
}

# Upload to S3
upload_to_s3() {
    local file="$1"
    local backup_name="$2"

    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI non trouvé - installation recommandée"
        print_info "brew install awscli"
        return 1
    fi

    print_info "Upload vers S3: s3://$S3_BUCKET/$backup_name.tar.gz"

    aws s3 cp "$file" "s3://$S3_BUCKET/$backup_name.tar.gz" \
        --storage-class GLACIER \
        --metadata "date=$(date),source=ayur-veda-preprod"

    print_success "Upload S3 complété"
}

# Full backup (all resources)
backup_full() {
    print_header "📦 BACKUP COMPLET"

    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="${BACKUP_DIR}/ayur-full-backup-${timestamp}.yaml"

    print_info "Backup de toutes les ressources K3S..."

    # Backup manifests
    kubectl get all -n "$NAMESPACE" -o yaml > "$backup_file"
    kubectl get secrets -n "$NAMESPACE" -o yaml >> "$backup_file"
    kubectl get configmaps -n "$NAMESPACE" -o yaml >> "$backup_file"
    kubectl get pvc -n "$NAMESPACE" -o yaml >> "$backup_file"

    print_success "Backup manifests: $backup_file"

    # Also backup MongoDB
    backup_mongodump

    print_success "Backup complet créé"
}

# Help menu
show_help() {
    cat <<EOF
🔄 Ayur-Veda MongoDB Backup & Restore Script

USAGE:
    $(basename "$0") [COMMAND] [OPTIONS]

COMMANDS:
    backup              Créer un backup MongoDB
    restore <file>      Restaurer depuis un backup
    list                Lister les backups disponibles
    cleanup             Nettoyer les vieux backups
    full                Backup complet (MongoDB + manifests)
    s3-sync             Upload tous les backups vers S3
    help                Afficher cette aide

EXAMPLES:
    # Créer un backup
    $(basename "$0") backup

    # Restaurer depuis un backup spécifique
    $(basename "$0") restore ~/.ayur-backups/mongodb-backup-20260210_120000.tar.gz

    # Lister les backups
    $(basename "$0") list

    # Nettoyer les backups de plus de 30 jours
    $(basename "$0") cleanup

    # Backup complet
    $(basename "$0") full

CONFIG:
    BACKUP_DIR:        $BACKUP_DIR
    RETENTION_DAYS:    $RETENTION_DAYS
    S3_ENABLED:        $S3_ENABLED
    S3_BUCKET:         $S3_BUCKET

POUR ACTIVER S3:
    1. Installer AWS CLI: brew install awscli
    2. Configurer credentials: aws configure
    3. Modifier S3_ENABLED=true dans ce script
    4. Définir S3_BUCKET="your-bucket"

EOF
}

# Main
main() {
    local command="${1:-help}"

    setup_backup_dir

    case "$command" in
        backup)
            check_mongodb || exit 1
            backup_mongodump
            ;;
        restore)
            if [ -z "$2" ]; then
                print_error "Fichier de backup requis"
                show_help
                exit 1
            fi
            check_mongodb || exit 1
            restore_backup "$2"
            ;;
        list)
            list_backups
            ;;
        cleanup)
            cleanup_old_backups
            ;;
        full)
            check_mongodb || exit 1
            backup_full
            ;;
        s3-sync)
            if [ "$S3_ENABLED" != "true" ]; then
                print_error "S3 non activé dans le script"
                exit 1
            fi
            for file in "$BACKUP_DIR"/*.tar.gz; do
                if [ -f "$file" ]; then
                    upload_to_s3 "$file" "$(basename "$file" .tar.gz)"
                fi
            done
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Commande inconnue: $command"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
