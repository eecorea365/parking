// script.js 변경 사항을 기존 PWA 사용자에게도 즉시 배포한다.
const CACHE_NAME = "tesla-qr-parking-v10.1.2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./manifest-admin.json",

    "./css/style.css",

    "./js/script.js",
    "./js/config.js",
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

        event.respondWith(
            caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })
        );

    }
);
