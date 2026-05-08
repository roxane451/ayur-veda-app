# ─── Stage 1 : installer UNIQUEMENT les deps du backend ───────────────────────
# Sans le monorepo racine.
# Pas de npm workspaces ici >>> npm ci installe tout dans /app/node_modules.
FROM node:22-alpine AS deps
WORKDIR /app
COPY backend/package*.json ./
# --ignore-scripts évite les postinstall qui pourraient dépendre du monorepo
RUN npm ci --ignore-scripts

# ─── Stage 2 : build TypeScript ───────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Copier les deps installées proprement (dev + prod) pour le build TS
COPY --from=deps /app/node_modules ./node_modules
COPY backend/ .

RUN npm run build

# Supprimer les devDependencies APRÈS le build
RUN npm prune --omit=dev

# ─── Stage 3 : image finale ───────────────────────────────────────────────────
FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache dumb-init

# node_modules prunés (prod only) — issus du stage builder isolé
# migrate-mongo EST dans dependencies → il sera présent ici
COPY --from=builder /app/node_modules ./node_modules

# Binaires compilés
COPY --from=builder /app/dist ./dist

# Fichiers requis par migrate-mongo au runtime
COPY backend/migrate-mongo-config.js ./migrate-mongo-config.js
COPY backend/migrations ./migrations

RUN addgroup -g 1001 nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app.js"]