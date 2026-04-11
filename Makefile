.DEFAULT_GOAL := help
SHELL := /bin/bash

APP_NAME     := ayur-veda
NAMESPACE_ST := ayur-staging
NAMESPACE_PP := ayur-preprod
NAMESPACE_PR := ayur
CHART_DIR    := ../helm-ayur-veda   # chemin vers ton repo helm chart

.PHONY: help dev down logs lint test build deploy-staging deploy-preprod deploy-prod secrets-init

# ---------------------------------------------------------------------------
help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'

# ---------------------------------------------------------------------------
# DEV LOCAL
# ---------------------------------------------------------------------------
dev: ## Démarre l'environnement de développement (docker-compose)
	docker compose -f docker-compose.dev.yml up --build

down: ## Arrête l'environnement local
	docker compose -f docker-compose.dev.yml down -v

logs: ## Affiche les logs en temps réel
	docker compose -f docker-compose.dev.yml logs -f

# ---------------------------------------------------------------------------
# QUALITE
# ---------------------------------------------------------------------------
lint: ## Lance tous les linters (pre-commit sur tous les fichiers)
	pre-commit run --all-files

test: ## Lance les tests (backend + frontend)
	docker compose -f docker-compose.dev.yml run --rm backend npm test
	docker compose -f docker-compose.dev.yml run --rm frontend npm test

# ---------------------------------------------------------------------------
# BUILD
# ---------------------------------------------------------------------------
build: ## Build les images Docker localement
	docker build -t ghcr.io/roxane451/$(APP_NAME)/backend:local ./backend
	docker build -t ghcr.io/roxane451/$(APP_NAME)/frontend:local ./frontend

# ---------------------------------------------------------------------------
# DEPLOY
# ---------------------------------------------------------------------------
deploy-staging: ## Déploie sur k3d local (staging)
	helm upgrade --install $(APP_NAME) $(CHART_DIR) \
		-f $(CHART_DIR)/values-k3d.yaml \
		--namespace $(NAMESPACE_ST) --create-namespace \
		--wait --timeout 5m

deploy-preprod: ## Déploie sur preprod (VPS OVH)
	helm upgrade --install $(APP_NAME) $(CHART_DIR) \
		-f $(CHART_DIR)/values-k3s-base.yaml \
		-f $(CHART_DIR)/values-preprod.yaml \
		--namespace $(NAMESPACE_PP) --create-namespace \
		--wait --timeout 5m

deploy-prod: ## Déploie en production (VPS OVH) — confirmation requise
	@echo "⚠️  Déploiement en PRODUCTION sur $(NAMESPACE_PR)"
	@read -p "Confirmer ? (oui/non) : " confirm && [ "$$confirm" = "oui" ]
	helm upgrade --install $(APP_NAME) $(CHART_DIR) \
		-f $(CHART_DIR)/values-k3s-base.yaml \
		-f $(CHART_DIR)/values-production.yaml \
		--namespace $(NAMESPACE_PR) --create-namespace \
		--wait --timeout 10m

# ---------------------------------------------------------------------------
# UTILITAIRES
# ---------------------------------------------------------------------------
secrets-init: ## Initialise le baseline detect-secrets (à faire une fois)
	detect-secrets scan > .secrets.baseline

hooks-install: ## Installe les hooks pre-commit (à faire après git clone)
	@if [ "$$(uname)" = "Darwin" ]; then \
		brew install pre-commit; \
	else \
		pip install pre-commit --break-system-packages; \
	fi
	pre-commit install
	pre-commit install --hook-type commit-msg
