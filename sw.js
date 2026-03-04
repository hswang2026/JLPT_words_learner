const CACHE_NAME = 'jlpt-new-repo-v1';
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
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(k => caches.delete(k)));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
