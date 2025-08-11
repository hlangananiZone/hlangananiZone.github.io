```javascript
const cacheName = 'hlanganani-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/terms.html',
  '/services.html',
  '/rates.html',
  '/about.html',
  '/news.html',
  '/images/logo.png',
  '/fonts/font.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```
