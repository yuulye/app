self.importScripts('data.js');

const APP_NAME = data.appName;
const VERSION= data.version;
const CACHE_NAME = `${APP_NAME}-v${VERSION}`;
const LIST = cacheList;

self.onmessage = (event) => {
  console.log(`[main-thread] -> [sw.js]: ${event.data}`);
  event.source.postMessage({version: VERSION});
};

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(LIST);
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
