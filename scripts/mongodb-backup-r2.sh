#!/bin/bash
# =============================================================
# mongodb-backup-r2.sh — Backup MongoDB → Cloudflare R2
# Projet : ayur-veda / OVH K3s
# Usage  : bash scripts/mongodb-backup-r2.sh
# =============================================================
set -euo pipefail

usage() {
  cat << 'EOF'
Usage:
  bash scripts/mongodb-backup-r2.sh

Required env vars:
  CF_ACCOUNT_ID
  R2_ACCESS_KEY_ID
  R2_SECRET_ACCESS_KEY

Optional env vars:
  R2_BUCKET (default: ayur-veda-backups)
  NAMESPACE (default: ayur)
  DB_NAME (default: ayur)
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

# --- Config (injectée via env / GitHub Actions Secrets) ---
R2_BUCKET="${R2_BUCKET:-ayur-veda-backups}"
R2_ENDPOINT="https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"
NAMESPACE="${NAMESPACE:-ayur}"
DB_NAME="${DB_NAME:-ayur}"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y-%m-%d_%H-%M)
BACKUP_FILE="backup-${TIMESTAMP}.tar.gz"
TMP_DIR=$(mktemp -d)

cleanup() { rm -rf "${TMP_DIR}"; }
trap cleanup EXIT

log() { echo "[$(date -Iseconds)] $*"; }

# --- 1. Dump MongoDB depuis le pod K8s ---
log "Dump MongoDB (namespace: ${NAMESPACE})"
kubectl exec -n "${NAMESPACE}" statefulset/mongodb -- \
  mongodump --db "${DB_NAME}" --archive=/tmp/dump.archive --quiet

# --- 2. Récupérer et compresser ---
log "Compression → ${BACKUP_FILE}"
kubectl cp "${NAMESPACE}/mongodb-0:/tmp/dump.archive" "${TMP_DIR}/dump.archive"
tar -czf "${TMP_DIR}/${BACKUP_FILE}" -C "${TMP_DIR}" dump.archive
md5sum "${TMP_DIR}/${BACKUP_FILE}" > "${TMP_DIR}/${BACKUP_FILE}.md5"

BACKUP_SIZE=$(du -sh "${TMP_DIR}/${BACKUP_FILE}" | cut -f1)
log "Taille backup : ${BACKUP_SIZE}"

# --- 3. Upload vers Cloudflare R2 (AWS CLI S3-compatible) ---
log "Upload vers R2 : s3://${R2_BUCKET}/mongodb/${BACKUP_FILE}"
AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
aws s3 cp "${TMP_DIR}/${BACKUP_FILE}" \
  "s3://${R2_BUCKET}/mongodb/${BACKUP_FILE}" \
  --endpoint-url "${R2_ENDPOINT}" \
  --no-progress

AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
aws s3 cp "${TMP_DIR}/${BACKUP_FILE}.md5" \
  "s3://${R2_BUCKET}/mongodb/${BACKUP_FILE}.md5" \
  --endpoint-url "${R2_ENDPOINT}" \
  --no-progress

# --- 4. Mettre à jour le pointeur "latest" ---
echo "${BACKUP_FILE}" > "${TMP_DIR}/latest.txt"
AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
aws s3 cp "${TMP_DIR}/latest.txt" \
  "s3://${R2_BUCKET}/mongodb/latest.txt" \
  --endpoint-url "${R2_ENDPOINT}" \
  --no-progress

# --- 5. Nettoyage backups > RETENTION_DAYS ---
log "Nettoyage backups > ${RETENTION_DAYS} jours"
CUTOFF=$(date -d "${RETENTION_DAYS} days ago" +%Y-%m-%d)
AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
aws s3 ls "s3://${R2_BUCKET}/mongodb/" \
  --endpoint-url "${R2_ENDPOINT}" | \
  awk '{print $4}' | grep "^backup-" | while read -r f; do
    FILE_DATE=$(echo "${f}" | grep -oP '\d{4}-\d{2}-\d{2}')
    if [[ "${FILE_DATE}" < "${CUTOFF}" ]]; then
      log "Suppression ancien backup : ${f}"
      AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}" \
      AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}" \
      aws s3 rm "s3://${R2_BUCKET}/mongodb/${f}" \
        --endpoint-url "${R2_ENDPOINT}"
    fi
  done

log "✅ Backup ${BACKUP_FILE} (${BACKUP_SIZE}) uploadé sur Cloudflare R2"
