const CACHE_NAME = 'dose-app-v1';
const urlsToCache = [
  '/',
  'index.html',
  'main.dart.js',
  'flutter.js',
  'flutter_bootstrap.js',
  'manifest.json',
  'icons/Icon-192.png',
  'icons/Icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
