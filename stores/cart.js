import {
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  storeToRefs,
  toRaw,
  useCart,
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
  const { t } = useI18n()

  const profile = useAccountStore()

  const { isLoggedIn } = storeToRefs(profile)

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

  const paymentMethod = useSessionStorage('paymentMethod', null, {
    serializer: StorageSerializers.object,
  })

  // Getters
  const {
    hasCoupon,
    discount,
    count,
    isEmpty,
    hasFreeShipping,
    hasMinimumOrderCost,
    costBeforeFreeShipping,
    shippingMethod,
    shippingCost,
    subTotal,
    granTotal,
    total,
  } = useCart(cart, coupon, paymentMethod)

  const checkout = computed(() => {
    return cart.value.map((item) => ({
      id: item.id,
      variationId: item.variationId,
      quantity: item.quantity,
      title: item.title,
    }))
  })

  // Actions
  function pickProduct(id) {
    return cart.value.find((product) => product.variationId === id)
  }

  async function load(login = false) {
    const localCart = toRaw(cart.value)
    if (cart.value && isLoggedIn.value && login) {
      await remoteAddToCartBatch(toRaw(cart.value))
    }

    if (!isLoggedIn.value) {
      const body = cart.value.map((product) => {
        return {
          id: product.id,
          variationId: product.variationId,
          quantity: product.quantity,
          title: product.title,
        }
      })

      if (body.length <= 0) {
        return cart
      }
      const response = await useApi(
        `shop/cart/sync`,
        {
          method: 'POST',
          body,
        },
        {
          cache: false,
          //lazy: true,
        }
      ).catch((error) => {
        console.error(
          'Errore durante il caricamento di "shop/cart/sync"',
          error
        )
      })
      if (!response.value.success) {
        throw new Error(response)
      }

      cart.value = response.value.data.products
      console.log(cart.value)
      if ('invalid' in response.value.data && !isLoggedIn) {
        notify({
          message: response.value.data.invalid.message.join(' - '),
          status: 'warning',
        })
      }
      if (!isLoggedIn.value) {
        return cart
      }
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
    if (response.value.success && login) {
      localCart.forEach((element) => {
        notify({
          message: t('cart.addedToCart', element.quantity, {
            named: {
              name: element.title,
              count: element.quantity,
            },
          }),
          status: 'success',
        })
      })
    }
    return cart
  }

  async function save(basket = []) {
    if (!isLoggedIn.value) {
      return true
    }

    const body = []

    for (const product of basket.value) {
      body.push({
        key: product.key,
        id: product.id,
        quantity: product.quantity,
        variationId: product.variationId,
      })
    }

    const response = await useApi(
      'shop/cart/update/batch',
      {
        method: 'PUT',
        body,
      },
      {
        cache: false,
      }
    ).catch((error) => {
      console.error(
        'Errore durante il caricamento di "shop/cart/update/batch"',
        error
      )
    })

    if (!response.value.success) {
      throw new Error(response)
    }

    for (const product of response.value.data) {
      updateCartQuantity(product, product.quantity, null)
    }

    return response
  }

  function clearCart(notify = true) {
    cart.value = []
    if (!notify) {
      notify({
        message: t('cart.cleared'),
        status: 'warning',
      })
    }

    return true
  }

  function addToCart(product, quantity = 1) {
    const {
      id,
      variationId,
      key,
      price,
      categories,
      discountPrice,
      title,
      link,
      sku,
      unit,
      selling,
      costDescription,
      image,
    } = product

    quantity = parseInt(quantity)

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
      categories,
      discountPrice,
      quantity,
      title,
      link,
      sku,
      unit,
      selling,
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

    quantity = parseInt(quantity)

    if (existingProduct) {
      const index = cart.value.indexOf(existingProduct)
      const diff = quantity - cart.value[index].quantity
      cart.value[index].quantity = quantity

      // TODO: sistemare questo schifo
      if (server !== null) {
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
      }

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

  function validateCoupon() {
    if (!hasCoupon.value) {
      return
    }

    let error = false

    if (
      coupon.value.minimum_amount &&
      subTotal.value < coupon.value.minimum_amount
    ) {
      error = t('coupon.notValid')
    }

    if (
      coupon.value.maximum_amount &&
      subTotal.value > coupon.value.maximum_amount
    ) {
      error = t('coupon.notValid')
    }

    if (error) {
      removeCoupon()

      notify({
        message: error,
        status: 'danger',
      })
    }
  }

  function removeCoupon() {
    coupon.value = {}
  }

  async function applyCoupon(newCoupon) {
    const body = {
      coupon: newCoupon,
      cart,
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
        message: t('coupon.applied'),
        status: 'success',
      })

      coupon.value = response.value.data

      return true
    }

    notify({
      message: t('coupon.notValid'),
      status: 'danger',
    })

    // coupon.value = {}

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

  async function remoteAddToCartBatch(products = []) {
    const response = await useApi(
      'shop/cart/add/batch',
      {
        method: 'POST',
        body: products,
      },
      {
        cache: false,
      }
    ).catch((error) => {
      console.error(
        'Errore durante il caricamento di "shop/cart/add/batch"',
        error
      )
    })
    return response.value
  }

  return {
    coupon: skipHydrate(coupon),
    cart: skipHydrate(cart),
    hasCoupon,
    discount,
    shippingMethod,
    shippingCost,
    paymentMethod: skipHydrate(paymentMethod),
    isEmpty,
    count,
    total,
    granTotal,
    subTotal,
    checkout,
    hasFreeShipping,
    hasMinimumOrderCost,
    costBeforeFreeShipping,
    load,
    save,
    pickProduct,
    deleteFromCart: remoteDeleteFromCart,
    clearCart: remoteClearCart,
    addToCart: remoteAddToCart,
    validateCoupon,
    removeCoupon,
    applyCoupon,
    remoteAddToCartBatch,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
