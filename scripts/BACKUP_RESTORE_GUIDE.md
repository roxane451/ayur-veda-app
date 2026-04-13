# Backup & Restore Guide

Cette documentation est secondaire.
La source de vérité projet reste `README.md` à la racine.

## Statut actuel

- Script existant: `scripts/mongodb-backup.sh`
- Portée principale: backup/restauration MongoDB via `kubectl exec` sur le pod `mongodb-0`
- Politique globale de backup/restauration: en cours de formalisation (`🟡`)

## Utilisation du script

```bash
chmod +x scripts/mongodb-backup.sh

# Créer un backup
./scripts/mongodb-backup.sh backup

# Lister les backups
./scripts/mongodb-backup.sh list

# Restaurer un backup
./scripts/mongodb-backup.sh restore <chemin_backup.tar.gz>
```

## Pré-requis

- `kubectl` configuré sur le cluster cible
- Namespace cible cohérent avec le script (par défaut `ayur`)
- Pod MongoDB accessible (`mongodb-0`)

## Limites connues

- Le script contient des hypothèses statiques (namespace/pod) à adapter selon l'environnement.
- Le runbook de restauration complet (RTO/RPO validés) n'est pas encore finalisé.
- Toute exécution restore doit être testée d'abord en preprod.

## Recommandation opérationnelle

- Conserver des preuves de tests de restauration périodiques.
- Versionner les procédures validées dans le README racine et conserver ici les détails script uniquement.
