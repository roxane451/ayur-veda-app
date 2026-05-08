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

# Build TypeScript (compile tout, y compris les seeds si besoin)
RUN npm run build --workspace=backend

# Supprimer les devDependencies du node_modules
RUN npm prune --omit=dev

# Runtime stage
FROM node:22-alpine
WORKDIR /app

# Install dumb-init for proper signal handling (PID 1)
RUN apk add --no-cache dumb-init

# Copier les node_modules déjà prunés depuis le builder
COPY --from=builder /app/node_modules ./node_modules

# Copy compiled code from builder
COPY --from=builder /app/backend/dist ./dist

# Optionnel : Pour lancer des seeds dans le pod (ts-node)
# RUN npm install --omit=dev ts-node typescript
# Fichiers requis par migrate-mongo au runtime (résolution depuis CWD=/app)
COPY backend/migrate-mongo-config.js ./migrate-mongo-config.js
COPY backend/migrations ./migrations

# Create non-root user & group (bonne pratique)
RUN addgroup -g 1001 nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Change ownership of /app to non-root user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 5000

# Health check (plus fiable avec curl ou wget si installé)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Use dumb-init to handle signals properly (SIGTERM, etc.)
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/app.js"]
