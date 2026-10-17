const C='przebudzeni-v3.1.8';
const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','instrukcja-okladka.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);if(u.pathname.endsWith('.mp4')||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.status===200){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)))});
/* przypomnienia */
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'Azyl',{body:d.body||'',tag:d.tag||'azyl',icon:'icon-192.png',badge:'icon-192.png',lang:'pl',data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();
 const url=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if(c.url.startsWith(self.registration.scope)&&'focus' in c){if(c.navigate)c.navigate(url).catch(()=>{});return c.focus()}}return clients.openWindow(url)}))});
