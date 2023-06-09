import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// vite.config.js
export default defineConfig({
    // config options
    plugins: [VitePWA(
        {
            registerType: "autoUpdate",
            manifest: {
                name: "Sudoku",
                short_name: "Sudoku",
                theme_color: "#000000",
                icons: [
                    {
                        src: "./icon.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })],
    base: "./",
    root: "./src",
    build: {
        emptyOutDir: true,
        outDir: "./../docs",
        publicDir: "./public"
    }
});