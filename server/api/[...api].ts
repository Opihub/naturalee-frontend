import { kv } from '@vercel/kv'
import { H3Event } from 'h3'
import { useRuntimeConfig, getQuery } from '#imports'
import TTLCache from '@isaacs/ttlcache'
import { parse } from 'cache-parser'

const config = useRuntimeConfig()

const cacheOptions = {
  max: 100,
  ttl: 1000 * 60 * 60, // One hour
}

const storageCache = new TTLCache(cacheOptions)

// https://gist.github.com/nathanchase/6440bf72d34c047498edcd4f35c15e2a
export default defineEventHandler(async (event: H3Event): Promise<unknown> => {
  const url = event.context.params?.api
  const cacheKey = event?._path || ''
  if (!url) {
    throw createError({
      statusCode: 403,
    })
  }

  const {
    KV_URL,
    KV_REST_API_URL,
    KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN,
  } = process.env

  let startTime: number
  let duration: number

  const abortController = new AbortController()
  let timer: NodeJS.Timeout | null = null

  const KV_ENABLED =
    !!config.useKv &&
    !!KV_URL &&
    !!KV_REST_API_URL &&
    !!KV_REST_API_TOKEN &&
    !!KV_REST_API_READ_ONLY_TOKEN

  const method = event.method
  const params = getQuery(event)
  const body = method === 'GET' ? undefined : await readBody(event)
  const headers = getRequestHeaders(event)
  const cacheData = await (KV_ENABLED ? kv.get(cacheKey) : storageCache.get(cacheKey))

  const { maxAge, noCache = false } = parse(
    getRequestHeader(event, 'Cache-Control') || ''
  )

  const ttl = maxAge ? maxAge * 1000 : cacheOptions.ttl

  console.info(url, `CACHE USATA: ${KV_ENABLED ? 'KV' : 'LRU'}`)

  if (cacheData && typeof cacheData === 'object' && 'success' in cacheData) {
    // Log a cache hit to a given request URL
    console.log(`%c[SSR] Cache hit: ${url}`, 'color: orange')

    // return kv.get(cacheKey)
    return cacheData
  }

  // le chiamate con cache sono sempre anonime rimuovendo authorization
  if (!noCache) {
    if (headers?.['authorization']) {
      delete headers['authorization']
    }
  }

  const response = await $fetch(url, {
    // Serve ad far "scivolare" la gestione degli errori al client
    ignoreResponseError: true,
    baseURL: config.endpoint,
    params,
    method,
    body,
    retry: 10,
    signal: abortController.signal,
    headers,

    // Log request
    async onRequest({ request, options }) {
      if (method === 'GET') {
        timer = setTimeout(() => {
          abortController.abort()
          console.log(`Retrying request to: ${request}`)
        }, 5000) // Abort request in 2.5s.
      }

      startTime = new Date().getTime()
      options.headers = new Headers(options.headers)
      options.headers.set('starttime', `${new Date().getTime()}`)

      await console.log(
        `%c[${new Date().toLocaleTimeString()}] %cSSR-Request: %c${request}`,
        'color: gray',
        'color: orange',
        'color: white'
      )
    },

    // Log response
    async onResponse({ request, response }) {
      if (timer) {
        clearTimeout(timer) // clear timer
      }

      const currentTime = new Date().getTime()
      duration = currentTime - startTime

      await console.log(
        `✔️ %c SSR-Response: ${request} - ${response.status} %c(${duration}ms)`,
        'color: orange',
        'color: white'
      )

      if (response.status !== 200) {
        console.log(
          '🔴 questa chiama ' + response.status + ' non la salvo in cache'
        )
        await console.log(
          `✔️ %c SSR-Feedback: request ${JSON.stringify(request)})`,
          'color: orange',
          'color: white'
        )
        await console.log(
          `✔️ %c SSR-Feedback: response ${JSON.stringify(response)})`,
          'color: orange',
          'color: white'
        )
      } else {
        if (method === 'GET' && !noCache) {
          console.log(
            `🟢 questa chiama la salvo in cache per ${ttl}ms`
          )
          try {
            if (KV_ENABLED) {
              await kv.set(cacheKey, response._data, { px: ttl })
            } else {
              await storageCache.set(cacheKey, response._data, { ttl })
            }
          } catch (error) {
            console.log('Cache error ', error)
          }
        } else {
          console.log('🟡 questa chiama 200 non la salvo in cache')
        }
      }
    },

    // Log error
    async onResponseError({ error }) {
      await console.error(
        '%cSSR-Error',
        error,
        'color: white; background: red;'
      )
    },
  })

  return response
})
