import { useFetch, useRuntimeConfig } from '#imports'
import { createResponse } from '@/server/utils/responses'

export async function useApi(url, options = {}) {
  const config = useRuntimeConfig()

  const { data, error } = await useFetch(url, {
    ...options,
    baseURL: config?.public?.endpoint,
  })

  const response = createResponse(error.value ? error.value.data : data.value)

  // console.debug(error.value)
  // console.debug(error.value.data)
  // if (error.value) {
  //   throw new Error(response)
  // }

  return response
}
