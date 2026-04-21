.DEFAULT_GOAL := help
SHELL         := /bin/bash

APP_NAME     := ayur-veda
NAMESPACE_ST := ayur-staging
NAMESPACE_PP := ayur-preprod
NAMESPACE_PR := ayur
CHART_DIR    := ../ayur-veda-helm

.PHONY: help \
        install update-deps audit fix-lock-backend helm-deps \
        dev down logs ps \
        lint \
        test test-backend test-frontend test-coverage \
        migrate migrate-down migrate-status migrate-create migrate-prod \
        build \
        deploy-staging deploy-preprod deploy-prod \
        secrets-init hooks-install

# ──────────────────────────────────────────────────────────────────────────────
help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-26s\033[0m %s\n", $$1, $$2}'

# ──────────────────────────────────────────────────────────────────────────────
# INSTALL & DÉPENDANCES
# ──────────────────────────────────────────────────────────────────────────────
install: ## Installe toutes les dépendances (backend + frontend en une fois)
	npm ci

update-deps: ## Met à jour toutes les dépendances
	npm update
	npm update --workspace=backend
	npm update --workspace=frontend

audit: ## Vérifie les vulnérabilités npm (niveau high+)
	npm audit --workspace=backend  --audit-level=high
	npm audit --workspace=frontend --audit-level=high

fix-lock-backend: ## Régénère le package-lock.json racine
	npm install

helm-deps: ## Met à jour les dépendances du chart Helm
	cd $(CHART_DIR) && helm dependency update && helm dependency list

# ──────────────────────────────────────────────────────────────────────────────
# DÉVELOPPEMENT LOCAL
# ──────────────────────────────────────────────────────────────────────────────
dev: ## Démarre l'environnement complet (docker-compose)
	docker compose -f docker-compose.yml up --build

down: ## Arrête l'environnement local et supprime les volumes
	docker compose -f docker-compose.yml down -v

logs: ## Affiche les logs en temps réel
	docker compose -f docker-compose.yml logs -f

ps: ## Affiche l'état des services docker-compose
	docker compose -f docker-compose.yml ps

# ──────────────────────────────────────────────────────────────────────────────
# QUALITÉ
# ──────────────────────────────────────────────────────────────────────────────
lint: ## Lance tous les linters (pre-commit sur tous les fichiers)
	pre-commit run --all-files

# ──────────────────────────────────────────────────────────────────────────────
# TESTS
# ──────────────────────────────────────────────────────────────────────────────
test: test-backend test-frontend ## Lance tous les tests (backend + frontend)

test-backend: ## Tests backend (Jest + ts-jest + mongodb-memory-server)
	npm test --workspace=backend

test-frontend: ## Tests frontend (Vitest + Testing Library)
	npm test --workspace=frontend

test-coverage: ## Coverage complète backend + frontend
	npm run test:coverage --workspace=backend
	npm run test:coverage --workspace=frontend
	@echo ""
	@echo "Rapports de coverage :"
	@echo "  backend  -> backend/coverage/index.html"
	@echo "  frontend -> frontend/coverage/index.html"

# ──────────────────────────────────────────────────────────────────────────────
# MIGRATIONS MONGODB
# ──────────────────────────────────────────────────────────────────────────────
migrate: ## Applique les migrations en attente (dev/staging)
	cd backend && npx migrate-mongo up

migrate-down: ## Rollback de la dernière migration (dev uniquement)
	cd backend && npx migrate-mongo down

migrate-status: ## Affiche l'état de toutes les migrations
	cd backend && npx migrate-mongo status

migrate-create: ## Crée une migration — usage : make migrate-create NOM=add-user-field
	@if [ -z "$(NOM)" ]; then \
		echo "Usage : make migrate-create NOM=mon-nom-de-migration"; \
		exit 1; \
	fi
	cd backend && npx migrate-mongo create $(NOM)
	@echo "Migration creee dans backend/migrations/"

migrate-prod: ## Applique les migrations en PRODUCTION (backup obligatoire avant)
	@echo "Migration en PRODUCTION sur l'URI configuree dans backend/.env"
	@echo "Avez-vous fait un backup MongoDB ? (voir docs/BACKUP.md)"
	@read -p "Confirmer la migration prod ? (oui/non) : " confirm && [ "$$confirm" = "oui" ]
	cd backend && npx migrate-mongo up
	@echo "Migrations production appliquees"

# ──────────────────────────────────────────────────────────────────────────────
# BUILD
# ──────────────────────────────────────────────────────────────────────────────
build: ## Build les images Docker localement
	docker build -t ghcr.io/roxane451/$(APP_NAME)/backend:local  ./backend
	docker build -t ghcr.io/roxane451/$(APP_NAME)/frontend:local ./frontend

# ──────────────────────────────────────────────────────────────────────────────
# DÉPLOIEMENT
# ──────────────────────────────────────────────────────────────────────────────
deploy-staging: helm-deps ## Déploie sur k3d local (staging)
	helm upgrade --install $(APP_NAME) $(CHART_DIR) \
		-f $(CHART_DIR)/values-k3d.yaml \
		--namespace $(NAMESPACE_ST) --create-namespace \
		--wait --timeout 5m

deploy-preprod: helm-deps ## Déploie sur preprod (VPS OVH)
	helm upgrade --install $(APP_NAME) $(CHART_DIR) \
		-f $(CHART_DIR)/values-k3s-base.yaml \
		-f $(CHART_DIR)/values-preprod.yaml \
		--namespace $(NAMESPACE_PP) --create-namespace \
		--wait --timeout 5m

deploy-prod: helm-deps ## Deploie en production — confirmation requise
	@echo "Deploiement en PRODUCTION sur $(NAMESPACE_PR)"
	@read -p "Confirmer ? (oui/non) : " confirm && [ "$$confirm" = "oui" ]
	helm upgrade --install $(APP_NAME) $(CHART_DIR) \
		-f $(CHART_DIR)/values-k3s-base.yaml \
		-f $(CHART_DIR)/values-production.yaml \
		--namespace $(NAMESPACE_PR) --create-namespace \
		--wait --timeout 10m

# ──────────────────────────────────────────────────────────────────────────────
# UTILITAIRES
# ──────────────────────────────────────────────────────────────────────────────
secrets-init: ## Initialise le baseline detect-secrets (a faire une fois)
	detect-secrets scan > .secrets.baseline

hooks-install: ## Installe les hooks pre-commit (a faire apres git clone)
	@if [ "$$(uname)" = "Darwin" ]; then \
		brew install pre-commit; \
	else \
		pip install pre-commit --break-system-packages; \
	fi
	pre-commit install
	pre-commit install --hook-type commit-msg
