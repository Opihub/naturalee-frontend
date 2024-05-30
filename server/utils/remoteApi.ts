import { createResponse } from '~/utils/responses'
import { useRuntimeConfig, isError, getQuery } from '#imports'
import { $fetch } from 'ofetch'
import { H3Event } from 'h3'

export async function useRemoteApi(event: H3Event, url: string, options = {}) {
  const config = useRuntimeConfig()

  let params = {}
  if (event && event instanceof H3Event) {
    params = getQuery(event)
  }

  let headers = { authorization: event.context?.authorization }
  if ('headers' in options) {
    headers = {
      ...(options.headers as Record<string | number | symbol, any>),
      ...headers,
    }
  }

  const data = await $fetch(url, {
    baseURL: config?.public?.endpoint,
    params,
    ...options,
    headers,
  })

  if (isError(data)) {
    throw data
  }

  return createResponse(data)
}
