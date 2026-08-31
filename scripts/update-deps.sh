#!/bin/bash
# Script de mise à jour des dépendances du projet
# Usage: ./scripts/update-deps.sh

set -e

echo "======================================"
echo "Mise à jour des dépendances du projet"
echo "======================================"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
  echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
  echo -e "${RED}✗${NC} $1"
}

# 1. Racine du projet
echo "1️⃣  Mise à jour des dépendances à la racine..."
if npm outdated --prefix . 2>/dev/null | tail -n +2 | grep -q .; then
  npm update --prefix .
  log_info "Dépendances racine mises à jour"
else
  log_info "Dépendances racine déjà à jour"
fi
echo ""

# 2. Backend
echo "2️⃣  Mise à jour des dépendances du backend..."
if npm outdated --prefix backend 2>/dev/null | tail -n +2 | grep -q .; then
  npm update --prefix backend
  log_info "Dépendances backend mises à jour"
else
  log_info "Dépendances backend déjà à jour"
fi
echo ""

# 3. Frontend
echo "3️⃣  Mise à jour des dépendances du frontend..."
if npm outdated --prefix frontend 2>/dev/null | tail -n +2 | grep -q .; then
  npm update --prefix frontend
  log_info "Dépendances frontend mises à jour"
else
  log_info "Dépendances frontend déjà à jour"
fi
echo ""

# 4. Vérification avec npm audit
echo "4️⃣  Vérification de sécurité (npm audit)..."
echo ""

backends_audit=0
frontend_audit=0

echo "  Backend audit..."
npm audit --prefix backend --audit-level=high 2>/dev/null || backends_audit=$?

echo "  Frontend audit..."
npm audit --prefix frontend --audit-level=high 2>/dev/null || frontend_audit=$?

if [ $backends_audit -eq 0 ] && [ $frontend_audit -eq 0 ]; then
  log_info "Aucune vulnérabilité détectée"
else
  log_warn "Quelques vulnérabilités détectées — review recommandé"
fi

echo ""
echo "======================================"
log_info "Mise à jour terminée !"
echo "======================================"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Revise les changements : git status"
echo "   2. Teste ton application : npm run dev (backend) & npm run dev (frontend)"
echo "   3. Commit les mises à jour : git add . && git commit -m 'chore: update dependencies'"
echo ""
