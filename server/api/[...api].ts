import { H3Event } from 'h3'
import { useRuntimeConfig, getQuery } from '#imports'
import { parse } from 'cache-parser'

// https://gist.github.com/nathanchase/6440bf72d34c047498edcd4f35c15e2a
export default defineEventHandler(async (event: H3Event): Promise<unknown> => {
  const config = useRuntimeConfig()

  const url = event.context.params?.api
  if (!url) {
    throw createError({
      statusCode: 403,
    })
  }

  let startTime: number
  let duration: number

  const abortController = new AbortController()
  let timer: NodeJS.Timeout | null = null

  const method = event.method
  const params = getQuery(event)
  const body = method === 'GET' ? undefined : await readBody(event)
  const requestHeaders = getRequestHeaders(event)
  const headers = new Headers()

  console.info('Send from', requestHeaders?.referer)

  const cacheControl = getRequestHeader(event, 'Cache-Control') || ''

  console.log(
    'IP: ',
    getRequestIP(event, {
      xForwardedFor: true,
    })
  )
  console.log('user-agent: ', requestHeaders?.['user-agent'])
  // console.log('requestHeaders: ', requestHeaders)

  const { noCache = false } = parse(cacheControl)

  if (cacheControl) {
    headers.set('Cache-Control', cacheControl)
    event.node.res.setHeader('Cache-Control', cacheControl)
  }

  console.info(url)

  // le chiamate da non mettere in cache generalmente saranno quelle con il token JWT
  if (noCache && requestHeaders?.['authorization']) {
    headers.set('authorization', requestHeaders['authorization'])
  }

  if (requestHeaders?.['cookie']) {
    headers.set('cookie', requestHeaders['cookie'])
  }

  return $fetch(url, {
    // Serve ad far "scivolare" la gestione degli errori al client
    ignoreResponseError: true,
    baseURL: config.endpoint,
    params,
    method,
    body,
    retry: 10,
    retryDelay: 5000,
    timeout: 5000,
    signal: abortController.signal,
    headers,

    // Log request
    async onRequest({ request, options }) {
      startTime = new Date().getTime()

      options.headers = new Headers(options.headers)
      options.headers.set('starttime', `${new Date().getTime()}`)

      if (method === 'GET') {
        timer = setTimeout(() => {
          abortController.abort()
          console.log(
            `Retrying request to: "${request}" at ${new Date().getTime()}`
          )
        }, 5000) // Abort request in 2.5s.
      }

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
    },

    // Log error
    async onResponseError({ error }) {
      if (timer) {
        clearTimeout(timer) // clear timer
      }

      await console.error(
        '%cSSR-Error',
        error,
        'color: white; background: red;'
      )
    },
  })
})
