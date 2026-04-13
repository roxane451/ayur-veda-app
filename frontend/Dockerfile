# =============================================================================
# Dockerfile frontend React (multi-stage)
# Build :
#   docker build --build-arg VITE_API_URL=https://api.ayur-veda.fr -t frontend .
# En dev local on n'utilise pas ce Dockerfile — on passe par docker-compose
# avec le hot-reload Vite directement.
# =============================================================================

# =============================================================================
# Stage 1 — build
# On copie d'abord les package.json pour profiter du cache Docker :
# si le code change mais pas les deps, npm ci n'est pas relancé
# =============================================================================
FROM node:20-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --frozen-lockfile

COPY . .

# VITE_API_URL est embarquée dans le bundle JS au moment du build
# Si non fourni, on pointe vers /api (reverse proxy local)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# =============================================================================
# Stage 2 — runtime Nginx
# On part d'une image nginx propre, on y met juste le build
# =============================================================================
FROM nginx:1.27.4-alpine

ARG APP_VERSION=unknown
LABEL maintainer="roxane451" \
      version="${APP_VERSION}" \
      description="Ayur-Veda Frontend"

# Config Nginx custom (gzip, SPA fallback, headers sécurité, etc.)
COPY nginx.conf /etc/nginx/nginx.conf

# Le build depuis le stage précédent — pas le code source
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf
# On prépare les dossiers dont Nginx a besoin pour tourner en non-root
# et on supprime la page d'erreur par défaut qu'on ne veut pas exposer
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx /var/lib/nginx/tmp \
    && chown -R nginx:nginx \
        /var/cache/nginx \
        /var/run \
        /var/log/nginx \
        /var/lib/nginx \
        /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && rm -f /usr/share/nginx/html/50x.html\
    && rm -f /etc/nginx/conf.d/default.conf

# Nginx user non-root (uid=101 dans l'image officielle)
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
