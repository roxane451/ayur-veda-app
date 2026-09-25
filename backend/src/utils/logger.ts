import pino from "pino";

const isDev = process.env.NODE_ENV === "development" 
  && process.env.PRETTY_LOGS !== "false";
const isProd = ["production", "preprod"].includes(process.env.NODE_ENV || "");

// En développement : logs lisibles (pretty-print, niveau debug)
// En prod/preprod  : JSON structuré (niveau info), compatible Loki/Grafana
export const logger = pino({
  level: isProd ? "info" : "debug",
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
  // Masque automatiquement les champs sensibles dans tous les logs
  redact: {
    paths: [
      "req.headers.authorization",
      "body.password",
      "*.password",
      "*.token",
      "*.secret",
    ],
    censor: "[REDACTED]",
  },
  base: { env: process.env.NODE_ENV || "development" },
});
