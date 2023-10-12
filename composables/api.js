import { useFetch, ref, storeToRefs, useRuntimeConfig } from '#imports'
import { createResponse } from '@/server/utils/responses'
import { useSessionStorage, StorageSerializers } from '@vueuse/core'
import { useAccountStore } from '@/stores/account'
import { saveJSON, loadJSON } from '@/utils/storageApi'

export async function useApi(url, options = {}, innerOptions = {}) {
  const config = useRuntimeConfig()

  innerOptions = {
    version: 1,
    cache: true,
    local: false,
    dataOnly: false,
    ...innerOptions,
  }

  options = options || {}

  const auth = useAccountStore()
  const { token, isLoggedIn } = storeToRefs(auth)

  const apiUrl = (complete = false) => {
    let path = '/'
    const paths = [url]

    if (innerOptions.version) {
      paths.unshift(`v${innerOptions.version}`)
    }

    if (innerOptions.local) {
      paths.unshift('api')
    }

    path += paths.join('/').replaceAll(/\/+/g, '/')

    if (complete && options.params) {
      path += '?' + new URLSearchParams(options.params).toString()
    }

    return path
  }

  let cached = ref(null)
  if (innerOptions.cache) {
    if (process.server) {
      const json = loadJSON(apiUrl(true), null)
      cached = ref(json)
    } else {
      cached = useSessionStorage(apiUrl(true), null, {
        // By passing null as default it can't automatically
        // determine which serializer to use
        serializer: StorageSerializers.object,
      })
    }
  }

  if (cached.value && cached.value.success) {
    return cached
  }

  const { data, error } = await useFetch(apiUrl(), {
    ...options,
    baseURL: innerOptions.local ? null : config?.public?.endpoint,
    headers: {
      Authorization: isLoggedIn.value ? `Bearer ${token.value}` : '',
      ...options?.headers,
    },
    pick: null,
  })

  let responseData = data.value
  if (error.value) {
    const errorData = error.value?.data || {}

    if (
      'data' in errorData &&
      'success' in errorData &&
      'code' in errorData &&
      'message' in errorData &&
      'statusCode' in errorData
    ) {
      /**
       * Server error, can happen
       */
      responseData = errorData
      console.warn('errore previsto generato dal server:', responseData)
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

  if (process.server) {
    saveJSON(apiUrl(true), cached.value)
  }

  return cached
}
