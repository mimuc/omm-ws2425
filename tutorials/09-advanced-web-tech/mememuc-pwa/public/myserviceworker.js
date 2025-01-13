console.log("Hello, this message is sent by a service worker");

// var CACHE_NAME = 'my-pwa-cache-v1';
// var urlsToCache = [
//     '/',
//     '/static/js/bundle.js',
//     '/favicon.ico',
//     '/logo192.png',
//     '/index.html',
//     '/manifest.json'
// ];
// self.addEventListener('install', function(event) {
//     console.log("serviceworker: install")
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(async function(cache) {
//                 // Open a cache and cache our files
//                 return await cache.addAll(urlsToCache);
//             })
//     );
// });

// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
var precacheResources = [
    '/',
    '/static/js/bundle.js',
    '/favicon.ico',
    '/logo192.png',
    '/index.html',
    '/manifest.json'
];


// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});