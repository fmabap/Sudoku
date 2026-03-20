// This is the service worker script for the Mastermind PWA

// Cache name with version to ensure proper updates
const CACHE_NAME = "sudoku-v1";

// Precache manifest will be injected here by workbox
// This line is required for the injectManifest strategy
const manifestEntries = self.__WB_MANIFEST;

// List of files to cache for offline use
// index.html, icons and hashed assets are already covered by the
// workbox-injected self.__WB_MANIFEST entries below.
const filesToCache = ["./", "./manifest.webmanifest"];

// Install event - cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache opened");
        // Add both the precache manifest entries and our custom files
        return cache.addAll([
          ...filesToCache,
          ...(manifestEntries ? manifestEntries.map((entry) => entry.url) : []),
        ]);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request because it's a one-time-use stream
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response because it's a one-time-use stream
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Don't cache API requests or similar dynamic content
            if (event.request.url.indexOf("/api/") === -1) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        })
        .catch(() => {
          // If fetch fails (e.g., offline), try to serve the offline page
          // or return an appropriate offline response
          return new Response(
            "You are offline. Please reconnect to use this app.",
          );
        });
    }),
  );
});
