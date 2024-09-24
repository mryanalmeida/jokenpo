const CACHE_NAME = 'jokenpo-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/img/pedra.png',
    '/img/papel.png',
    '/img/tesoura.png',
    '/img/pcpedra.png',
    '/img/pcpapel.png',
    '/img/pctesoura.png',
    '/img/logo2.png',
    // Adicione outros arquivos necessários
];

// Instala o service worker e faz o cache dos arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Faz o cache de recursos durante a ativação
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta requisições e serve do cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna a resposta do cache, ou faz a requisição se não estiver no cache
                return response || fetch(event.request).then((networkResponse) => {
                    // Atualiza o cache com a nova resposta
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
    );
});
