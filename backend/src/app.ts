import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { up } from "migrate-mongo";
import pinoHttp from "pino-http";
import {
  register,
  collectDefaultMetrics,
  Counter,
  Histogram,
} from "prom-client";

import { connectDB } from "./config/database";
import { config } from "./config/env";
import { globalLimiter } from "./middleware/rateLimiter";
import { logger } from "./utils/logger";

import authRoutes from "./routes/auth";
import quizRoutes from "./routes/quiz";
import spicesRoutes from "./routes/spices";
import doshasRoutes from "./routes/doshas";
import ritucharyaRoutes from "./routes/ritucharya";
import { swaggerRouter } from "./config/swagger";

// ────────────────────────────────────────────────
// Métriques Prometheus
// Collecte les métriques Node.js standards : mémoire, CPU, event loop, etc.
collectDefaultMetrics();

// Compteur du nombre de requêtes HTTP traitées par le backend.
const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Nombre total de requêtes HTTP",
  labelNames: ["method", "route", "status_code"],
});

// Histogramme utilisé pour mesurer la durée des requêtes HTTP.
const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "Durée des requêtes HTTP en secondes",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

// ────────────────────────────────────────────────
// Log de démarrage
// Vérifie uniquement la présence des variables sensibles sans exposer leur valeur.
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
// Gestion des erreurs Node.js non capturées
// En production/preprod, une erreur non maîtrisée provoque un arrêt propre du
// processus afin que Kubernetes puisse redémarrer le conteneur dans un état sain.
const isProductionEnvironment =
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "preprod";

if (isProductionEnvironment) {
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
// Application Express
const app: Express = express();

// ────────────────────────────────────────────────
// Journalisation HTTP avec Pino
//
// Les logs sont écrits sur stdout par Pino.
// Kubernetes les expose via `kubectl logs`, puis Promtail les collecte
// depuis /var/log/pods avant de les transmettre à Loki.
//
// Les endpoints techniques sont exclus pour éviter de remplir Loki avec
// les probes Kubernetes et les scrapes Prometheus.
app.use(
  pinoHttp({
    logger,

    autoLogging: {
      ignore: (req) =>
        req.url === "/health" ||
        req.url === "/api/health" ||
        req.url === "/metrics",
    },

    // 2xx / 3xx -> info
    // 4xx       -> warn
    // 5xx       -> error
    customLogLevel: (_req, res, err) => {
      if (err || res.statusCode >= 500) {
        return "error";
      }

      if (res.statusCode >= 400) {
        return "warn";
      }

      return "info";
    },

    customSuccessMessage: (req, res) =>
      `${req.method} ${req.url} ${res.statusCode}`,

    customErrorMessage: (req, res) =>
      `${req.method} ${req.url} ${res.statusCode}`,
  }),
);

// ────────────────────────────────────────────────
// Métriques HTTP applicatives
//
// Prometheus et Loki ont ici deux rôles différents :
// - Prometheus mesure les volumes et les temps de réponse ;
// - Loki conserve les événements et logs détaillés.
//
// Le timer démarre avant les autres middlewares afin de mesurer le temps total
// de traitement de la requête.
app.use((req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    // Lorsque Express a identifié une route, on privilégie son pattern
    // plutôt que l'URL brute pour limiter la cardinalité Prometheus.
    const route = req.route?.path
      ? `${req.baseUrl}${req.route.path}`
      : req.path;

    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode),
    };

    httpRequestsTotal.inc(labels);
    end(labels);
  });

  next();
});

// ────────────────────────────────────────────────
// Middlewares de sécurité

// Helmet ajoute plusieurs en-têtes HTTP de protection.
// La CSP limite les sources de contenu autorisées.
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

// Autorise uniquement l'origine frontend définie dans la configuration.
app.use(
  cors({
    origin: config.corsOrigin,
  }),
);

// Limite la taille des payloads JSON afin de réduire le risque
// de saturation mémoire par des requêtes excessivement volumineuses.
app.use(express.json({ limit: "100kb" }));

// Limitation globale du nombre de requêtes.
// Des règles plus restrictives peuvent être appliquées sur certaines routes.
app.use(globalLimiter);

// ────────────────────────────────────────────────
// Routes applicatives

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend Ayur-Veda is running!");
});

// Documentation Swagger.
// Son exposition en production est gérée dans src/config/swagger.ts.
app.use("/api/docs", swaggerRouter);

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/spices", spicesRoutes);
app.use("/api/doshas", doshasRoutes);
app.use("/api/ritucharya", ritucharyaRoutes);

// ────────────────────────────────────────────────
// Health check complet
//
// Vérifie notamment l'état réel de la connexion MongoDB.
// Kubernetes ou un outil de supervision peut ainsi distinguer un processus
// Node.js actif d'un backend réellement capable d'accéder à sa base.
app.get("/api/health", async (_req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;

  // États Mongoose :
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
  const isDbHealthy = dbState === 1;

  const connectionStates = [
    "disconnected",
    "connected",
    "connecting",
    "disconnecting",
  ];

  const health = {
    status: isDbHealthy ? "OK" : "ERROR",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "unknown",

    database: {
      connected: isDbHealthy,
      connectionState: connectionStates[dbState] || "unknown",
    },

    memory: {
      heapUsed: Math.round(
        process.memoryUsage().heapUsed / 1024 / 1024,
      ),
      heapTotal: Math.round(
        process.memoryUsage().heapTotal / 1024 / 1024,
      ),
    },
  };

  // Une API sans accès à sa base n'est pas considérée comme saine.
  if (!isDbHealthy) {
    logger.warn("Health check failed: database disconnected");
    return res.status(503).json(health);
  }

  return res.status(200).json(health);
});

// ────────────────────────────────────────────────
// Endpoint Prometheus
//
// Expose les métriques Node.js et les métriques HTTP personnalisées.
// Cet endpoint est destiné au scraping Prometheus.
app.get("/metrics", async (_req: Request, res: Response) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Endpoint léger conservé pour compatibilité avec les probes existantes.
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

// ────────────────────────────────────────────────
// Gestion centralisée des erreurs Express
//
// Doit rester après toutes les routes et tous les autres middlewares.
// Les erreurs sont journalisées avec Pino puis une réponse générique est
// retournée afin de ne pas exposer de détails internes au client.
app.use(
  (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    logger.error({ err }, "Unhandled express error");

    res.status(500).json({
      error: "Internal server error",
    });
  },
);

// ────────────────────────────────────────────────
// Connexion MongoDB et démarrage du serveur

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

const startServer = async () => {
  // MongoDB peut ne pas être immédiatement disponible lors du démarrage
  // simultané des workloads Kubernetes. Le backend effectue donc plusieurs
  // tentatives avant de considérer la dépendance comme indisponible.
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      logger.info(
        {
          attempt,
          maxRetries: MAX_RETRIES,
        },
        "Connecting to MongoDB",
      );

      await connectDB();

      logger.info("MongoDB connected");

      // Les migrations sont appliquées avant l'ouverture du port HTTP.
      // Le backend ne commence donc à servir du trafic qu'une fois
      // la base connectée et son schéma à jour.
      const db = mongoose.connection.db!;
      const client = mongoose.connection.getClient();

      const migrated = await up(db, client);

      if (migrated.length > 0) {
        logger.info(
          { migrations: migrated },
          "Migrations applied",
        );
      } else {
        logger.info("No pending migrations");
      }

      break;
    } catch (err) {
      logger.warn(
        {
          attempt,
          maxRetries: MAX_RETRIES,
          err,
        },
        "MongoDB not ready, retrying...",
      );

      if (attempt === MAX_RETRIES) {
        logger.fatal(
          "MongoDB unreachable after max retries, exiting",
        );
        process.exit(1);
      }

      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY_MS),
      );
    }
  }

  // Le port HTTP n'est ouvert qu'après connexion et migration MongoDB.
  const server = app.listen(config.port, () => {
    logger.info(
      { port: config.port },
      "Server listening",
    );
  });

  // Kubernetes envoie SIGTERM avant l'arrêt d'un pod.
  // On arrête donc d'accepter de nouvelles connexions et on laisse
  // les requêtes déjà en cours se terminer avant de quitter.
  process.on("SIGTERM", () => {
    logger.info(
      "SIGTERM received, shutting down gracefully",
    );

    server.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  });
};

// ────────────────────────────────────────────────
// Lancement de l'application
(async () => {
  try {
    await startServer();
  } catch (err) {
    logger.fatal(
      { err },
      "Fatal startup error",
    );

    process.exit(1);
  }
})();

export default app;