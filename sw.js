const C='cu-v1';const CORE=['index.html','style.css','logo.png','og-default.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);if(u.origin!==location.origin)return;
 e.respondWith(caches.match(q).then(h=>h||fetch(q).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(q,cp));return r;}).catch(()=>caches.match('index.html'))));});
