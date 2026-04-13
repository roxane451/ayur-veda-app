import rateLimit from "express-rate-limit";

// ─── Helpers ───────────────────────────────────────────────────────────────

const isProd = ["production", "preprod", "staging"].includes(
  process.env.NODE_ENV || "",
);

// En dev/test on désactive les limiteurs pour ne pas gêner les tests manuels.
// En prod/preprod/staging ils sont actifs.
const skip = () => !isProd;

// ─── Login : 10 tentatives / 15 min / IP ──────────────────────────────────
// Protège contre le brute-force de mots de passe.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skip,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
  },
});

// ─── Register : 5 créations de compte / heure / IP ────────────────────────
// Protège contre la création de masse de comptes (spam, abus).
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  skip,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error:
      "Trop de créations de compte depuis cette adresse. Réessayez dans une heure.",
  },
});

// ─── API générale : 200 req / min / IP ────────────────────────────────────
// Filet de sécurité pour toutes les routes restantes.
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  skip,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Trop de requêtes. Réessayez dans une minute.",
  },
});
