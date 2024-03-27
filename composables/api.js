import { ref, useFetchApi } from '#imports'
import { createResponse } from '@/server/utils/responses'
import { useLogout } from '@/composables/logout'

export async function useApi(url, options = {}, innerOptions = {}) {
  innerOptions = {
    version: 1,
    dataOnly: false,
    ...innerOptions,
  }

  options = options || {}

  let cached = ref(null)

  const { data, error } = await useFetchApi(url, options, innerOptions)

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

      if (
        ['jwt_auth_user_not_found', 'jwt_auth_invalid_token'].includes(
          responseData.code
        )
      ) {
        const { logout } = useLogout()
        await logout(true)

        return
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

  return cached
}
