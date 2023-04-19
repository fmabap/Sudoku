import { defineConfig } from "vite";

// vite.config.js
export default defineConfig({
    // config options
    base: "./",
    root: "./src",
    build: {
        emptyOutDir: true,
        outDir: "./../docs",
        publicDir: "./public"
    }
});