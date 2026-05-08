# ─── Stage 1 : installer les deps du workspace backend ────────────────────────
# Le lockfile est à la racine du monorepo → on en a besoin ici
FROM node:22-alpine AS deps
WORKDIR /app

# Lockfile racine + manifests des workspaces nécessaires
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json

# npm ci via workspace : installe uniquement les deps de backend
# dans /app/backend/node_modules (prod + dev pour le build TS)
RUN npm ci --workspace=backend

# ─── Stage 2 : build TypeScript ───────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Récupérer les node_modules installés proprement
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules

# Copier les sources du backend
COPY backend/ ./backend/

# Compiler TypeScript depuis le dossier backend
WORKDIR /app/backend
RUN npm run build

# Supprimer les devDependencies après le build
RUN npm prune --omit=dev

# ─── Stage 3 : image finale ───────────────────────────────────────────────────
FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache dumb-init

# node_modules prunés (prod only)
COPY --from=builder /app/backend/node_modules ./node_modules

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