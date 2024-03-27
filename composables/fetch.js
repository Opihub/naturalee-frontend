import { useFetch, storeToRefs, useRuntimeConfig } from '#imports'
import { useAccountStore } from '@/stores/account'

function getApiUrl(url, options = {}) {
  let path = '/'
  const paths = [url]

  if (options?.version) {
    paths.unshift(`v${options.version}`)
  }

  path += paths.join('/').replaceAll(/\/+/g, '/')

  if (options?.params) {
    path += '?' + new URLSearchParams(options.params).toString()
  }

  return path
}

export function useFetchApi(url, options = {}, innerOptions = {}) {
  const config = useRuntimeConfig()

  innerOptions = {
    version: 1,
    dataOnly: false,
    ...innerOptions,
  }

  options = options || {}

  const auth = useAccountStore()
  const { token, isLoggedIn } = storeToRefs(auth)

  const fetchOptions = {
    ...options,
    headers: {
      Authorization:
        isLoggedIn && isLoggedIn.value ? `Bearer ${token.value}` : '',
      ...options?.headers,
    },
    pick: null,
  }

  if (!fetchOptions.baseURL && config?.public?.endpoint) {
    fetchOptions.baseURL = config.public.endpoint
  }

  return useFetch(
    getApiUrl(url, {
      version: innerOptions.version,
    }),
    fetchOptions
  )
}
