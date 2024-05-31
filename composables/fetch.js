import { useFetch, storeToRefs } from '#imports'
import { useAccountStore } from '@/stores/account'

/* import https from 'https' */

function getApiUrl(url, options = {}) {
  let path = '/api/'
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

export function useFetchApi(url, options = {}) {
  options = options || {}

  const version = options?.version || 1
  const clientSide = (typeof options?.server == "boolean") ? !options?.server : false

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

  // fetchOptions.baseURL = '/api'
  // if (!fetchOptions.baseURL && config?.public?.endpoint) {
  //   fetchOptions.baseURL = config.public.endpoint
  // }

  return (clientSide ? $fetch : useFetch)(
    getApiUrl(url, { version }),
    fetchOptions
  )
}
