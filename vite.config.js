import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";

// vite.config.js
export default defineConfig({
  // config options
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      includeAssets: ["favicon.png", "icon.png"],
      injectRegister: "inline",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{html,ico,png,svg,webmanifest}"],
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/[^/]+.(?!webmanifest$).*$/],
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: "Sudoku",
        short_name: "Sudoku",
        description: "Play Sudoku offline anytime",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "./index.html",
        id: "/",
        icons: [
          {
            src: "./icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    viteSingleFile(),
  ],
  base: "./",
  root: "./src",
  build: {
    emptyOutDir: true,
    outDir: "./../docs",
    publicDir: "./public",
  },
});
