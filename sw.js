// Vikram Calendar — Service Worker
// Cache-first strategy: serve from cache instantly, update in background.

const CACHE = 'vikram-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap'
];

// ── Install: pre-cache all app shell assets ──────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'}))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())          // don't block install on font failure
  );
});

// ── Activate: delete old caches ──────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Notification message handler ─────────────────────────────────────────────
// The page posts {type:'NOTIFY', title, body, …} so the SW can show a
// persistent system notification even when the app is in the background.
self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'NOTIFY') return;
  const { title, body, icon, badge, tag, vibrate, requireInteraction } = e.data;
  self.registration.showNotification(title, {
    body:               body   || '',
    icon:               icon   || './icons/icon-192.png',
    badge:              badge  || './icons/favicon-32.png',
    tag:                tag    || 'vikram',
    vibrate:            vibrate|| [200, 100, 200],
    requireInteraction: requireInteraction || false,
  });
});

self.addEventListener('fetch', e => {
  // Only handle GET requests
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const networkFetch = fetch(e.request)
        .then(res => {
          // Cache successful responses (same-origin + fonts)
          if (res.ok && (
            e.request.url.startsWith(self.location.origin) ||
            e.request.url.includes('fonts.g')
          )) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached); // if offline and no cache, return whatever we have

      return cached || networkFetch;
    })
  );
});
