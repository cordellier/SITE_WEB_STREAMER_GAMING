import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Assurer que le fichier .env est bien chargé et que les variables d'environnement sont accessibles
const backendUrl = process.env.VITE_BACKEND_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve("./src/assets/styles"),
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
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
