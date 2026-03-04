const CACHE_NAME = 'jlpt-v4-final';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'vocabulary.json',
  'index-ByyZV54e.js',
  'index-B6ykaXxV.css'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
});

self.addEventListener('fetch', (e) => {
  // Only handle GET requests and avoid local chrome extensions
  if (e.request.method !== 'GET' || !e.request.url.startsWith('http')) return;
  
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
