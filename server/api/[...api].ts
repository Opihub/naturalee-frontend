// import { LRUCache as LRU } from 'lru-cache'
import { kv } from '@vercel/kv'
import { H3Event } from 'h3'
import { useRuntimeConfig, isError, getQuery } from '#imports'

const config = useRuntimeConfig()

const cache = {
  max: 100,
  ttl: 1000 * 60 * 60, // One hour
}

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
  console.info(url)

  let startTime: number
  let duration: number

  const abortController = new AbortController()
  let timer: NodeJS.Timeout | null = null

  const KV_ENABLED =
    config.useKv &&
    !!KV_URL &&
    !!KV_REST_API_URL &&
    !!KV_REST_API_TOKEN &&
    !!KV_REST_API_READ_ONLY_TOKEN

  console.info(`KV_ENABLED: ${KV_ENABLED}`)

  const method = event.method
  const params = getQuery(event)
  const body = method === 'GET' ? undefined : await readBody(event)
  const headers = getRequestHeaders(event)
  const cacheData = KV_ENABLED ? await kv.get(cacheKey) : null

  if (cacheData && typeof cacheData === 'object' && 'success' in cacheData) {
    // Log a cache hit to a given request URL
    console.log(`%c[SSR] Cache hit: ${url}`, 'color: orange')

    // return kv.get(cacheKey)
    return cacheData
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

  if (method !== 'GET' || headers?.['x-cache'] === 'no-cache') {
    return response
  }

  // Set response to cache
  if (KV_ENABLED) {
    try {
      await kv.set(cacheKey, response, { ex: cache.ttl })
    } catch (error) {
      console.log('kv error ', error)
    }
  }

  return response
})
