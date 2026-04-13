#!/bin/bash
# =============================================================
# mongodb-restore-r2.sh — Restauration MongoDB depuis R2
# Projet : ayur-veda / OVH K3s — Disaster Recovery
# Usage  : bash scripts/mongodb-restore-r2.sh [backup-file.tar.gz]
# =============================================================
set -euo pipefail

R2_BUCKET="${R2_BUCKET:-ayur-veda-backups}"
R2_ENDPOINT="https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"
NAMESPACE="${NAMESPACE:-ayur}"
TMP_DIR=$(mktemp -d)

cleanup() { rm -rf "${TMP_DIR}"; }
trap cleanup EXIT

log() { echo "[$(date -Iseconds)] $*"; }

r2() {
  AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
  AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
  aws s3 "$@" --endpoint-url "${R2_ENDPOINT}"
}

# --- 1. Sélection du backup ---
if [[ -z "${1:-}" ]]; then
  log "Aucun fichier spécifié — récupération du dernier backup"
  r2 cp "s3://${R2_BUCKET}/mongodb/latest.txt" "${TMP_DIR}/latest.txt"
  BACKUP_FILE=$(cat "${TMP_DIR}/latest.txt")
  log "Dernier backup : ${BACKUP_FILE}"
else
  BACKUP_FILE="$1"
fi

# --- 2. Lister les 5 derniers backups disponibles ---
log "Backups disponibles sur R2 :"
r2 ls "s3://${R2_BUCKET}/mongodb/" | grep "backup-" | sort -r | head -5

# --- 3. Télécharger depuis R2 ---
log "Téléchargement : ${BACKUP_FILE}"
r2 cp "s3://${R2_BUCKET}/mongodb/${BACKUP_FILE}" "${TMP_DIR}/${BACKUP_FILE}"
r2 cp "s3://${R2_BUCKET}/mongodb/${BACKUP_FILE}.md5" "${TMP_DIR}/${BACKUP_FILE}.md5"

# --- 4. Vérifier l'intégrité ---
log "Vérification intégrité md5sum..."
(cd "${TMP_DIR}" && md5sum -c "${BACKUP_FILE}.md5") \
  || { log "❌ Intégrité corrompue ! Abandon."; exit 1; }
log "✓ Intégrité OK"

# --- 5. Décompresser ---
log "Décompression..."
tar -xzf "${TMP_DIR}/${BACKUP_FILE}" -C "${TMP_DIR}"

# --- 6. Copier dans le pod MongoDB ---
log "Copie vers le pod MongoDB..."
kubectl cp "${TMP_DIR}/dump.archive" "${NAMESPACE}/mongodb-0:/tmp/dump.archive"

# --- 7. Restaurer ---
log "Restauration MongoDB (--drop : supprime les collections existantes)"
kubectl exec -n "${NAMESPACE}" statefulset/mongodb -- \
  mongorestore \
    --archive=/tmp/dump.archive \
    --drop \
    --quiet

# --- 8. Vérification post-restore ---
log "Vérification post-restauration..."
DOC_COUNT=$(kubectl exec -n "${NAMESPACE}" statefulset/mongodb -- \
  mongosh --quiet --eval \
  "db.getSiblingDB('ayur').dosha_profiles.countDocuments()")

log "✅ Restauration terminée — ${DOC_COUNT} documents restaurés"
log "✅ Backup source : ${BACKUP_FILE}"
