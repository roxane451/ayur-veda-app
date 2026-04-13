# Backend Ayur-Veda

Cette documentation est secondaire.
La source de vérité projet reste `README.md` à la racine.

## Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)

## Scripts npm

```bash
npm run dev
npm run lint
npm run build
npm run test
npm run start
npm run seed
```

Notes:

- `lint` exécute `tsc --noEmit`.
- `test` est actuellement un placeholder (pas encore de suite métier complète).

## Configuration locale (`.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ayur
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## API

Routes principales:

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/doshas`
- `GET /api/spices`
- `GET /api/ritucharya`
- `POST /api/quiz/results`

## Important pour preprod/production

Le backend attend des secrets injectés par Kubernetes/External Secrets:

- `MONGODB_URI`
- `JWT_SECRET`

Ne pas commiter de secrets en clair dans le repo.
