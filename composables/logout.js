import { navigateTo } from '#imports'
import { useAccountStore } from '@/stores/account'

export function useLogout() {
  const store = useAccountStore()
  const { logout: removeToken, forceLogout } = store

  const logout = async (force = false) => {
    if (force) {
      await forceLogout()
    } else {
      await removeToken()
    }

    return navigateTo({
      path: '/',
      query: {
        logout: true,
      },
    })
  }

  return { logout }
}
