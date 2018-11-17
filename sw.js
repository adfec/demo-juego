var dataCacheName = 'demo';
var cacheName = 'demoPWA';
var filesToCache = [
  '/',
  '/index.html',
  '/avatar.html',
  '/guia1.html',
  '/guia2.html',
  '/guia3.html',
  '/juego.html',
  '/perfil.html',
  '/bootstrap.css',
  '/jquery.js',
  '/bootstrap.js',
  '/images/el.png',
  '/images/ella.png',
  '/images/logo.png',
  '/images/monstruo.png',
  '/images/pista.png',
  '/images/tierra.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    }).catch(function(error) {
        console.log('No se pudo crear caché ' + error);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  //if (e.request.method === 'GET') {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
	      return cache.match(e.request).then(function(response){
	        return response || fetch(e.request).then(function(response){
	          cache.put(e.request.url, response.clone());
	          return response;
	        });
	      });
      })
    );
  //}
});
