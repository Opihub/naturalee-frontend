import { useFetchApi, createResponse, useLogout } from '#imports'

export async function useApi(url, options = {}) {
  options = options || {}

  const dataOnly = options?.dataOnly || false

  return useFetchApi(url, {
    ...options,
    async onRequestError({ request, options, error }) {
      console.log('[fetch request error]', request, error)
    },
    async onResponse({ response }) {
      const data = createResponse(response._data)
      console.log('onResponse')
      console.log(data)

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
