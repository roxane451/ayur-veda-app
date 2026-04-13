import dotenv from "dotenv";
import { logger } from "../utils/logger";

if (process.env.NODE_ENV === "development") {
  const result = dotenv.config();
  if (result.error) {
    logger.warn("No .env file found in dev — using process.env");
  }
}

const isProdLike = ["production", "preprod", "staging"].includes(
  process.env.NODE_ENV || "",
);

export const config = {
  port: Number(process.env.PORT) || 5000,

  mongodbUri:
    process.env.MONGODB_URI ||
    (isProdLike ? "" : "mongodb://localhost:27017/ayur"),

  jwtSecret:
    process.env.JWT_SECRET ||
    (isProdLike ? "" : "secret_key_for_local_dev_only___change_me"),

  // Réduit de 7d à 24h — quick-win sécurité (token volé = fenêtre d'exposition réduite)
  // Prochaine étape : refresh token httpOnly cookie pour descendre à 1h sans friction UX
  jwtExpiry: process.env.JWT_EXPIRY || "24h",

  nodeEnv: process.env.NODE_ENV || "development",

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

// ─── Validations obligatoires hors dev local ──────────────────────────────
if (isProdLike) {
  if (!config.mongodbUri) {
    throw new Error(
      "MONGODB_URI is required in staging/preprod/prod (injected by Kubernetes Secret)",
    );
  }

  if (!config.jwtSecret) {
    throw new Error(
      "JWT_SECRET is required in staging/preprod/prod (injected by Kubernetes Secret)",
    );
  }

  if (config.jwtSecret.length < 32) {
    throw new Error(
      "JWT_SECRET is too short — minimum 32 characters in prod-like environments",
    );
  }

  // Validation CORS_ORIGIN : doit être une URL https valide en prod/preprod
  if (["production", "preprod"].includes(config.nodeEnv)) {
    try {
      const origin = new URL(config.corsOrigin);
      if (origin.protocol !== "https:") {
        throw new Error(
          `CORS_ORIGIN must use https:// in ${config.nodeEnv} — got: ${config.corsOrigin}`,
        );
      }
    } catch (e) {
      if (e instanceof TypeError) {
        throw new Error(
          `CORS_ORIGIN is not a valid URL in ${config.nodeEnv}: ${config.corsOrigin}`,
        );
      }
      throw e;
    }
  }
}

logger.info(
  {
    nodeEnv: config.nodeEnv,
    port: config.port,
    corsOrigin: config.corsOrigin,
    mongodbUri: config.mongodbUri ? "present" : "MISSING",
    jwtSecret: config.jwtSecret ? "present" : "MISSING",
    jwtExpiry: config.jwtExpiry,
  },
  "Config loaded",
);
