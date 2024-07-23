import {
  defineNuxtRouteMiddleware,
  navigateTo,
  storeToRefs,
  useRouter,
} from '#imports'
import { useAccountStore } from '@/stores/account'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()

  const store = useAccountStore()
  const { isLoggedIn } = storeToRefs(store)

  if (!isLoggedIn.value) {
    const navigate = { name: 'login' }

    const myAccountRoute = router.resolve({
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

    return navigateTo(navigate)
  }

  return true
})
