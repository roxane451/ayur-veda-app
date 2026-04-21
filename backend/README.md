# Backend — Ayur-Veda App

👉 **La source de vérité reste [README.md](../README.md) à la racine.**

Ce document décrit les scripts et configuration spécifiques au backend.

---

## 🛠️ Stack

- **Node.js 20+** avec TypeScript (strict mode)
- **Express 5** — API REST minimaliste et performante
- **MongoDB 7** + **Mongoose** — Modélisation holistique
- **JWT + bcryptjs** — Authentification sécurisée
- **Helmet** — Sécurité headers HTTP
- **Pino** — Structured logging JSON
- **Zod** — Validation schémas type-safe
- **Express Rate Limiter** — Protection rate-limiting

---

## 📦 Scripts npm

```bash
npm --workspace=backend run dev      # Dev server (tsx watch)
npm --workspace=backend run build    # TypeScript → dist/
npm --workspace=backend run lint     # TypeScript checking (tsc --noEmit)
npm --workspace=backend run start    # Production server
npm --workspace=backend run seed     # Seed MongoDB avec données démo
npm --workspace=backend run test     # Tests (placeholder)
```

---

## ⚙️ Configuration locale

Créer `backend/.env` (voir `backend/.env.example`) :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ayur
JWT_SECRET=super_secret_change_in_prod
JWT_EXPIRY=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
```

**Notes** :
- Valeurs exemple : `backend/.env.example`
- Mode production : Ajouter `JWT_SECRET`, `MONGODB_URI` via secrets (Infisical)

---

## 🔌 API principales

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check (DB status, uptime) |
| `POST` | `/api/auth/register` | Signup |
| `POST` | `/api/auth/login` | Login (retourne JWT) |
| `GET` | `/api/auth/profile` | Profile utilisateur (requires JWT) |
| `GET` | `/api/doshas` | Lister tous les doshas |
| `GET` | `/api/doshas/:id` | Dosha détail |
| `GET` | `/api/spices` | Lister les épices |
| `GET` | `/api/ritucharya` | Rituels saisonniers |
| `POST` | `/api/quiz` | Tester le quiz (calcul dosha) |

🔗 Exemples curl complets : [API_EXAMPLES.md](../API_EXAMPLES.md)

---

## 📁 Structure

```
src/
├── app.ts                 # Express app setup
├── config/
│   ├── database.ts       # MongoDB connection
│   └── env.ts            # Environment validation (Zod)
├── controllers/           # Logique métier par endpoint
├── models/               # Mongoose schemas (User, Dosha, etc.)
├── routes/               # Express routes
├── middleware/           # Auth, validation, rate limiting
├── seeds/                # Data seeding scripts
└── utils/                # JWT, logging, etc.
```

---

## 🚀 Développement local

```bash
# À la racine du projet
make install        # Install all workspaces
make dev            # Docker Compose (MongoDB + HMR backend)

# Ou manuellement
npm ci
npm --workspace=backend run dev
```

Backend disponible : `http://localhost:5000/api`

---

## 🔐 Sécurité

- **Validation input** : Zod schemas sur toutes les routes
- **JWT signing** : HS256 avec secret en `.env`
- **Password hashing** : bcryptjs (10 rounds)
- **CORS** : Strict par domaine (voir [docs/CORS-SECURITY.md](../docs/CORS-SECURITY.md))
- **Helmet** : Headers sécurité (CSP, XSSS, X-Frame, etc.)
- **Rate limiting** : 100 req/15min par IP
- **Logging** : Pino JSON (mots-clés sensibles masqués)

---

## 📚 Pour approfondir

- **Logging** : [docs/LOGGING.md](../docs/LOGGING.md)
- **CORS** : [docs/CORS-SECURITY.md](../docs/CORS-SECURITY.md)
- **Déploiement** : [DEPLOYMENT.md](../DEPLOYMENT.md)
- **Workflow dépendances** : [README-workflow-deps.md](../README-workflow-deps.md)
- **Contribution** : [CONTRIBUTING.md](../CONTRIBUTING.md)
- `POST /api/quiz/results`

## Important pour preprod/production

Le backend attend des secrets injectés par Kubernetes/External Secrets:

- `MONGODB_URI`
- `JWT_SECRET`

Ne pas commiter de secrets en clair dans le repo.
