import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// vite.config.js
export default defineConfig({
    // config options
    plugins: [VitePWA(
        {
            manifest: {
                name: "Sudoku",
                short_name: "Sudoku",
                theme_color: "#317EFB",
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