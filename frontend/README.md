# Frontend Ayur-Veda

Cette documentation est secondaire.
La source de vérité projet reste `README.md` à la racine.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Scripts npm

```bash
npm run dev
npm run lint
npm run build
npm run test
npm run preview
```

Notes:

- `test` est actuellement un placeholder (pas encore de suite métier complète).

## Développement local

```bash
npm ci
npm run dev
```

Par défaut, Vite est servi en local et le frontend consomme l'API backend selon la configuration applicative.

## Build

```bash
npm run build
npm run preview
```

## Déploiement

Le frontend est packagé dans une image Docker puis déployé via Helm (`helm-chart/`).
Référer au `README.md` racine pour le flux CI/CD et les environnements.
