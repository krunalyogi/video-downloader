const CACHE_NAME = 'kliptify-v1';
const STATIC_ASSETS = [
    '/',
    '/about',
    '/blog',
    '/tools/batch-downloader',
    '/tools/image-converter',
    '/manifest.json',
    '/favicon.ico',
];

// Install: pre-cache key pages
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
        )
    );
    self.clients.claim();
});

// Fetch: network-first for API, cache-first for static
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and API/download requests
    if (request.method !== 'GET' || url.pathname.startsWith('/api/')) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful page responses
                if (response.ok && (url.pathname === '/' || url.pathname.startsWith('/tools') || url.pathname.startsWith('/blog'))) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return response;
            })
            .catch(() => {
                // Offline fallback — serve from cache
                return caches.match(request) || caches.match('/');
            })
    );
});
