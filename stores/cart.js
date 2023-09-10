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
import { useI18n } from 'vue-i18n'
import { notify } from '@/utils/notify'

export const useCartStore = defineStore('cart', () => {
  const profile = useAccountStore()

  const { isLoggedIn } = storeToRefs(profile)
  const { t } = useI18n()

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

    notify({
      message: t('cart.cleared'),
      status: 'warning',
    })

    return true
  }

  function addToCart(product, quantity = 1) {
    const { id, price, title, link, sku, unit, costDescription, image } =
      product

    const existingProduct = pickProduct(id)

    if (existingProduct) {
      const index = cart.value.indexOf(existingProduct)
      cart.value[index].quantity += quantity

      notify({
        // message: t('cart.quantityUpdated'),
        message: t('cart.addedToCart', quantity, {
          named: {
            name: title,
            count: quantity,
          },
        }),
        status: 'success',
      })

      return true
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

    notify({
      message: t('cart.addedToCart', 1, {
        named: {
          name: title,
          count: quantity,
        },
      }),
      status: 'success',
    })

    return true
  }

  function updateCartQuantity(product, quantity, server = false) {
    const { id } = product
    const existingProduct = pickProduct(id)

    if (existingProduct) {
      const index = cart.value.indexOf(existingProduct)
      const diff = cart.value[index].quantity - quantity
      cart.value[index].quantity = quantity

      notify({
        message: !server
          ? t('cart.quantityUpdated')
          : t('cart.addedToCart', diff, {
              named: {
                name: product.title,
                count: diff,
              },
            }),
        status: 'success',
      })

      return true
    }

    return addToCart(product, quantity)
  }

  // function removeFromCart(product, quantity) {
  //   const existingProduct = pickProduct(product.id)

  //   if (!existingProduct) {
  //     notify({
  //       message: t('cart.missingProduct'),
  //       status: 'warning',
  //     })
  //     return false
  //   }

  //   if (existingProduct.quantity - quantity <= 0) {
  //     return deleteFromCart(product)
  //   }

  //   const index = cart.value.indexOf(existingProduct)
  //   cart.value[index].quantity -= quantity

  //   return true
  // }

  function deleteFromCart(product) {
    const existingProduct = pickProduct(product.id)

    if (!existingProduct) {
      notify({
        message: t('cart.missingProduct'),
        status: 'warning',
      })

      return false
    }

    cart.value = cart.value.filter((item) => item !== existingProduct)

    notify({
      message: t('cart.removedFromCart', 1, {
        named: {
          name: product.title,
        },
      }),
      status: 'warning',
    })

    return true
  }

  async function remoteClearCart() {
    if (!isLoggedIn.value) {
      return clearCart()
    }

    try {
      const response = await useApi('shop/cart/clear', null, {
        cache: false,
      })

      if (response.value.success) {
        return clearCart()
      } else {
        throw new Error(response)
      }
    } catch (error) {
      console.error(error)

      notify({
        message: JSON.stringify(error.value),
        status: 'danger',
      })
    }

    return false
  }

  async function remoteAddToCart(product, quantity = 1) {
    if (!isLoggedIn.value) {
      return addToCart(product, quantity)
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
        return updateCartQuantity(product, response.value.data.quantity, true)
      } else {
        throw new Error(response)
      }
    } catch (error) {
      console.error(error)

      notify({
        message: JSON.stringify(error.value),
        status: 'danger',
      })
    }

    return false
  }

  async function remoteDeleteFromCart(product) {
    if (!isLoggedIn.value) {
      return deleteFromCart(product)
    }

    try {
      const response = await useApi(
        'shop/cart/remove',
        {
          method: 'DELETE',
          body: {
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
        return deleteFromCart(product)
      } else {
        throw new Error(response)
      }
    } catch (error) {
      console.error(error)

      notify({
        message: JSON.stringify(error.value),
        status: 'danger',
      })
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
    deleteFromCart: remoteDeleteFromCart,
    clearCart: remoteClearCart,
    addToCart: remoteAddToCart,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
