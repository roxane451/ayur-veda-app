#!/usr/bin/env bash
# Usage : scripts/deploy-preprod.sh
# Déploie l'infra préprod Ayur-Veda (Terraform OVH + Ansible K3s + Helm + ExternalSecrets) en une seule commande.

set -euo pipefail

# --- Configuration ---
TF_DIR="infra/terraform"
ANSIBLE_DIR="infra/ansible"
HELM_CHART_DIR="helm-chart"
NAMESPACE_PREPROD="ayur-preprod"
TF_WORKSPACE="ayur-veda-preprod"

print_section() {
  echo ""
  echo "===== $* ====="
}

# 1) Terraform OVH
print_section "Terraform init/validate/apply"
cd "$TF_DIR"
terraform init
terraform fmt -check
terraform validate

# workspace should already exist. change if besoin.
if ! terraform workspace list | grep -q "${TF_WORKSPACE}"; then
  terraform workspace new "${TF_WORKSPACE}"
fi
terraform workspace select "${TF_WORKSPACE}"
terraform plan -out=tfplan -var-file=terraform.tfvars
terraform apply -auto-approve tfplan

# 2) Ansible K3s
print_section "Ansible K3s préprod"
cd "../${ANSIBLE_DIR}"
ansible-playbook -i inventories/preprod playbook-k3s.yml --limit preprod

# 3) Infisical bootstrap secret
print_section "Bootstrap Infisical token"
# besoin d'exporter INFISICAL_SERVICE_TOKEN avant d'exécuter le script
if [ -z "${INFISICAL_SERVICE_TOKEN:-}" ]; then
  echo "ATTENTION : variable d'environnement INFISICAL_SERVICE_TOKEN non définie (préprod)."
  echo "Exemple : INFISICAL_SERVICE_TOKEN=st.xxxx bash scripts/deploy-preprod.sh"
  exit 1
fi
bash "$(pwd)/../../secret/bootstrap-infisical.sh" "$NAMESPACE_PREPROD"

# 4) Helm application + external secrets
print_section "Helm déploiement préprod"
cd "../../${HELM_CHART_DIR}"
helm upgrade --install ayur-veda-preprod . \
  --namespace "${NAMESPACE_PREPROD}" \
  -f values-k3s-base.yaml \
  -f values-preprod.yaml \
  --set externalSecrets.enabled=true

# 5) Vérifications post-déploiement
print_section "Vérifications post déploiement"
kubectl get nodes
kubectl get namespaces | grep "${NAMESPACE_PREPROD}"
kubectl -n "${NAMESPACE_PREPROD}" get pods
kubectl -n "${NAMESPACE_PREPROD}" get ingress
kubectl -n "${NAMESPACE_PREPROD}" get externalsecret

print_section "Terminé"

echo "Déploiement préprod terminé."
