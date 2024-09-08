import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Charger les variables d'environnement
import { config } from "dotenv";
config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve("./src/assets/styles"), // Utiliser un chemin relatif
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@styles/abstracts/variables.scss";
          @import "@styles/base/typography.scss";
        `,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", // Utiliser import.meta.env
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
