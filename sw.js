var dataCacheName = 'demo';
var cacheName = 'demoPWA';
var filesToCache = [
  '/index.html',
  '/avatar.html',
  '/guia.html',
  '/juego.html',
  '/perfil.html'
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
});
