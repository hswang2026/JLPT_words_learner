const CACHE_NAME = 'jlpt-v5-final';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'vocabulary.json',
  'index-ByyZV54e.js',
  'index-B6ykaXxV.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => k !== CACHE_NAME && caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
