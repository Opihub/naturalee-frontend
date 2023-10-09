import { defineStore, acceptHMRUpdate, skipHydrate, computed } from '#imports'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'
import { useApi } from '@/composables/api'
import { useCartStore } from '@/stores/cart'
import { getPasswordPattern } from '@/utils/pattern'

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
    // TODO: prova a cambiare con try catch
    const user = { ...profile }

    if (user.token) {
      token.value = user.token
      delete user.token
    }

    account.value = user
  }

  async function logout() {
    const cart = useCartStore()

    account.value = null
    token.value = null

    await cart.clearCart()
  }

  async function updateUser(profile) {
    const user = { ...profile }

    if (
      user.oldPassword === '' &&
      (user.newPassword !== '' || user.confirmPassword !== '')
    ) {
      return {
        value: {
          success: false,
          message: 'La passowrd corrente è errata',
        },
      }
    }

    if (
      user.oldPassword === '' &&
      !user.oldPassword &&
      user.newPassword === '' &&
      !user.newPassword &&
      user.confirmPassword === '' &&
      !user.confirmPassword
    ) {
      delete user.oldPassword
      delete user.newPassword
      delete user.confirmPassword
    } else {
      user.oldPassword = user.oldPassword.trim()
      user.newPassword = user.newPassword.trim()
      user.confirmPassword = user.confirmPassword.trim()

      if (
        !user.oldPassword.match(getPasswordPattern()) &&
        !user.newPassword.match(getPasswordPattern()) &&
        !user.confirmPassword.match(getPasswordPattern())
      ) {
        return {
          value: {
            success: false,
            message: 'La password non è nel formato richiesto',
          },
        }
      }
      if (user.newPassword !== user.confirmPassword) {
        return {
          value: {
            success: false,
            message: 'Le passwword non corrispondono',
          },
        }
      }
    }

    const response = await useApi(
      `profile/update`,
      {
        method: 'POST',
        body: user,
      },
      {
        cache: false,
      }
    )

    delete user.oldPassword
    delete user.newPassword
    delete user.confirmPassword

    account.value = user
    return response
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
