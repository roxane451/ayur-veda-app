import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/database";
import { config } from "./config/env";
import { globalLimiter } from "./middleware/rateLimiter";
import { logger } from "./utils/logger";

import authRoutes from "./routes/auth";
import quizRoutes from "./routes/quiz";
import spicesRoutes from "./routes/spices";
import doshasRoutes from "./routes/doshas";
import ritucharyaRoutes from "./routes/ritucharya";

// ────────────────────────────────────────────────
// Démarrage — log structuré (pas de secrets, jamais de valeurs brutes)
logger.info(
  {
    nodeEnv: process.env.NODE_ENV || "undefined",
    port: process.env.PORT || "undefined",
    mongodbUri: process.env.MONGODB_URI ? "present" : "MISSING",
    jwtSecret: process.env.JWT_SECRET ? "present" : "MISSING",
  },
  "Backend starting",
);

// ────────────────────────────────────────────────
// Gestion globale des erreurs non capturées
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "preprod"
) {
  process.on("uncaughtException", (err) => {
    logger.fatal({ err }, "Uncaught exception");
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.fatal({ reason }, "Unhandled rejection");
    process.exit(1);
  });
} else {
  process.on("uncaughtException", (err) => {
    logger.error({ err }, "Uncaught exception");
  });
  process.on("unhandledRejection", (reason) => {
    logger.error({ reason }, "Unhandled rejection");
  });
}

// ────────────────────────────────────────────────
// Express app
const app: Express = express();

// Middlewares globaux
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
      },
    },
  }),
);
app.use(cors({ origin: config.corsOrigin }));
// Limite la taille du body pour éviter les attaques par saturation mémoire
app.use(express.json({ limit: "100kb" }));
// Rate limiter global — filet de sécurité, les limites fines sont dans les routes auth
app.use(globalLimiter);

// ────────────────────────────────────────────────
// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend Ayur-Veda is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/spices", spicesRoutes);
app.use("/api/doshas", doshasRoutes);
app.use("/api/ritucharya", ritucharyaRoutes);

// ────────────────────────────────────────────────
// Health check
// Vérifie que le serveur ET la base de données sont opérationnels.
// Utilisé par le HEALTHCHECK Docker et les probes Kubernetes.
import mongoose from "mongoose";

app.get("/api/health", (_req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  // 1 = connected, 2 = connecting
  if (dbState === 1) {
    res.json({ status: "OK", db: "connected" });
  } else {
    // Retourne 503 — le conteneur sera marqué unhealthy et redémarré
    res.status(503).json({ status: "ERROR", db: "disconnected" });
  }
});

// ────────────────────────────────────────────────
// Error handling middleware (doit être le dernier middleware)
app.use((err: any, _req: Request, res: Response, _next: any) => {
  logger.error({ err }, "Unhandled express error");
  res.status(500).json({ error: "Internal server error" });
});

// ────────────────────────────────────────────────
// Démarrage serveur avec retry MongoDB
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

const startServer = async () => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      logger.info(
        { attempt, maxRetries: MAX_RETRIES },
        "Connecting to MongoDB",
      );
      await connectDB();
      logger.info("MongoDB connected");
      break;
    } catch (err) {
      logger.warn(
        { attempt, maxRetries: MAX_RETRIES, err },
        "MongoDB not ready, retrying...",
      );
      if (attempt === MAX_RETRIES) {
        logger.fatal("MongoDB unreachable after max retries, exiting");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
    }
  }

  const server = app.listen(config.port, () => {
    logger.info({ port: config.port }, "Server listening");
  });

  // Graceful shutdown — attend que les requêtes en cours se terminent
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received, shutting down gracefully");
    server.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  });
};

// Lancement
(async () => {
  try {
    await startServer();
  } catch (err) {
    logger.fatal({ err }, "Fatal startup error");
    process.exit(1);
  }
})();

export default app;
