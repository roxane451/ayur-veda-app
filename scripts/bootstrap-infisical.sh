#!/bin/bash
# =============================================================
# bootstrap-infisical.sh
# Crée le Secret K8s contenant le token Infisical
# À exécuter UNE SEULE FOIS par environnement
#
# Usage :
#   INFISICAL_SERVICE_TOKEN=st.xxx bash scripts/bootstrap-infisical.sh ayur
#   INFISICAL_SERVICE_TOKEN=st.xxx bash scripts/bootstrap-infisical.sh ayur-preprod
#
# Secrets à créer dans Infisical AVANT d'exécuter ce script :
#   Environment "production" :
#     JWT_SECRET, MONGODB_URI, MONGODB_USER, MONGODB_PASSWORD
#     OVH_APP_KEY, OVH_APP_SECRET, OVH_CONSUMER_KEY
#   Environment "preprod" : (mêmes clés, valeurs différentes)
#     JWT_SECRET, MONGODB_URI, MONGODB_USER, MONGODB_PASSWORD
# =============================================================
set -euo pipefail

usage() {
  cat << 'EOF'
Usage:
  INFISICAL_SERVICE_TOKEN=st.xxx bash scripts/bootstrap-infisical.sh [namespace]

Examples:
  INFISICAL_SERVICE_TOKEN=st.xxx bash scripts/bootstrap-infisical.sh ayur
  INFISICAL_SERVICE_TOKEN=st.xxx bash scripts/bootstrap-infisical.sh ayur-preprod
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

NAMESPACE="${1:-ayur}"
SECRET_NAME="infisical-token"

log() { echo "[$(date -Iseconds)] $*"; }

if [[ -z "${INFISICAL_SERVICE_TOKEN:-}" ]]; then
  cat << 'EOF'
Usage : INFISICAL_SERVICE_TOKEN=st.xxx bash scripts/bootstrap-infisical.sh [namespace]

Namespaces :
  bash scripts/bootstrap-infisical.sh ayur          # production
  bash scripts/bootstrap-infisical.sh ayur-preprod  # preprod

Obtenir le token Infisical :
  1. app.infisical.com → Project "ayur-veda-prod"
  2. Project Settings → Machine Identities → Create
  3. Permissions : Read on environment "production" (ou "preprod")
  4. Copier le token (st.xxxx...)

Secrets requis dans Infisical :
  Env "production" ET "preprod" :
    JWT_SECRET          → openssl rand -hex 32
    MONGODB_URI         → mongodb://user:pass@mongodb:27017/ayur
    MONGODB_USER        → nom utilisateur MongoDB
    MONGODB_PASSWORD    → mot de passe MongoDB

  Env "production" uniquement (pour Terraform CI) :
    OVH_APP_KEY         → depuis api.ovh.com/createToken
    OVH_APP_SECRET
    OVH_CONSUMER_KEY

EOF
  exit 1
fi

log "Namespace cible : ${NAMESPACE}"

# Créer le namespace si besoin
kubectl get namespace "${NAMESPACE}" &>/dev/null || \
  kubectl create namespace "${NAMESPACE}"

# Supprimer l'ancien secret si présent (rotation)
kubectl delete secret "${SECRET_NAME}" -n "${NAMESPACE}" \
  --ignore-not-found=true

# Créer le secret
kubectl create secret generic "${SECRET_NAME}" \
  --from-literal=serviceToken="${INFISICAL_SERVICE_TOKEN}" \
  -n "${NAMESPACE}"

log "✅ Secret '${SECRET_NAME}' créé dans le namespace '${NAMESPACE}'"
log ""
log "Vérifications :"

if [[ "${NAMESPACE}" == "ayur-preprod" ]]; then
  log "  kubectl get clustersecretstore infisical-store-preprod"
else
  log "  kubectl get clustersecretstore infisical-store"
fi

log "  kubectl get externalsecret ayur-app-secrets -n ${NAMESPACE}"
log "  → STATUS doit afficher : SecretSynced / True"
