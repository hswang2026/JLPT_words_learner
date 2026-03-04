const CACHE_NAME = 'jlpt-vocab-v3'; // Increased version to force update
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'vocabulary.json',
  'index-ByyZV54e.js',
  'index-B6ykaXxV.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force the new version to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
