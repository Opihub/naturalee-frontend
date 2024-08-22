import { useFetchApi, createResponse, useLogout, useNuxtApp } from '#imports'
import * as cacheControlParser from 'cache-control-parser'

export async function useApi(url, options = {}) {
  const nuxtApp = useNuxtApp()

  options = options || {}

  const dataOnly = options?.dataOnly || false

  const defaultExpirationHours = options?.expiration_hours || 1
  const defaultExpirationSeconds = defaultExpirationHours * 60 * 60
  options.headers = options.headers || {}
  // options.headers.expiration_hours = defaultExpirationHours

  const doCache = options?.cache === 'no-cache' ? 'no-cache' : 'cache'
  // options.headers['x-cache'] = doCache

  console.info(cacheControlParser)
  const cacheControl = cacheControlParser.stringify({
    'max-age': defaultExpirationSeconds,
    'no-cache': doCache === 'no-cache',
  })
  options.headers['Cache-Control'] = cacheControl

  console.info(options.headers)

  const method = options?.method?.toUpperCase() || 'GET'
  options.method = method

  if (Array.isArray(url)) {
    url = url.filter((part) => part).join('/')
  }

  return useFetchApi(url, {
    ...options,
    transform(original) {
      return dataOnly ? original.data : original
    },
    getCachedData: (key) => {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      if (!data) {
        return
      }

      const expirationDate = new Date(data.fetchedAt)
      expirationDate.setTime(
        expirationDate.getTime() + defaultExpirationSeconds * 1000
      )
      const isExpired = expirationDate.getTime() < Date.now()
      if (isExpired) {
        return
      }

      // Se NUXT non è in fase di idratazione lato client,
      // allora verifico se la chiamata è cacheabile
      if (
        !nuxtApp.isHydrating &&
        (method !== 'GET' || doCache === 'no-cache')
      ) {
        return
      }

      return data
    },
    async onRequestError({ request, error }) {
      console.warn('[fetch request error]', request, error)
    },
    async onResponse({ response }) {
      const data = createResponse(response._data)

      data.fetchedAt = new Date()

      response._data = data
    },
    async onResponseError({ response }) {
      let data = response._data

      if (
        'data' in data &&
        'success' in data &&
        'code' in data &&
        'message' in data &&
        'statusCode' in data
      ) {
        data = createResponse(response._data)
        response._data = data

        console.warn('errore previsto generato dal server:', data)
        if (
          [
            'jwt_auth_user_not_found',
            'jwt_auth_invalid_token',
            'jwt_auth_obsolete_token',
            'jwt_auth_invalid_refresh_token',
            'jwt_auth_obsolete_refresh_token',
            'jwt_auth_expired_refresh_token',
            'jwt_auth_bad_iss',
          ].includes(data.code)
        ) {
          const { logout } = useLogout()

          return logout(true)
        }
      } else {
        /**
         * Client error, must not happen
         * Reason: calling wrong endpoint
         */
        throw response
      }
    },
  })
}
