const C='przebudzeni-v0.10';
const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','instrukcja-okladka.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);if(u.pathname.endsWith('.mp4'))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.status===200&&u.origin===location.origin){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)))});
