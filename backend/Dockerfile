# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY backend/package.json ./backend/

# Install ALL dependencies (dev + prod) for build
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build --workspace=backend

# Supprimer les devDependencies du node_modules workspace backend
RUN npm prune --omit=dev --workspace=backend

# Runtime stage
FROM node:22-alpine
WORKDIR /app

# Install dumb-init for proper signal handling (PID 1)
RUN apk add --no-cache dumb-init

# FIX : copier le node_modules du workspace backend, pas celui de la racine.
# En mode npm workspaces, les deps du backend sont hoistées dans /app/node_modules
# MAIS les packages non-hoistés (ou en conflit de version) restent dans
# /app/backend/node_modules. Pour être exhaustif on copie les deux.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Copy compiled code from builder
# dist/app.js est dans /app/backend/dist → on le place dans /app/dist
# pour que require('migrate-mongo') remonte dans /app/node_modules
COPY --from=builder /app/backend/dist ./dist

# Fichiers requis par migrate-mongo au runtime (résolution depuis CWD=/app)
COPY backend/migrate-mongo-config.js ./migrate-mongo-config.js
COPY backend/migrations ./migrations

# Create non-root user & group
RUN addgroup -g 1001 nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app.js"]