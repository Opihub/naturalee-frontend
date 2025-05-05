import {
  defineNuxtRouteMiddleware,
  navigateTo,
  storeToRefs,
  useLocaleRoute,
} from '#imports'
import { useAccountStore } from '@/stores/account'

export default defineNuxtRouteMiddleware((to) => {
  const localeRoute = useLocaleRoute()

  const store = useAccountStore()
  const { isLoggedIn } = storeToRefs(store)

  if (!isLoggedIn.value) {
    const navigate = { name: 'login' }

    const myAccountRoute = localeRoute({
      name: 'my-account',
    })

    if (to.path.indexOf(myAccountRoute.path) === 0) {
      navigate.query = {
        redirectBecause: 'needAccount',
        redirectTo: 'dashboard',
      }
    } else {
      switch (to.name) {
        case 'checkout':
          navigate.query = {
            redirectBecause: 'needAccount',
            redirectTo: 'checkout',
          }
          break
      }
    }

    return navigateTo(localeRoute(navigate))
  }

  return true
})
