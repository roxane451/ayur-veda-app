#!/bin/bash
# =============================================================
# mongodb-restore-r2.sh — Restauration MongoDB depuis R2
# Projet : ayur-veda / OVH K3s — Disaster Recovery
#
# Aligné sur le format produit par le CronJob K8s mongodb-backup
# (seule source de vérité pour les backups) :
#   - fichier .archive.gz produit par `mongodump --archive --gzip`
#   - base réelle : ayurveda (pas ayur / ayur-veda)
#   - authentification requise (mongodb-secret)
#
# Usage : bash scripts/mongodb-restore-r2.sh [backup-file.archive.gz]
#   Sans argument : restaure le dernier backup (latest.txt sur R2)
# =============================================================
set -euo pipefail

R2_BUCKET="${R2_BUCKET:-ayur-veda-backups}"
R2_ENDPOINT="https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"
NAMESPACE="${NAMESPACE:-ayur}"
DB_NAME="${DB_NAME:-ayurveda}"
TMP_DIR=$(mktemp -d)

cleanup() { rm -rf "${TMP_DIR}"; }
trap cleanup EXIT

log() { echo "[$(date -Iseconds)] $*"; }

r2() {
  AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
  AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
  aws s3 "$@" --endpoint-url "${R2_ENDPOINT}"
}

# --- 0. Confirmation explicite (--drop supprime les collections existantes) ---
read -r -p "⚠️  Ceci va REMPLACER le contenu de la base '${DB_NAME}' dans le namespace '${NAMESPACE}'. Continuer ? [y/N] " CONFIRM
if [[ "${CONFIRM}" != "y" && "${CONFIRM}" != "Y" ]]; then
  log "Annulé."
  exit 0
fi

# --- 1. Sélection du backup ---
if [[ -z "${1:-}" ]]; then
  log "Aucun fichier spécifié — récupération du dernier backup"
  r2 cp "s3://${R2_BUCKET}/mongodb/latest.txt" "${TMP_DIR}/latest.txt"
  BACKUP_FILE=$(cat "${TMP_DIR}/latest.txt")
  log "Dernier backup : ${BACKUP_FILE}"
else
  BACKUP_FILE="$1"
fi

# --- 2. Lister les backups disponibles (traçabilité avant restore) ---
log "Backups disponibles sur R2 :"
r2 ls "s3://${R2_BUCKET}/mongodb/" | grep "ayur-veda-backup-" | sort -r | head -5

# --- 3. Télécharger depuis R2 ---
log "Téléchargement : ${BACKUP_FILE}"
r2 cp "s3://${R2_BUCKET}/mongodb/${BACKUP_FILE}" "${TMP_DIR}/${BACKUP_FILE}"

BACKUP_SIZE=$(du -sh "${TMP_DIR}/${BACKUP_FILE}" | cut -f1)
log "Taille du backup téléchargé : ${BACKUP_SIZE}"

# --- 4. Garde-fou : un dump valide fait plus que quelques centaines d'octets ---
BACKUP_BYTES=$(stat -c%s "${TMP_DIR}/${BACKUP_FILE}" 2>/dev/null || stat -f%z "${TMP_DIR}/${BACKUP_FILE}")
if [[ "${BACKUP_BYTES}" -lt 1024 ]]; then
  log "❌ Le backup ne fait que ${BACKUP_BYTES} octets — probablement un dump vide (mauvais --db ?). Abandon."
  exit 1
fi

# --- 5. Copier l'archive dans le pod MongoDB ---
log "Copie vers le pod MongoDB..."
kubectl cp "${TMP_DIR}/${BACKUP_FILE}" "${NAMESPACE}/mongodb-0:/tmp/restore.archive.gz"

# --- 6. Restaurer (authentifié, --gzip car le CronJob dump avec --gzip) ---
log "Restauration MongoDB (--drop : supprime les collections existantes de '${DB_NAME}')"
kubectl exec -n "${NAMESPACE}" statefulset/mongodb -- bash -c "
  mongorestore \
    --username=\"\${MONGO_USERNAME}\" \
    --password=\"\${MONGO_PASSWORD}\" \
    --authenticationDatabase=admin \
    --archive=/tmp/restore.archive.gz \
    --gzip \
    --drop \
    --quiet
"

# --- 7. Nettoyage du fichier temporaire dans le pod ---
kubectl exec -n "${NAMESPACE}" statefulset/mongodb -- rm -f /tmp/restore.archive.gz

# --- 8. Vérification post-restore (vraies collections de la base ayurveda) ---
log "Vérification post-restauration..."
kubectl exec -n "${NAMESPACE}" statefulset/mongodb -- bash -c "
  mongosh --quiet \
    --username=\"\${MONGO_USERNAME}\" --password=\"\${MONGO_PASSWORD}\" \
    --authenticationDatabase=admin \
    --eval \"
      const db = db.getSiblingDB('${DB_NAME}');
      ['doshas','quizresults','users','ritucharyas','spices'].forEach(c =>
        print(c + ': ' + db.getCollection(c).countDocuments())
      );
    \"
"

log "✅ Restauration terminée"
log "✅ Backup source : ${BACKUP_FILE} (${BACKUP_SIZE})"
