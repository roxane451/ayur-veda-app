# ayur-veda-app

Application web Ayurvéda — React + Node.js + MongoDB.

## Stack

- **Frontend** : React + Vite
- **Backend** : Node.js / Express
- **Base de données** : MongoDB 7
- **Déploiement** : K3s (VPS OVH) via Helm

## Démarrage rapide

```bash
# 1. Cloner le repo
git clone git@github.com:Roxane451/ayur-veda-app.git
cd ayur-veda-app

# 2. Installer les hooks pre-commit
make hooks-install

# 3. Configurer les variables d'environnement
cp .env.example .env
# → éditer .env avec tes valeurs locales

# 4. Lancer l'environnement de développement
make dev
```

L'application est disponible sur :
- Frontend : http://localhost:5173
- API : http://localhost:5000/api

## Commandes disponibles

```
make dev              Démarre l'environnement local (docker-compose)
make down             Arrête l'environnement local
make logs             Affiche les logs en temps réel
make lint             Lance tous les linters
make test             Lance les tests
make build            Build les images Docker localement
make deploy-staging   Déploie sur k3d local
make deploy-preprod   Déploie sur preprod (VPS OVH)
make deploy-prod      Déploie en production (confirmation requise)
```

## Conventions de commits

Ce projet suit [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajout de la page profil utilisateur
fix: correction du calcul de doshas
docs: mise à jour du README
chore: bump dépendances
```

## Architecture de déploiement

```
Staging local  →  values-k3d.yaml
Preprod (OVH)  →  values-k3s-base.yaml + values-preprod.yaml
Production     →  values-k3s-base.yaml + values-production.yaml
```

Les secrets sont gérés via [Infisical](https://infisical.com) en preprod/prod (ExternalSecrets).