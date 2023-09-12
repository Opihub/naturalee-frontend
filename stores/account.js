import { defineStore, acceptHMRUpdate, skipHydrate, computed } from '#imports'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'
import { useApi } from '@/composables/api'
import { useCartStore } from '@/stores/cart'

export const useAccountStore = defineStore('account', () => {
  const account = useLocalStorage('account', null, {
    serializer: StorageSerializers.object,
  })
  const token = useLocalStorage('token', null)

  const isLoggedIn = computed(() => {
    return !!token.value
  })

  // async function load() {
  //   if (isLoggedIn.value) {
  //     return
  //   }

  //   if (account.value) {
  //     return
  //   }

  //   const response = await useApi('profile', null, {
  //     cache: false,
  //   }).catch((error) => {
  //     console.error('Errore durante il caricamento di "profile"', error)
  //   })

  //   if (response.value.success) {
  //     login(response.value.data)
  //   } else {
  //     console.warn(response)
  //   }
  // }

  async function signIn(formData) {
    const response = await useApi(
      `auth/sign-in`,
      {
        method: 'POST',
        body: formData,
      },
      {
        cache: false,
      }
    )

    if (response.value.success) {
      await login(response.value.data)
    } else {
      console.warn(response)
    }

    return response
  }

  async function signUp(formData) {
    const response = await useApi(
      `auth/login`,
      {
        method: 'POST',
        body: formData,
      },
      {
        cache: false,
      }
    )

    if (response.value.success) {
      await login(response.value.data)
    } else {
      console.warn(response)
    }

    return response
  }

  async function login(profile) {
    // TODO: verificare coi dati reali
    const user = { ...profile }

    if (user.token) {
      token.value = user.token
      delete user.token
    }

    account.value = user
  }

  async function logout() {
    const cart = useCartStore()

    await cart.clearCart()

    account.value = null
    token.value = null
  }

  function updateUser(profile) {
    delete profile.oldPassword
    delete profile.newPassword
    delete profile.newPasswordCheck
    const user = { ...profile }
    account.value = user
  }

  return {
    token: skipHydrate(token),
    account: skipHydrate(account),
    isLoggedIn,
    // load,
    signIn,
    signUp,
    login,
    logout,
    updateUser,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
