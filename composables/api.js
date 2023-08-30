import { useFetch, useRuntimeConfig } from '#imports'
import { createResponse } from '@/server/utils/responses'

export async function useApi(url, options = {}) {
  const config = useRuntimeConfig()

  const { data, error } = await useFetch(url, {
    ...options,
    baseURL: config?.public?.endpoint,
  })

  let responseData = data.value
  if (error.value) {
    if (error.value.data && typeof error.value.data === 'object') {
      responseData = error.value.data
    } else {
      throw new Error(error.value)
    }
  }

  const response = createResponse(responseData)

  return response
}
