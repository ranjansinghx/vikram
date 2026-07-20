// ── Service Worker: registered as the very first thing on the page, before
// any other rendering/init work, so it has the best possible chance of
// completing even on a slow or first-time visit. This is what lets the app
// open when there's no internet (or a flaky connection) on later visits —
// once installed, the SW serves the app shell from cache instead of relying
// on the network reaching a live server.
(function () {
    if (location.protocol === 'file:' || !('serviceWorker' in navigator))
        return;
    window.VIKRAM_SW_CACHE = 'vikram-v24';
    window.vikramBuildSW = function () {
        return `
const CACHE='${window.VIKRAM_SW_CACHE}';
const PAGE_URL=self.location.href.split('?')[0];
const NAV_TIMEOUT=4000; // ms — on a slow/unstable connection, don't hang: fall back to cache quickly

function timeoutFetch(req, opts, ms){
  return new Promise(function(resolve){
    let done=false;
    const t=setTimeout(function(){ if(!done){ done=true; resolve(null); } }, ms);
    fetch(req, opts).then(function(r){ if(!done){ done=true; clearTimeout(t); resolve(r); } })
      .catch(function(){ if(!done){ done=true; clearTimeout(t); resolve(null); } });
  });
}

// Install: pre-cache the app page. Retried below (in fetch) if this fails
// silently on a bad connection, so a flaky first visit can't leave the
// cache permanently empty.
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c=>
      fetch(PAGE_URL,{cache:'reload'})
        .then(r=>{ if(r&&r.ok) return c.put(PAGE_URL,r); })
        .catch(()=>{})
    )
  );
});

// Activate: purge old caches, claim clients immediately
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

// Fetch strategy
self.addEventListener('fetch',e=>{
  const req=e.request;
  const url=new URL(req.url);
  const isNav=req.mode==='navigate';
  const isFont=url.hostname.includes('fonts.g');
  const isExternal=url.hostname!==self.location.hostname;

  if(isNav){
    // Race the network against a short timeout: an unstable connection that
    // never resolves shouldn't leave the app stuck — fall back to the cached
    // shell quickly, but keep it fresh whenever the network *does* answer.
    e.respondWith(
      timeoutFetch(req,{cache:'no-cache'},NAV_TIMEOUT).then(r=>{
        if(r&&r.ok){
          caches.open(CACHE).then(c=>c.put(PAGE_URL,r.clone()));
          return r;
        }
        return caches.open(CACHE).then(c=>
          c.match(PAGE_URL).then(cached=>{
            if(cached) return cached;
            // Nothing cached yet — give the real network one last try
            // (covers a connection that's slow but does work) before giving up.
            return fetch(req,{cache:'no-cache'})
              .then(r2=>{ if(r2&&r2.ok) c.put(PAGE_URL,r2.clone()); return r2; })
              .catch(()=>new Response('Offline',{status:503}));
          })
        );
      })
    );
  } else if(isFont||isExternal){
    // Cache-first for fonts; network-first with cache fallback for other external
    e.respondWith(
      isFont
        ? caches.open(CACHE).then(c=>
            c.match(req).then(hit=>{
              if(hit)return hit;
              return fetch(req).then(r=>{ if(r&&r.ok)c.put(req,r.clone()); return r; })
                .catch(()=>new Response('',{status:503}));
            })
          )
        : fetch(req)
            .then(r=>{ if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())); return r; })
            .catch(()=>caches.match(req).then(r=>r||new Response('',{status:503})))
    );
  } else {
    // Same-origin non-navigation: network-first, cache fallback for offline
    e.respondWith(
      fetch(req)
        .then(r=>{ if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())); return r; })
        .catch(()=>caches.match(req).then(r=>r||new Response('',{status:503})))
    );
  }
});

// Push notifications
self.addEventListener('message',e=>{
  if(!e.data)return;
  if(e.data.type==='SKIP_WAITING'){self.skipWaiting();return;}
  if(e.data.type==='NOTIFY'){
    const{title,body,icon,badge,tag,vibrate,requireInteraction}=e.data;
    self.registration.showNotification(title,{body,icon,badge,tag,vibrate,requireInteraction});
  }
});`;
    };
    // Registers (or re-registers) the SW. Safe to call more than once — later
    // calls are cheap no-ops if a registration already exists and is unchanged.
    window.vikramRegisterSW = function () {
        if (window._vikramSwRegistering)
            return window._vikramSwRegistering;
        const swBlob = new Blob([window.vikramBuildSW()], { type: 'application/javascript' });
        const swURL = URL.createObjectURL(swBlob);
        window._vikramSwRegistering = navigator.serviceWorker.register(swURL, { scope: './' })
            .then(function (reg) {
            const primeCache = function () {
                caches.open(window.VIKRAM_SW_CACHE).then(function (c) {
                    c.add(window.location.href.split('?')[0]).catch(function () { });
                    ['https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap']
                        .forEach(function (u) { fetch(u).then(function (r) { if (r && r.ok)
                        c.put(u, r); }).catch(function () { }); });
                });
            };
            if (reg.active)
                primeCache();
            else if (reg.installing || reg.waiting) {
                const w = reg.installing || reg.waiting;
                w.addEventListener('statechange', function () { if (this.state === 'activated')
                    primeCache(); });
            }
            navigator.serviceWorker.addEventListener('controllerchange', primeCache);
            return reg;
        })
            .catch(function () { window._vikramSwRegistering = null; });
        return window._vikramSwRegistering;
    };
    // Register right now — don't wait for the rest of the app to finish loading.
    window.vikramRegisterSW();
})();
