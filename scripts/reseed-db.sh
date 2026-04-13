#!/bin/bash
echo "🌱 Reseeding database..."
kubectl delete job seed-database -n ayur 2>/dev/null || true
kubectl apply -f manifests/seed-job.yaml
kubectl wait --for=condition=complete job/seed-database -n ayur --timeout=120s
kubectl logs -n ayur job/seed-database
echo "✅ Database reseeded!"
```

**3. Organisation de tes fichiers :**
```
manifests/
├── 01-namespace.yaml
├── 02-secrets.yaml
├── 03-mongodb-statefulset.yaml
├── 04-backend-deployment.yaml
├── 05-frontend-deployment.yaml
├── 06-ingress.yaml
└── jobs/
    └── seed-job.yaml

#Quand utiliser seed-job.yaml :
#✅ Réinitialiser la base de données
##kubectl apply -f seed-job.yaml
#✅ Après avoir supprimé/recréé MongoDB
#✅ Pour tester avec des données fraîches
#✅ Déploiement dans un nouvel environnement (staging → prod)
#💡 Recommandations :
#1. Garde le fichier mais commente-le dans ton workflow :
#bash# Dans ton README.md ou docs/deployment.md

# Seed initial (à faire une seule fois)
#kubectl apply -f seed-job.yaml

# Pour reseed (efface et recrée les données)
#kubectl delete job seed-database -n ayur
#kubectl apply -f seed-job.yaml
