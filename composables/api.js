import {
  useFetch,
  ref,
  storeToRefs,
  useRuntimeConfig,
  navigateTo,
} from '#imports'
import { createResponse } from '@/server/utils/responses'
import { useSessionStorage, StorageSerializers } from '@vueuse/core'
import { useAccountStore } from '@/stores/account'
import { saveJSON, loadJSON } from '@/utils/storageApi'

function getApiUrl(url, options = {}) {
  let path = '/'
  const paths = [url]

  if (options?.version) {
    paths.unshift(`v${options.version}`)
  }

  if (options?.local) {
    paths.unshift('api')
  }

  path += paths.join('/').replaceAll(/\/+/g, '/')

  if (options?.params) {
    path += '?' + new URLSearchParams(options.params).toString()
  }

  return path
}

export async function useApi(url, options = {}, innerOptions = {}) {
  const config = useRuntimeConfig()

  const apiKeys = useSessionStorage('apiKeys', [], {
    serializer: StorageSerializers.object,
  })

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

  const apiUrl = getApiUrl(url, {
    params: options.params,
    version: innerOptions.version,
    local: innerOptions.local,
  })

  let cached = ref(null)
  if (innerOptions.cache) {
    if (process.server) {
      const json = loadJSON(apiUrl, null)
      cached = ref(json)
    } else {
      apiKeys.value.push(apiUrl)
      cached = useSessionStorage(apiUrl, null, {
        // By passing null as default it can't automatically
        // determine which serializer to use
        serializer: StorageSerializers.object,
      })
    }
  }

  if (cached.value && cached.value.success) {
    return cached
  }

  const { data, error } = await useFetch(
    getApiUrl(url, {
      version: innerOptions.version,
      local: innerOptions.local,
    }),
    {
      ...options,
      baseURL: innerOptions.local ? null : config?.public?.endpoint,
      headers: {
        Authorization:
          isLoggedIn && isLoggedIn.value ? `Bearer ${token.value}` : '',
        ...options?.headers,
      },
      pick: null,
    }
  )

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

      if (responseData.code === 'jwt_auth_invalid_token') {
        await auth.logout(true)

        await navigateTo({
          path: '/',
        })
      }
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
    saveJSON(apiUrl, cached.value)
  }

  return cached
}
