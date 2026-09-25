 # Backup Archive Folder

Ce dossier contient des artefacts et configurations de backup **historiques**.

⚠️ **Les scripts actifs sont dans `scripts/`** — Ne pas éditer les copies ici.

---

## 📁 Classification

### 🟢 Actif (scripts/)

- `scripts/mongodb-backup-r2.sh` — Backup MongoDB → Cloudflare R2
- `scripts/mongodb-restore-r2.sh` — Restauration depuis R2
- `scripts/mongodb-backup.sh` — Backup local (optionnel)

### 🔵 Référence (backup/bdd/)

- `backup-mongodb-r2.yml` — Configuration Infisical/K8s pour backup automation
- `backup-comparison.html` — Comparaison backup strategies (historique)
- Copies des scripts (pour référence, pas à jour)

---

## 🚀 Utilisation

### Backup Production (R2)

```bash
# À la racine du projet
./scripts/mongodb-backup-r2.sh
```

### Restauration DR

```bash
./scripts/mongodb-restore-r2.sh
```

📖 Guide complet : [docs/BACKUP.md](../docs/BACKUP.md)

---

## 📋 Convention

- ✅ **Actifs** : Maintenir dans `scripts/` + tester mensuellement
- 🔄 **Historique** : Archiver ici `backup/bdd/` pour référence
- ❌ **Obsolète** : Marquer comme `DEPRECATED` dans le script

---

## 🔒 Sécurité

- ⚠️ Ne JAMAIS stocker de secrets en clair ici (utiliser Infisical/K8s secrets)
- ✅ Tous les scripts doivent supporter `-h` ou `--help`
- ✅ Exécuter `shellcheck scripts/*.sh` avant merge

---

## 📚 Liens

- [DEPLOYMENT.md](../DEPLOYMENT.md#-backup-et-disaster-recovery) — Configuration R2 détaillée
- [docs/BACKUP.md](../docs/BACKUP.md) — Playbook opérationnel complet
- [README.md](../README.md#-stratégie-backup) — Stratégie backup projet
