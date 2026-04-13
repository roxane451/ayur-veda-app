import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // écoute toutes les interfaces
    port: 5173,
    allowedHosts: [
      "frontend.ayur-veda.orb.local", // hostname OrbStack
      "localhost", // pour tests locaux
      "127.0.0.1",
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
