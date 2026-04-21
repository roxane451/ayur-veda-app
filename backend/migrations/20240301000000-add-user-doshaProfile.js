/**
 * Migration : 20240301000000-add-user-doshaProfile
 *
 * Contexte : ajout du champ `doshaProfile` sur la collection `users`
 * pour persister les résultats du quiz dosha par utilisateur.
 *
 * ⚠️  Cette migration utilise le driver MongoDB natif, PAS les modèles Mongoose.
 *     Les hooks pre/post save de Mongoose ne se déclenchent PAS ici — intentionnel
 *     (moins d'effets de bord, plus prévisible en migration).
 *
 * Rollback (down) : supprime le champ `doshaProfile` de tous les documents.
 * Irréversible si les données ne sont pas sauvegardées → toujours faire un backup
 * avant `migrate-mongo down` en production (voir docs/BACKUP.md).
 *
 * @param {import('mongodb').Db} db
 * @param {import('mongodb').MongoClient} client
 */
module.exports = {
  async up(db, _client) {
    // Ajoute doshaProfile: null uniquement sur les documents qui n'ont pas encore
    // le champ — idempotent si la migration est rejouée par erreur.
    const result = await db.collection("users").updateMany(
      { doshaProfile: { $exists: false } },
      {
        $set: {
          doshaProfile: null,
          _migratedAt: new Date("2024-03-01T00:00:00.000Z"),
        },
      },
    );

    console.log(
      `[migrate:up] add-user-doshaProfile : ${result.modifiedCount} documents mis à jour`,
    );
  },

  async down(db, _client) {
    // Supprime les champs ajoutés par up().
    // ⚠️  Les données doshaProfile non-nulles seront PERDUES — faire un backup avant.
    const result = await db.collection("users").updateMany(
      {},
      { $unset: { doshaProfile: "", _migratedAt: "" } },
    );

    console.log(
      `[migrate:down] add-user-doshaProfile (rollback) : ${result.modifiedCount} documents modifiés`,
    );
  },
};
