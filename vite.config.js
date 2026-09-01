import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ isPreview, isSsrBuild }) => ({
  plugins: [react()],
  publicDir: isSsrBuild ? false : "public",
  appType: isPreview ? "mpa" : "spa",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
