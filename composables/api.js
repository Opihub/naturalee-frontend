import { useFetchApi, createResponse, useLogout } from '#imports'

export async function useApi(url, options = {}) {
  const nuxtApp = useNuxtApp()
  
  options = options || {}

  const dataOnly = options?.dataOnly || false

  const defaultExpirationHours = options?.expiration_hours||1;
  options.headers = options.headers || {}
  options.headers.expiration_hours = defaultExpirationHours;

  const doCache = options?.cache === "no-cache" ? options?.cache : "cache"
  options.headers["x-cache"] = doCache

  return useFetchApi(url, {
    ...options,
    transform(input) {
      return {
        ...input,
        fetchedAt: new Date()
      }
    },
    getCachedData: (key) => {

      if(options?.method?.toUpperCase() !== "GET" || doCache === "no-cache")
          return

      //const data = nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key]
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      if (!data) {
        return
      }

      const expirationDate = new Date(data.fetchedAt)
      expirationDate.setTime(expirationDate.getTime() + defaultExpirationHours * 60 * 60 * 1000)
      const isExpired = expirationDate.getTime() < Date.now()
      if(isExpired) {
        return
      }

      return data
    },
    async onRequestError({ request, options, error }) {
      console.log('[fetch request error]', request, error)
    },
    async onResponse({ response }) {
      const data = createResponse(response._data)
      /* console.log('onResponse')
      console.log(data) */

      response._data = dataOnly ? data.data : data
    },
    async onResponseError({ response }) {
      let data = response._data

      console.log('onResponseError')
      console.log(data)

      if (
        'data' in data &&
        'success' in data &&
        'code' in data &&
        'message' in data &&
        'statusCode' in data
      ) {
        data = createResponse(response._data)
        response._data = dataOnly ? data.data : data

        console.warn('errore previsto generato dal server:', data)

        if (
          ['jwt_auth_user_not_found', 'jwt_auth_invalid_token'].includes(
            data.code
          )
        ) {
          const { logout } = useLogout()

          return logout(true)
        }

        response.ok = true
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
