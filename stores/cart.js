import {
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  storeToRefs,
} from '#imports'
import {
  useLocalStorage,
  useSessionStorage,
  StorageSerializers,
} from '@vueuse/core'
import { useApi } from '@/composables/api'
import { useAccountStore } from '@/stores/account'

export const useCartStore = defineStore('cart', () => {
  const profile = useAccountStore()
  const { isLoggedIn } = storeToRefs(profile)

  const cart = useLocalStorage('cart', [], {
    serializer: StorageSerializers.object,
  })

  const shippingCost = useSessionStorage('shippingCost', 0)

  // const cart = await useApi('shop/cart/products').catch((error) => {
  //   console.error('Errore durante il caricamento di "shop/cart/products"', error)
  // })

  const count = computed(() => {
    return cart.value.length
  })

  const subTotals = computed(() => {
    return cart.value.reduce((accumulator, product) => {
      accumulator += product.quantity * product.price

      return accumulator
    }, 0)
  })

  const totals = computed(() => {
    return subTotals.value + shippingCost.value
  })

  function pickProduct(id) {
    return cart.value.find((product) => product.id === id)
  }

  function clearCart() {
    cart.value = []
  }

  function addToCart(product, quantity = 1) {
    const { id, price, title, link, sku, unit, costDescription, image } =
      product

    const existingProduct = pickProduct(id)

    if (existingProduct) {
      const index = cart.value.indexOf(existingProduct)
      cart.value[index].quantity += quantity

      return
    }

    cart.value.push({
      id,
      price,
      quantity,
      title,
      link,
      sku,
      unit,
      costDescription,
      image,
    })
  }

  function updateCartQuantity(product, quantity) {
    const { id } = product
    const existingProduct = pickProduct(id)

    if (existingProduct) {
      const index = cart.value.indexOf(existingProduct)
      cart.value[index].quantity = quantity

      return
    }

    addToCart(product, quantity)
  }

  function removeFromCart(product, quantity) {
    const existingProduct = pickProduct(product.id)

    if (!existingProduct) {
      console.warn('Prodotto assente nel carrello')
      return
    }

    if (existingProduct.quantity - quantity <= 0) {
      deleteFromCart(product)
      return
    }

    const index = cart.value.indexOf(existingProduct)
    cart.value[index].quantity -= quantity
  }

  function deleteFromCart(product) {
    const existingProduct = pickProduct(product.id)

    if (!existingProduct) {
      console.warn('Prodotto assente nel carrello')
      return
    }

    cart.value = cart.value.filter((item) => item !== existingProduct)
  }

  async function remoteClearCart() {
    if (!isLoggedIn.value) {
      clearCart()

      return
    }

    try {
      const response = await useApi('shop/cart/clear', null, {
        cache: false,
      })

      if (response.value.success) {
        clearCart()
      } else {
        console.debug(response.value)
        throw new Error(response)
      }
    } catch (error) {
      console.error(error.value)
    }
  }

  async function remoteAddToCart(product, quantity = 1) {
    if (!isLoggedIn.value) {
      addToCart(product, quantity)

      return true
    }

    try {
      const response = await useApi(
        'shop/cart/add',
        {
          method: 'POST',
          body: {
            quantity,
            id: product.id,
            variantId: product.variantId,
          },
        },
        {
          cache: false,
        }
      )

      if (response.value.success) {
        // se si chiama il server, la quantità restituita sovrascriverà quella attuale,
        // a meno che il prodotto richiesto non sia presente nel carrello
        updateCartQuantity(product, response.value.data.quantity)

        return true
      } else {
        throw new Error(response)
      }
    } catch (error) {
      console.error(error)
    }

    return false
  }

  return {
    cart: skipHydrate(cart),
    shippingCost: skipHydrate(shippingCost),
    count,
    totals,
    subTotals,
    pickProduct,
    clearCart: remoteClearCart,
    addToCart: remoteAddToCart,
    updateCartQuantity,
    removeFromCart,
    deleteFromCart,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
