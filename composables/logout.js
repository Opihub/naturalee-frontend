import { navigateTo, useAccountStore, useLocaleRoute } from '#imports'

export function useLogout() {
  const store = useAccountStore()
  const localeRoute = useLocaleRoute()
  const { logout: removeToken, forceLogout } = store

  const logout = async (force = false) => {
    if (force) {
      await forceLogout()
    } else {
      await removeToken()
    }

    return navigateTo(
      localeRoute({
        name: 'login',
        query: {
          logout: true,
        },
      }),
    )
  }

  return { logout }
}
