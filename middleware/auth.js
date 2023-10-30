import { defineNuxtRouteMiddleware, navigateTo, storeToRefs } from '#imports'
import { useAccountStore } from '@/stores/account'

export default defineNuxtRouteMiddleware(() => {
  if (process.server) {
    return true
  }

  const store = useAccountStore()
  const { isLoggedIn } = storeToRefs(store)

  if (!isLoggedIn.value) {
    return navigateTo({ name: 'login' })
  }

  return true
})
