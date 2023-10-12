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
import { useTotal } from '@/composables/total'
import { useAccountStore } from '@/stores/account'
import { useI18n } from 'vue-i18n'
import { notify } from '@/utils/notify'

export const useCartStore = defineStore('cart', () => {
  const profile = useAccountStore()

  const { isLoggedIn } = storeToRefs(profile)
  const { t } = useI18n()

  // State
  const cart = useLocalStorage('cart', [], {
    serializer: StorageSerializers.object,
  })
  const coupon = useLocalStorage(
    'coupon',
    {},
    {
      serializer: StorageSerializers.object,
    }
  )

  const shippingMethod = useSessionStorage('shippingMethod', null, {
    serializer: StorageSerializers.object,
  })

  const paymentMethod = useSessionStorage('paymentMethod', null, {
    serializer: StorageSerializers.object,
  })

  // Getters
  const count = computed(() => {
    return cart.value?.length || 0
  })

  const isEmpty = computed(() => {
    return count.value <= 0
  })

  const checkout = computed(() => {
    return cart.value.map((item) => ({
      id: item.id,
      variationId: item.variationId,
      quantity: item.quantity,
      title: item.title,
    }))
  })

  const { subTotal, granTotal: total } = useTotal(cart, {
    shipping: shippingMethod,
    payment: paymentMethod,
  })

  // Actions
  function pickProduct(id) {
    return cart.value.find((product) => product.variationId === id)
  }

  async function load() {
    if (!isLoggedIn.value) {
      return cart
    }

    const response = await useApi('shop/cart/products', null, {
      cache: false,
    }).catch((error) => {
      console.error(
        'Errore durante il caricamento di "shop/cart/products"',
        error
      )
    })

    if (!response.value.success) {
      throw new Error(response)
    }

    cart.value = response.value.data

    return cart
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
    const {
      id,
      variationId,
      key,
      price,
      title,
      link,
      sku,
      unit,
      costDescription,
      image,
    } = product

    const existingProduct = pickProduct(variationId)

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
      variationId,
      key,
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
    const { variationId: id } = product
    const existingProduct = pickProduct(id)

    if (existingProduct) {
      const index = cart.value.indexOf(existingProduct)
      const diff = quantity - cart.value[index].quantity
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
    const { variationId: id } = product
    const existingProduct = pickProduct(id)

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

  async function applyCoupon(newCoupon) {
    const body = {
      coupon: newCoupon,
    }

    const response = await useApi(
      `shop/coupon/validate`,
      {
        method: 'POST',
        body,
      },
      {
        cache: false,
      }
    )

    if (response.value.success) {
      notify({
        message: 'Coupon applicato!',
        status: 'success',
      })

      coupon.value = response.value.data

      return true
    }

    notify({
      message: 'Coupon non valido!',
      status: 'danger',
    })

    coupon.value = {}

    return false
  }

  async function remoteClearCart() {
    if (!isLoggedIn.value) {
      return clearCart()
    }

    try {
      const response = await useApi(
        'shop/cart/clear',
        {
          method: 'DELETE',
        },
        {
          cache: false,
        }
      )

      if (response.value.success) {
        return clearCart()
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
            variationId: product.variationId,
          },
        },
        {
          cache: false,
        }
      )

      if (response.value.success) {
        // se si chiama il server, la quantità restituita sovrascriverà quella attuale,
        // a meno che il prodotto richiesto non sia presente nel carrello
        return updateCartQuantity(
          {
            ...product,
            key: response.value.data.key,
          },
          response.value.data.quantity,
          true
        )
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
            key: product.key,
            id: product.id,
            variationId: product.variationId,
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
    coupon: skipHydrate(coupon),
    cart: skipHydrate(cart),
    shippingMethod: skipHydrate(shippingMethod),
    paymentMethod: skipHydrate(paymentMethod),
    isEmpty,
    count,
    total,
    subTotal,
    checkout,
    load,
    pickProduct,
    deleteFromCart: remoteDeleteFromCart,
    clearCart: remoteClearCart,
    addToCart: remoteAddToCart,
    applyCoupon,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
