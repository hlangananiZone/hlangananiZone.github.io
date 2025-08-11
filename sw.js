```javascript
// sw.js

const CACHE_NAME = 'hlanganani-cache-v1';
const OFFLINE_URL = '/offline.html';

// List of files to cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  OFFLINE_URL,
  '/logo.png' // Add more static files if needed
];

// Install: cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve cached content or fallback offline page
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => {return caches.match(event.request).then(response => {
          return response || caches.match(OFFLINE_URL);
        });
      })
  );
});
```

