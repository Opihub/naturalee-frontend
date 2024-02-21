import { defineStore, acceptHMRUpdate, skipHydrate, computed } from '#imports'
import {
  useLocalStorage,
  useSessionStorage,
  StorageSerializers,
} from '@vueuse/core'
import { useApi } from '@/composables/api'
import { useCartStore } from '@/stores/cart'
import { getPasswordPattern } from '@/utils/pattern'

export const useAccountStore = defineStore('account', () => {
  const rememberMe = useLocalStorage(
    'rememberMe',
    { account: null, token: null },
    {
      serializer: StorageSerializers.object,
    }
  )
  const account = useSessionStorage('account', rememberMe.value.account, {
    serializer: StorageSerializers.object,
  })
  const token = useSessionStorage('token', rememberMe.value.token)

  const isLoggedIn = computed(() => {
    return !!token.value
  })

  const username = computed(() => {
    if (!isLoggedIn.value) {
      return null
    }

    if (account.value?.username) {
      return account.value.username
    }

    if (account.value?.firstName) {
      if (account.value?.lastName) {
        return [account.value.firstName, account.value.lastName].join(' ')
      }

      return account.value.firstName
    } else if (account.value?.lastName) {
      return account.value.lastName
    }

    return account.value.email
  })

  async function load() {
    if (!isLoggedIn.value) {
      return account
    }

    const response = await useApi('profile', null, {
      cache: false,
    }).catch((error) => {
      console.error('Errore durante il caricamento di "profile"', error)
    })

    if (!response.value.success) {
      throw new Error(response)
    }

    account.value = response.value.data

    return account
  }

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
      await login(response.value.data, true)
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
      await login(response.value.data, formData.remember)
    } else {
      console.warn(response)
    }

    return response
  }

  async function login(profile, memorize = false) {
    // TODO: prova a cambiare con try catch
    const user = { ...profile }

    if (user.token) {
      token.value = user.token
      delete user.token
    }

    if (memorize) {
      rememberMe.value.token = token.value
      rememberMe.value.account = user
    }

    account.value = user
  }

  async function logout() {
    const cart = useCartStore()

    account.value = null
    token.value = null
    rememberMe.value = null

    await cart.clearCart(true)
  }

  async function forceLogout() {
    await logout()
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
            message: 'Le password non corrispondono',
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
    username,
    isLoggedIn,
    load,
    signIn,
    signUp,
    login,
    logout,
    forceLogout,
    updateUser,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
