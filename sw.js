var dataCacheName = 'demo';
var cacheName = 'demoPWA';
var filesToCache = [
  '/ruta/',
  '/ruta/asistencias',
  '/ruta/colegios',
  '/ruta/conductores',
  '/ruta/estudiantes',
  '/ruta/horarios',
  '/ruta/monitores',
  '/ruta/novedades',
  '/ruta/rutas',
  '/ruta/vehiculos',
  '/ruta/resources/assets/css/bootstrap.min.css',
  '/ruta/resources/assets/css/animate.min.css',
  '/ruta/resources/assets/css/light-bootstrap-dashboard.css?v=1.4.0',
  '/ruta/resources/assets/css/pe-icon-7-stroke.css',
  '/ruta/resources/assets/css/dataTable.min.css',
  '/ruta/resources/assets/css/checkbox.css',
  '/ruta/resources/assets/js/jquery.3.2.1.min.js',
  '/ruta/resources/assets/js/bootstrap.min.js',
  '/ruta/resources/assets/js/bootstrap-notify.js',
  '/ruta/resources/assets/js/light-bootstrap-dashboard.js?v=1.4.0',
  '/ruta/resources/assets/js/notification.js',
  '/ruta/resources/assets/js/octa.js',
  '/ruta/resources/assets/app/administracion.js',
  '/ruta/resources/assets/app/asistencias.js',
  '/ruta/resources/assets/app/colegios.js',
  '/ruta/resources/assets/app/conductores.js',
  '/ruta/resources/assets/app/estudiantes.js',
  '/ruta/resources/assets/app/login.js',
  '/ruta/resources/assets/app/menu.js',
  '/ruta/resources/assets/app/monitores.js',
  '/ruta/resources/assets/app/novedades.js',
  '/ruta/resources/assets/app/rutas.js',
  '/ruta/resources/assets/app/vehiculoRegistros.js',
  '/ruta/resources/assets/app/vehiculos.js',
  '/ruta/resources/assets/img/preload.gif',
  '/ruta/resources/assets/img/sidebar.jpg',
  '/ruta/resources/assets/img/faces/default.png'
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
