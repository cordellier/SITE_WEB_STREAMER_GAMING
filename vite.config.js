import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { config } from "dotenv";

// Charger les variables d'environnement
config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/assets/styles"),
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
        target: process.env.VITE_BACKEND_URL || "http://localhost:5000", // Utiliser la variable d'environnement ou valeur par défaut
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
