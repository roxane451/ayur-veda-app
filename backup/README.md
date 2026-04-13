# Backup Folder

Ce dossier contient des artefacts d'archive et des scripts historiques de backup/restore.

## Statut

- Archive de travail: non utilisée directement par les déploiements Helm/Terraform en production.
- Conserver pour référence, migration ou reprise manuelle.

## Règles

- Ne pas y stocker de secrets en clair.
- Préférer les scripts actifs dans `scripts/` pour les opérations courantes.
- Documenter toute restauration manuelle dans une PR ou un runbook.
