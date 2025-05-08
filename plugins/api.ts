export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAccountStore()
  const { token, isLoggedIn } = storeToRefs(auth)

  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.endpoint,
    onRequest({ options }) {
      if (isLoggedIn && isLoggedIn.value && token.value) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    async onResponseError({ response }) {
      const { logout } = useLogout()

      console.log('API error', response)
      if (
        response.status === 401 ||
        (response._data?.code &&
          [
            'jwt_auth_user_not_found',
            'jwt_auth_invalid_token',
            'jwt_auth_obsolete_token',
            'jwt_auth_invalid_refresh_token',
            'jwt_auth_obsolete_refresh_token',
            'jwt_auth_expired_refresh_token',
            'jwt_auth_bad_iss',
            'jwt_auth_no_auth_header',
          ].includes(response._data.code))
      ) {
        await nuxtApp.runWithContext(() => logout(true))
      }
    },
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  }
})
