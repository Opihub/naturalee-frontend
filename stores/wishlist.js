import {
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  storeToRefs,
  trackEcommerceEvent,
} from '#imports'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'
import { useApi } from '@/composables/api'
import { useAccountStore } from '@/stores/account'
import { notify } from '@/utils/notify'

export const useWishlistStore = defineStore('wishlist', () => {
  const profile = useAccountStore()

  const { isLoggedIn } = storeToRefs(profile)

  // State
  const wishlist = useLocalStorage('wishlist', [], {
    serializer: StorageSerializers.object,
  })

  // Getters
  const count = computed(() => {
    return wishlist.value?.length || 0
  })

  const isEmpty = computed(() => {
    return count.value <= 0
  })

  const pick = computed(() => (variationId) => {
    return wishlist.value.find((product) => product.variationId === variationId)
  })

  // Actions
  async function load() {
    const { data: response, refresh } = await useApi('shop/wishlist/products',{cache: 'no-cache'}).catch((error) => {
      console.error(
        'Errore durante il caricamento di "shop/wishlist/products"',
        error
      )
    })

    if (!response.value)
      await refresh()

    if (response.value.success) {
      wishlist.value = response.value.data
    }

    return wishlist
  }

  function addToWishlist(product) {
    const { variationId, title } = product

    const existingProduct = pick.value(variationId)

    if (existingProduct) {
      notify({
        message: [
          'wishlist.added',
          {
            name: title,
          },
        ],
        status: 'success',
      })

      return true
    }

    trackEcommerceEvent('add_to_wishlist', product)

    wishlist.value.push(product)

    notify({
      message: [
        'wishlist.added',
        {
          name: title,
        },
      ],
      status: 'success',
    })

    return true
  }

  function removeFromWishlist(product) {
    const existingProduct = pick.value(product.variationId)

    if (!existingProduct) {
      notify({
        message: ['wishlist.missingProduct'],
        status: 'warning',
      })

      return false
    }

    wishlist.value = wishlist.value.filter((item) => item !== existingProduct)

    notify({
      message: [
        'wishlist.removed',
        {
          name: product.title,
        },
      ],
      status: 'warning',
    })

    return true
  }

  function clearWishlist() {
    wishlist.value = []

    notify({
      message: ['wishlist.cleared'],
      status: 'warning',
    })

    return true
  }

  async function updateWishlist(product) {
    if (pick.value(product.variationId)) {
      return await remoteRemoveFromWishlist(product)
    }

    return await remoteAddToWishlist(product)
  }

  async function remoteAddToWishlist(product) {
    if (!isLoggedIn.value) {
      return addToWishlist(product)
    }

    try {
      const { data: response } = await useApi('shop/wishlist/add', {
        method: 'POST',
        body: {
          id: product.id,
          variationId: product.variationId,
        },
        cache: 'no-cache'
      })

      if (response.value.success) {
        return addToWishlist(product)
      } else {
        console.error(response.value)
        throw new Error(response.value.message)
      }
    } catch (error) {
      notify({
        message: error.message,
        status: 'danger',
      })
    }

    return false
  }

  async function remoteRemoveFromWishlist(product) {
    if (!isLoggedIn.value) {
      return removeFromWishlist(product)
    }

    try {
      const { data: response } = await useApi('shop/wishlist/remove', {
        method: 'DELETE',
        body: {
          id: product.id,
          variationId: product.variationId,
        },
        cache: 'no-cache'
      })

      if (response.value.success) {
        return removeFromWishlist(product)
      } else {
        console.error(response.value)
        throw new Error(response.value.message)
      }
    } catch (error) {
      notify({
        message: error.message,
        status: 'danger',
      })
    }

    return false
  }

  async function remoteClearWishlist() {
    if (!isLoggedIn.value) {
      return clearWishlist()
    }

    try {
      const { data: response } = await useApi('shop/wishlist/clear', {
        method: 'DELETE',
        cache: 'no-cache'
      })

      if (response.value.success) {
        // se si chiama il server, la quantità restituita sovrascriverà quella attuale,
        // a meno che il prodotto richiesto non sia presente nel carrello
        return clearWishlist()
      } else {
        console.error(response.value)
        throw new Error(response.value.message)
      }
    } catch (error) {
      notify({
        message: error.message,
        status: 'danger',
      })
    }

    return false
  }

  return {
    wishlist: skipHydrate(wishlist),
    count,
    isEmpty,
    has: pick,
    pick,
    load,
    add: remoteAddToWishlist,
    remove: remoteRemoveFromWishlist,
    clear: remoteClearWishlist,
    update: updateWishlist,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWishlistStore, import.meta.hot))
}
