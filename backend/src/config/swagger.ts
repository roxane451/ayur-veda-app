/**
 * Configuration swagger-jsdoc + swagger-ui-express.
 *
 * Monté dans app.ts sur /api/docs (hors production).
 * La spec JSON brute est disponible sur /api/docs/openapi.json
 * pour l'import dans Postman / Insomnia.
 *
 * Usage :
 *   import { swaggerRouter } from './config/swagger';
 *   app.use('/api/docs', swaggerRouter);
 */
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import { config } from "./env";

// ── Définition OpenAPI 3.0 ────────────────────────────────────────────────

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ayur-Veda API",
      version: "1.0.0",
      description: [
        "API REST de l'application Ayur-Veda.",
        "Couvre : authentification, doshas, épices, ritucharya et quiz.",
        "",
        "**Authentification** : Bearer JWT — obtenir un token via `POST /api/auth/login`",
        "puis l'inclure dans le header : `Authorization: Bearer <token>`.",
      ].join("\n"),
      contact: { name: "Équipe Ayur-Veda" },
    },
    servers: [
      {
        url:
          config.nodeEnv === "production"
            ? "https://api.ayur-veda.fr"
            : `http://localhost:${config.port}`,
        description:
          config.nodeEnv === "production" ? "Production" : "Développement local",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Token JWT obtenu via `POST /api/auth/login`. Durée : 24h.",
        },
      },
      schemas: {
        // ── Auth ──────────────────────────────────────────────────────────
        RegisterRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "priya@ayurveda.fr" },
            password: {
              type: "string",
              minLength: 12,
              example: "S3cur3P@ssw0rd!",
              description: "Min. 12 caractères, au moins 1 majuscule ou chiffre.",
            },
            firstName: { type: "string", example: "Priya" },
            lastName:  { type: "string", example: "Sharma" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email:    { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "eyJhbGci..." },
            user:  { $ref: "#/components/schemas/UserPublic" },
          },
        },
        UserPublic: {
          type: "object",
          properties: {
            id:        { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            email:     { type: "string", format: "email" },
            firstName: { type: "string" },
            lastName:  { type: "string" },
          },
        },
        // ── Dosha ─────────────────────────────────────────────────────────
        Dosha: {
          type: "object",
          properties: {
            id:       { type: "string", enum: ["vata", "pitta", "kapha"], example: "vata" },
            name:     { type: "string", example: "Vata" },
            sanskrit: { type: "string", example: "वात" },
            elements: { type: "string", example: "Air + Éther" },
            qualities: { type: "array", items: { type: "string" }, example: ["Léger", "Froid", "Sec"] },
            physical:  { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" } } } },
            imbalanceSigns: { type: "array", items: { type: "string" } },
            balanceTips:    { type: "array", items: { type: "string" } },
            plants:    { type: "array", items: { type: "string" } },
            color:     { type: "string", example: "#8B7CF6" },
            icon:      { type: "string", example: "wind" },
          },
        },
        // ── Réponses d'erreur ─────────────────────────────────────────────
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Email and password are required" },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Données invalides" },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field:   { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  // Fichiers scannés pour les annotations @openapi
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ── Router ────────────────────────────────────────────────────────────────

export const swaggerRouter = Router();

// Désactivé en production — évite d'exposer la documentation publiquement.
// Retirer la condition si un accès restreint (ex. VPN) est mis en place.
if (config.nodeEnv !== "production") {
  swaggerRouter.use("/", swaggerUi.serve);
  swaggerRouter.get(
    "/",
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "Ayur-Veda API Docs",
      swaggerOptions: {
        persistAuthorization: true, // conserve le token Bearer entre les rechargements
        defaultModelsExpandDepth: 2,
      },
    }),
  );

  // Spec JSON brute — import direct dans Postman / Insomnia
  swaggerRouter.get("/openapi.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
