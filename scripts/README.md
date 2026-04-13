# Scripts Ops

Scripts opérationnels actifs du projet.

## Scripts canoniques

- `bootstrap-infisical.sh`: crée/rotate le secret `infisical-token` par namespace.
- `mongodb-backup-r2.sh`: backup MongoDB vers Cloudflare R2.
- `mongodb-restore-r2.sh`: restauration MongoDB depuis Cloudflare R2.

## Scripts legacy

- `mongodb-backup.sh`: script historique (conservé pour référence). Préférer `mongodb-backup-r2.sh`.

## Conventions

- Tous les scripts doivent supporter `-h` ou `--help`.
- Exécuter `shellcheck scripts/*.sh` avant merge.
