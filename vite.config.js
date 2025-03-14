import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";

// vite.config.js
export default defineConfig({
    // config options
    plugins: [VitePWA(
        {
            registerType: "autoUpdate",
            strategies: "generateSW",
            injectRegister: "auto",
            devOptions: {
                enabled: true
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
                navigateFallback: 'index.html',
                navigateFallbackDenylist: [/^\/[^/]+.(?!webmanifest$).*$/],
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:js|css)$/,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "assets",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:html)$/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "pages",
                            networkTimeoutSeconds: 3,
                            expiration: {
                                maxEntries: 10
                            }
                        }
                    }
                ]
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
                        purpose: "any maskable"
                    }
                ]
            }
        }),
    viteSingleFile()],
    base: "./",
    root: "./src",
    build: {
        emptyOutDir: true,
        outDir: "./../docs",
        publicDir: "./public"
    }
});