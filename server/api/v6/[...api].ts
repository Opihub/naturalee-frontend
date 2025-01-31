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

  const method = event.method
  const params = getQuery(event)
  // const body = method === 'GET' ? undefined : await readBody(event)
  const headers = getRequestHeaders(event)

  const cacheControl = getRequestHeader(event, 'Cache-Control') || ''

  const { noCache = false } = parse(cacheControl)

  if (cacheControl) {
    event.node.res.setHeader('Cache-Control', cacheControl)
  }

  console.info('v6', `v1/${url}`)


  // le chiamate con cache sono sempre anonime rimuovendo authorization
  // if (!noCache) {
  //   if (headers?.['authorization']) {
  //     delete headers['authorization']
  //   }
  // }

  console.info(headers)

  // lastDay = today

  return $fetch(`v1/${url}`, {
    baseURL: config.endpoint,
    params,
    method,
    // body,
    // headers,
  })
})
