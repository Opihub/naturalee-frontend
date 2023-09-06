import { createResponse } from '@/server/utils/responses'
import { useFetch, ref } from '#imports'
import { useSessionStorage, StorageSerializers } from '@vueuse/core'

export async function useApi(url, options = {}, innerOptions = {}) {
  innerOptions = {
    cache: true,
    local: true,
    dataOnly: false,
    ...innerOptions,
  }

  options = options || {}

  const apiUrl = innerOptions.local ? `/api/${url}` : url

  let cached = ref(null)
  if (innerOptions.cache) {
    cached = useSessionStorage(apiUrl, null, {
      // By passing null as default it can't automatically
      // determine which serializer to use
      serializer: StorageSerializers.object,
    })
  }

  if (cached.value) {
    return cached
  }

  const { data, error } = await useFetch(apiUrl, {
    ...options,
    pick: null,
  })

  let responseData = data.value
  if (error.value) {
    const errorData = error.value?.data || {}
    if ('data' in errorData && typeof errorData.data === 'object') {
      /**
       * Server error, can happen
       */
      responseData = errorData.data
      console.warn(responseData)
    } else {
      /**
       * Client error, must not happen
       * Reason: calling wrong endpoint
       */
      throw error.value
    }
  }

  let response = createResponse(responseData)

  if (
    'pick' in options &&
    Array.isArray(options.pick) &&
    options.pick.length > 0
  ) {
    response.data = Object.keys(response.data).reduce((accumulator, key) => {
      const value = response[key]

      if (options.pick.includes(key)) {
        accumulator[key] = value
      }

      return accumulator
    }, {})
  }

  cached.value = innerOptions.dataOnly ? response.data : response

  return cached
}
