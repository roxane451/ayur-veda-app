// migrate-mongo-config.js
//
// Configuration de migrate-mongo — voir docs/adr/003-... et ADR migrations (à venir).
//
// Commandes disponibles (depuis backend/) :
//   npx migrate-mongo create <nom>   → crée migrations/YYYYMMDDHHmmss-<nom>.js
//   npx migrate-mongo up             → applique les migrations en attente
//   npx migrate-mongo down           → rollback de la DERNIÈRE migration appliquée
//   npx migrate-mongo status         → état de toutes les migrations
//
// En CI/staging : migrate-mongo up est joué automatiquement au démarrage du backend.
// En production : migrate-mongo up est joué manuellement via `make migrate-prod`
//                 APRÈS un backup MongoDB (voir docs/BACKUP.md).

require("dotenv").config({ path: ".env" });

const config = {
  mongodb: {
    // Même URI que le reste du backend — injectée par .env ou variable d'environnement.
    // Défaut local : mongodb://localhost:27017/ayur
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/ayur",

    options: {
      // Recommandé pour éviter les warnings de dépréciation du driver MongoDB.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Dossier contenant les fichiers de migration.
  // Chemin relatif à l'emplacement de CE fichier (= backend/).
  migrationsDir: "migrations",

  // Collection MongoDB qui stocke l'historique des migrations jouées.
  // Ne PAS renommer après le premier déploiement en prod (la liste serait perdue).
  changelogCollectionName: "changelog_migrations",

  migrationFileExtension: ".js",

  // Désactive le hash de fichier — on utilise l'horodatage dans le nom de fichier.
  useFileHash: false,
};

module.exports = config;
