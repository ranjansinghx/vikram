// Vikram Calendar — Service Worker v2.2.0
// Cache-first strategy: serve from cache instantly, update in background.

const CACHE = 'vikram-v5';
const PAGE_URL = self.location.href.split('?')[0].replace('sw.js', '');

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap'
];

// ── Install: pre-cache all app shell assets ──────────────────────────────────
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
      .catch(() => {}) // don't block install on font/asset failure
  );
});

// ── Activate: delete ALL old caches and claim clients ────────────────────────
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
self.addEventListener('message', e => {
  if (!e.data) return;
  if (e.data.type === 'NOTIFY') {
    const { title, body, icon, badge, tag, vibrate, requireInteraction } = e.data;
    self.registration.showNotification(title, {
      body:               body   || '',
      icon:               icon   || './icons/icon-192.png',
      badge:              badge  || './icons/favicon-32.png',
      tag:                tag    || 'vikram',
      vibrate:            vibrate|| [200, 100, 200],
      requireInteraction: requireInteraction || false,
    });
  }
  if (e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ── Fetch strategy ────────────────────────────────────────────────────────────
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isNav    = e.request.mode === 'navigate';
  const isFont   = url.hostname.includes('fonts.g');
  const isLocal  = url.hostname === self.location.hostname;

  if (isNav) {
    // Stale-while-revalidate for navigation: serve cached instantly, refresh in bg
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(e.request).then(cached => {
          const fresh = fetch(e.request, { cache: 'no-cache' })
            .then(r => { if (r && r.ok) c.put(e.request, r.clone()); return r; })
            .catch(() => null);
          return cached || fresh;
        })
      )
    );
  } else if (isFont) {
    // Cache-first for Google Fonts
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(e.request).then(hit => {
          if (hit) return hit;
          return fetch(e.request)
            .then(r => { if (r && r.ok) c.put(e.request, r.clone()); return r; })
            .catch(() => new Response('', { status: 503 }));
        })
      )
    );
  } else if (isLocal) {
    // Network-first for same-origin assets, cache fallback for offline
    e.respondWith(
      fetch(e.request)
        .then(r => {
          if (r && r.ok) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
          return r;
        })
        .catch(() => caches.match(e.request).then(r => r || new Response('', { status: 503 })))
    );
  }
  // External (non-font) requests: pass through, no caching
});
