const APP_NAME = `AivoxoviA`;
const VERSION= `0.0.0`;
const CACHE_NAME = `${APP_NAME}-v${VERSION}`;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/pwa/',
      '/tabler-icons-2.36.0/svg/home.svg',
      '/tabler-icons-2.36.0/svg/wallet.svg',
      '/tabler-icons-2.36.0/svg/list-details.svg',
      '/tabler-icons-2.36.0/svg/help.svg',
      '/tabler-icons-2.36.0/svg/circle-filled.svg',
      '/tabler-icons-2.36.0/svg/brand-x-filled.svg',
      '/tabler-icons-2.36.0/svg/check.svg',
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        const fetchResponse = await fetch(event.request);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        console.error(e);
      }
    }
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === CACHE_NAME) {
            return;
          }
          return caches.delete(key);
        }),
      );
    }),
  );
});
