import {
  ref,
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  useCookie,
} from '#imports'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'
import { useApi } from '@/composables/api'
import { useCartStore } from '@/stores/cart'
import { getPasswordPattern } from '@/utils/pattern'

export const useAccountStore = defineStore('account', () => {
  // Tiene memorizzato il token alla chiusura del browser
  const rememberMe = useLocalStorage('rememberMe', false)

  const account = useLocalStorage(
    'account',
    {},
    {
      serializer: StorageSerializers.object,
    }
  )

  // Il token salvato come cookie è usufruibile anche lato server
  // Di default, viene caricato il token salvato nel localStorage
  const token = useCookie('jwt', {
    default: () => rememberMe.value,
  })

  const webpushr_sid = useCookie('webpushr_sid');

  window?.addEventListener("storage", function(event) {
    if (event.key.includes('webpushr')) {
        console.log('Il valore di _webpushr è cambiato:', event.newValue);
    }
  });

  try {
    webpushr('fetch_id',function (sid) {
      if(sid)
        webpushr_sid.value = sid;
    });
  } catch (error) {
    console.log("Webpushr non inizializzato");
  }

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

    const { data: response } = await useApi('profile', {
      cache: 'no-cache',
    })

    if (!response.value.success) {
      throw new Error(response)
    }

    account.value = response.value.data

    return account
  }

  async function signIn(formData) {
    const { data: response } = await useApi('auth/sign-in', {
      method: 'POST',
      body: formData,
      cache: 'no-cache',
    })

    if (response?.value?.success) {
      await login(response.value.data, true)
    } else {
      console.warn(response)
    }

    return response
  }

  async function signUp(formData) {
    const { data: response } = await useApi('auth/login', {
      method: 'POST',
      body: formData,
      cache: 'no-cache',
    })

    if (response?.value?.success) {
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

    setWebpushrUserId(user?.id)

    if (memorize) {
      rememberMe.value = token.value
    }

    account.value = user
  }

  function setWebpushrUserId(id) {
    if (!window?.webpushr) {
      console.warn('Webpushr non inizializzato')
      return
    }

    try {
      window.webpushr('attributes', { user_id: id })
    } catch (error) {
      console.error(error)
    }
  }

  async function logout() {
    const cart = useCartStore()

    account.value = null
    token.value = null
    rememberMe.value = false

    await cart.clearCart(true)
  }

  async function forceLogout() {
    await logout()
  }

  async function validateAccount() {
    if (rememberMe.value) {
      return
    }

    await logout()
  }

  async function updateUser(profile) {
    const user = { ...profile }
    const feedback = ref({
      success: false,
      message: "È avvenuto un errore durante l'aggiornamento dell'utente",
    })

    if (
      user.oldPassword === '' &&
      (user.newPassword !== '' || user.confirmPassword !== '')
    ) {
      feedback.message = 'La password corrente è errata'
      return feedback
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
        feedback.message = 'La password non è nel formato richiesto'
        return feedback
      }

      if (user.newPassword !== user.confirmPassword) {
        feedback.message = 'Le password non corrispondono'
        return feedback
      }
    }

    const { data: response } = await useApi('profile/update', {
      method: 'POST',
      body: user,
      cache: 'no-cache',
    })

    if (!response.value.success) {
      throw new Error(response)
    }

    account.value = response.value.data

    return response
  }

  return {
    rememberMe: skipHydrate(rememberMe),
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
    validateAccount,
    setWebpushrUserId,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
