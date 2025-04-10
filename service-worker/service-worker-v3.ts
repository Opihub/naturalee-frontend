import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setDefaultHandler } from 'workbox-routing'
import { NetworkFirst, CacheFirst, NetworkOnly } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// Give TypeScript the correct global.
declare let self: ServiceWorkerGlobalScope

const { VITE_SITE_URL } = import.meta.env

console.info('SW v2.1')
cleanupOutdatedCaches()

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'html-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 10 })],
  }),
  'GET'
)
if (VITE_SITE_URL) {
  const apiBaseRoute = `${VITE_SITE_URL}/api/`
  const apiRoute = new RegExp(`^${apiBaseRoute}.*$`, 'i')
  registerRoute(
    ({ url }) => {
      const isApi = url.pathname.match(apiRoute)

      if (!isApi) {
        return false
      }

      const route = url.pathname.replace(apiBaseRoute, '')
      console.log(route, url.pathname)

      if (
        route.includes('profile') ||
        route.includes('shop/addresses') ||
        route.includes('shop/cart') ||
        route.includes('shop/wishlist') ||
        route.includes('shop/orders') ||
        route.includes('webpushr')
      ) {
        return false
      }

      // Bisogna essere loggati per usare il checkout
      if (
        route.includes('shop/checkout/save') ||
        route.includes('shop/checkout/payment-intent')
      ) {
        return false
      }

      return true
    },
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

self.skipWaiting()
clientsClaim()
