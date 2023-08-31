import { createResponse } from '@/server/utils/responses'
import { useRuntimeConfig, isError } from '#imports'
import { $fetch } from 'ofetch'

export async function useRemoteApi(url, options = {}) {
  const config = useRuntimeConfig()

  const data = await $fetch(`${url}`, {
    baseURL: config?.public?.endpoint,
    ...options,
  })

  if (isError(data)) {
    throw data
  }

  return createResponse(data)
}
