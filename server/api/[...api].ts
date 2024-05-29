import { LRUCache as LRU } from 'lru-cache'
import { H3Event } from 'h3'
import { useRuntimeConfig, isError, getQuery } from '#imports'

const config = useRuntimeConfig()

const cache = new LRU({
  max: 100,
  ttl: 1000 * 60 * 60, // One hour
})

// https://gist.github.com/nathanchase/6440bf72d34c047498edcd4f35c15e2a
export default defineEventHandler(async (event: H3Event): Promise<unknown> => {
  const url = event.context.params?.api

  if (!url) {
    throw createError({
      statusCode: 403,
    })
  }

  console.info(url)

  let startTime: number
  let duration: number

  const abortController = new AbortController()
  let timer: NodeJS.Timeout | null = null

  const method = event.method
  const params = getQuery(event)
  const body = method === 'GET' ? undefined : await readBody(event)
  const headers = getRequestHeaders(event)
  const cacheData = await cache.get(url)

  if (!cacheData || !cacheData?.success) {
    const response = $fetch(url, {
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
          `✔️%cSSR-Response: ${request} - ${response.status} %c(${duration}ms)`,
          'color: orange',
          'color: white'
        )
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
    cache.set(url, response)

    //console.debug(response)

    return response
  }

  // Log a cache hit to a given request URL
  console.log(`%c[SSR] Cache hit: ${url}`, 'color: orange')

  return cache.get(url)
})
