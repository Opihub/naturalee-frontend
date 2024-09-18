import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin'
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import {
  NavigationRoute,
  registerRoute,
  setDefaultHandler,
} from 'workbox-routing'
import { NetworkFirst, CacheFirst, NetworkOnly } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// Give TypeScript the correct global.
declare let self: ServiceWorkerGlobalScope

const { VITE_SITE_URL } = import.meta.env

// await fetch('https://cdn.webpushr.com/sw-server.min.js')

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// // to allow work offline
// registerRoute(
//   new NavigationRoute(createHandlerBoundToURL('index.html'), {
//     denylist: [/^\/backoffice/],
//   })
// )

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'html-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 10 })],
  }),
  'GET'
)
if (VITE_SITE_URL) {
  registerRoute(
    new RegExp(`^${VITE_SITE_URL}/api/.*`, 'i'),
    new CacheFirst({
      cacheName: 'api-cache',
      plugins: [
        new ExpirationPlugin({ maxAgeSeconds: 86400 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    'GET'
  )
  // registerRoute(
  //   new RegExp(
  //     `^${VITE_SITE_URL}/wp-content/uploads/.*`,
  //     'i'
  //   ),
  //   new CacheFirst({
  //     cacheName: 'media-cache',
  //     plugins: [
  //       new ExpirationPlugin({ maxAgeSeconds: 2592e3 }),
  //       new CacheableResponsePlugin({ statuses: [0, 200] }),
  //     ],
  //   }),
  //   'GET'
  // )
  registerRoute(
    new RegExp(`^${VITE_SITE_URL}/.*/.*.(png|jpe?g|webp)`, 'i'),
    new CacheFirst({
      cacheName: 'assets-cache',
      plugins: [
        new ExpirationPlugin({ maxAgeSeconds: 31536e3 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    'GET'
  )
  registerRoute(
    new RegExp(`^${VITE_SITE_URL}/.*/.*.(woff2?|ttf)`, 'i'),
    new CacheFirst({
      cacheName: 'assets-cache',
      plugins: [
        new ExpirationPlugin({ maxAgeSeconds: 31536e3 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    'GET'
  )
}
registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536e3 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
  'GET'
)
registerRoute(
  /^https:\/\/fonts\.gstatic\.com\/.*/i,
  new CacheFirst({
    cacheName: 'gstatic-fonts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536e3 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
  'GET'
)

setDefaultHandler(new NetworkOnly())

try {
  importScripts('https://cdn.webpushr.com/sw-server.min.js')
} catch (error) {
  console.warn('caricamento fallito per Webpushr')
}

// self.skipWaiting()
clientsClaim()
