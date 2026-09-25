# ─── Stage 1 : toutes les deps du workspace backend (pour compiler) ──────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json

RUN npm ci --workspace=backend

# ─── Stage 2 : build TypeScript ───────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY backend/ ./backend/

WORKDIR /app/backend
RUN npm run build

# ─── Stage 3 : deps de production uniquement ─────────────────────────────────
# Installation propre avec --omit=dev plutôt que npm prune : avec les npm
# workspaces (node_modules hissés à la racine), prune ne retire pas toutes
# les devDependencies, qui finissaient dans l'image finale.
FROM node:22-alpine AS prod-deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json

RUN npm ci --workspace=backend --omit=dev

# ─── Stage 4 : image finale ───────────────────────────────────────────────────
FROM node:22-alpine
WORKDIR /app

# Correctifs de sécurité Alpine + init minimal pour la gestion des signaux.
# npm, npx, corepack et yarn sont retirés : l'application tourne avec
# "node" seul, et ces outils embarquent leurs propres dépendances
# (souvent vulnérables) sans aucune utilité en production.
RUN apk upgrade --no-cache \
    && apk add --no-cache dumb-init \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
              /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
              /usr/local/bin/yarn /usr/local/bin/yarnpkg /opt/yarn-*

# node_modules de production uniquement
COPY --from=prod-deps /app/node_modules ./node_modules

# Binaires compilés
COPY --from=builder /app/backend/dist ./dist

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
