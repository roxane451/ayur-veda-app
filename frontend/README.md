# Frontend — Ayur-Veda App

👉 **La source de vérité reste [README.md](../README.md) à la racine.**

Ce document décrit les scripts et configuration spécifiques au frontend.

---

## 🛠️ Stack

- **React 18** — UI composants modernes avec hooks
- **TypeScript** (strict mode) — Typage statique complet
- **Vite 5** — Build ultra-rapide + dev server HMR
- **Tailwind CSS 3** — Utility-first styling
- **shadcn/ui** — Design system composable (Radix UI)
- **TanStack Query** — Gestion cache/serveur + refetch
- **React Router** — Navigation SPA
- **Zod** — Validation schemas
- **Nginx** — Serveur de production (statique)

---

## 📦 Scripts npm

```bash
npm --workspace=frontend run dev      # Dev server Vite + HMR
npm --workspace=frontend run build    # Production build (dist/)
npm --workspace=frontend run lint     # ESLint check
npm --workspace=frontend run preview  # Vite preview (prod build local)
npm --workspace=frontend run test     # Tests (placeholder)
```

---

## ⚙️ Configuration locale

Créer `frontend/.env` (voir `frontend/.env.example`) :

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=info
```

**Notes** :
- `VITE_*` prefix obligatoire (exposé au bundle Vite)
- Variables production : Injectées via `docker-compose.yml` ou secrets K8s
- Mode development : `http://localhost:5000` (backend local)
- Mode production : URL du domaine en préproduction/prod

---

## 📁 Structure

```
src/
├── main.tsx               # Entry point React
├── App.tsx                # Root component
├── pages/                 # Page components (routing)
│   ├── Index.tsx
│   ├── Quiz.tsx
│   ├── Doshas.tsx
│   ├── Spices.tsx
│   ├── Ritucharya.tsx
│   └── NotFound.tsx
├── components/            # Réutilisables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── DoshaCards.tsx
│   ├── DoshaQuiz.tsx
│   └── ui/               # shadcn/ui components
├── hooks/                 # Custom hooks
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── lib/                   # Utilitaires
│   └── utils.ts
├── data/                  # Données statiques
│   └── spices.ts
└── index.css              # Tailwind + global styles
```

---

## 🚀 Développement local

```bash
# À la racine du projet
make install        # Install all workspaces
make dev            # Docker Compose (MongoDB + backend + frontend HMR)

# Ou manuellement
npm ci
npm --workspace=frontend run dev
```

Frontend disponible : `http://localhost:5173`  
Backend API : `http://localhost:5000/api`

---

## 🔨 Build Production

```bash
npm --workspace=frontend run build    # Crée dist/
npm --workspace=frontend run preview  # Test build local
```

**Sortie build** :
- `dist/index.html` — HTML entry
- `dist/assets/` — JS, CSS, images (hash contentful)
- Taille optimisée : JS ~428 KB (compressed ~127 KB)

---

## 🎨 UI & Styling

- **Tailwind CSS** : Utility classes, responsive design
- **shadcn/ui** : Composants Radix UI stylisés
- **Theme switching** : Via `next-themes` (dark mode ready)
- **Custom fonts** : https://fonts.google.com (optional)

---

## 🔐 Sécurité

- **CSP via Helmet** (backend) : Protège contre XSS
- **Input validation** : Zod schemas côté client
- **CORS** : Configurée au backend (voir [docs/CORS-SECURITY.md](../docs/CORS-SECURITY.md))
- **JWT stockage** : localStorage (xss risk = vigilance)
- **Secrets** : Variables d'env uniquement (pas de secrets hardcoded)

---

## 📡 Communication API

Utiliser **TanStack Query** pour les requêtes :

```typescript
import { useQuery } from '@tanstack/react-query';

function DoshaList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['doshas'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doshas`);
      return res.json();
    }
  });
  
  return <div>{/* render */}</div>;
}
```

Exemples API : [API_EXAMPLES.md](../API_EXAMPLES.md)

---

## 🚢 Déploiement

Frontend packagé en image Docker (`frontend/Dockerfile`) :

```dockerfile
FROM node:20-alpine as builder
# Build Vite → dist/

FROM nginx:alpine
# Serve dist/ statiquement
```

Déployé via **Helm** (`helm-chart/`) avec nginx ingress.  
Voir [DEPLOYMENT.md](../DEPLOYMENT.md) pour les détails d'env.

---

## 📚 Pour approfondir

- **API** : [API_EXAMPLES.md](../API_EXAMPLES.md)
- **Déploiement** : [DEPLOYMENT.md](../DEPLOYMENT.md)
- **CORS** : [docs/CORS-SECURITY.md](../docs/CORS-SECURITY.md)
- **Workflow dépendances** : [README-workflow-deps.md](../README-workflow-deps.md)
- **Contribution** : [CONTRIBUTING.md](../CONTRIBUTING.md)
