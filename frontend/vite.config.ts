import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // écoute toutes les interfaces
    port: 5173,
    allowedHosts: [
      "frontend.ayur-veda.orb.local", // hostname OrbStack
      "localhost", // pour tests locaux
      "127.0.0.1",
    ],
    // En développement, l'API tourne à part sur le port 5000.
    proxy: { "/api": "http://localhost:5000" },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "icons/apple-touch-icon.png"],
      manifest: {
        id: "/",
        name: "Ayur-Veda, la science de la vie",
        short_name: "Ayurveda",
        description:
          "L'Ayurveda d'après les textes anciens. Connaître sa nature, vivre avec les saisons, cuisiner avec les épices.",
        lang: "fr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#F0F4E0",
        theme_color: "#F0F4E0",
        categories: ["health", "lifestyle", "food"],
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        shortcuts: [
          { name: "Mon profil", url: "/profil", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
          { name: "La cuisine", url: "/cuisine", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
        ],
        screenshots: [
          { src: "/screenshots/telephone.png", sizes: "780x1688", type: "image/png", form_factor: "narrow", label: "L'accueil sur téléphone" },
          { src: "/screenshots/ordinateur.png", sizes: "1440x900", type: "image/png", form_factor: "wide", label: "L'accueil sur ordinateur" },
        ],
      },
      workbox: {
        // Toutes les pages et polices sont gardées pour un usage hors ligne.
        globPatterns: ["**/*.{js,css,html,svg,png,webp,ico,woff2}"],
        globIgnores: ["screenshots/**"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//, /^\/metrics/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            options: { cacheName: "api", networkTimeoutSeconds: 4 },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: { cacheName: "images", expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 60 } },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
