// script.js 변경 사항을 기존 PWA 사용자에게도 즉시 배포한다.
const CACHE_NAME = "tesla-qr-parking-v12.1.5";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./admin.html",
    "./manifest.json",
    "./manifest-admin.json",

    "./css/style.css",

    "./js/script.js",
    "./js/firebase.js",
    "./js/firebase-config.js",
    "./js/auth.js",
    "./js/config.js",
    "./js/icons.js",
    "./js/qrcode.min.js",

    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );

});
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cacheName => {

                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })

            );

        }).then(() => self.clients.claim())

    );

});
self.addEventListener(
    "fetch",
    event => {

        const isAppShellRequest =
            event.request.method === "GET" &&
            event.request.url.startsWith(self.location.origin) &&
            (event.request.mode === "navigate" || event.request.destination === "script");

        if (isAppShellRequest) {
            event.respondWith(
                fetch(event.request)
                    .then(response => {
                        const cachedResponse = response.clone();
                        event.waitUntil(
                            caches.open(CACHE_NAME).then(cache => {
                                return cache.put(event.request, cachedResponse);
                            })
                        );
                        return response;
                    })
                    .catch(() => caches.match(event.request))
            );
            return;
        }

        event.respondWith(
            caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })
        );

    }
);
