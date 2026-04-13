# =============================================================================
# Dockerfile - Frontend React (Multi-stage)
#
# Utilisation:
#   Dev local  → docker-compose.yml (pas ce Dockerfile, hot-reload direct)
#   Staging    → docker build --target staging .
#   Prod       → docker build .  (ou --target production)
#
# Build args:
#   VITE_API_URL   → URL de l'API backend
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1 : deps — Installation des dépendances (cache layer)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps

WORKDIR /app

# Copier uniquement les fichiers de dépendances
# → Le cache Docker ne se brise que si package.json change
COPY package*.json ./

RUN npm ci --frozen-lockfile


# -----------------------------------------------------------------------------
# Stage 2 : builder — Compilation du code React/Vite
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Récupérer les dépendances du stage précédent
COPY --from=deps /app/node_modules ./node_modules

# Copier le code source
COPY . .

# Variable d'env injectée au build (Vite l'embed dans le bundle JS)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# -----------------------------------------------------------------------------
# Stage 3 : staging — Image de test (avec logs verbeux)
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS staging

# Copier la config nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier le build
COPY --from=builder /app/dist /usr/share/nginx/html

# Créer les dossiers nécessaires pour nginx non-root
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx /var/lib/nginx/tmp \
    && chown -R nginx:nginx \
        /var/cache/nginx \
        /var/run \
        /var/log/nginx \
        /var/lib/nginx \
        /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# FIX 6 : USER nginx manquant dans le stage staging — nginx tournait en root
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]


# -----------------------------------------------------------------------------
# Stage 4 : production — Image finale optimisée et sécurisée
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS production

# Metadata
LABEL maintainer="Roxane451" \
      version="1.0" \
      description="Ayur Veda Frontend - Production"

# Copier la config nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier uniquement le build (pas le code source !)
COPY --from=builder /app/dist /usr/share/nginx/html

# Sécurité : préparer les dossiers pour nginx non-root
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx /var/lib/nginx/tmp \
    && chown -R nginx:nginx \
        /var/cache/nginx \
        /var/run \
        /var/log/nginx \
        /var/lib/nginx \
        /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    # Supprimer les pages par défaut nginx
    && rm -f /usr/share/nginx/html/50x.html

# Utiliser nginx (user non-root uid=101)
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
