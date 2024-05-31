import {
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  storeToRefs,
  toRaw,
  useCart,
  trackEcommerceEvent,
} from '#imports'

import {
  useLocalStorage,
  useSessionStorage,
  StorageSerializers,
} from '@vueuse/core'

import { useApi } from '@/composables/api'
import { useAccountStore } from '@/stores/account'
import { notify } from '@/utils/notify'

export const useCartStore = defineStore('cart', () => {
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

  const paymentMethod = useLocalStorage('paymentMethod', null, {
    serializer: StorageSerializers.object,
  })

  const stripePaymentIntent = useSessionStorage('paymentIntent', null, {
    serializer: StorageSerializers.object,
  })

  // Getters
  const {
    hasCoupon,
    validProducts,
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

/*   const checkout = computed(() => {
    return cart.value.map((item) => ({
      id: item.id,
      variationId: item.variationId,
      quantity: item.quantity,
      title: item.title,
    }))
  }) */

  // Actions
  function pickProduct(id) {
    return cart.value.find((product) => product.variationId === id)
  }

  async function load(login = false) {
    const localCart = toRaw(cart.value)

    if (localCart && isLoggedIn.value && login) {
      await remoteAddToCartBatch(localCart)
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

      const { data: response } = await useApi(`shop/cart/sync`, {
        method: 'POST',
        body,
        cache: 'no-cache'
      }).catch((error) => {
        console.error(
          'Errore durante il caricamento di "shop/cart/sync"',
          error
        )
      })

      if (!response.value.success) {
        throw new Error(response)
      }

      cart.value = response.value.data.products
      if ('invalid' in response.value.data && !isLoggedIn) {
        notify({
          message: response.value.data.invalid.message.join(' - '),
          status: 'warning',
        })
      }

      return cart
    }

    const { data: response } = await useApi('shop/cart/products',{cache:'no-cache'}).catch(
      (error) => {
        console.error(
          'Errore durante il caricamento di "shop/cart/products"',
          error
        )
      }
    )

    if (!response.value.success) {
      throw new Error(response)
    }

    cart.value = response.value.data
    if (response.value.success && login && cart.value.length>0) {
      notify({
        message: [
          'cart.updated',
        ],
        status: 'success',
      })
    }

    return cart
  }

  async function save(basket = []) {
    if (!isLoggedIn.value) {
      for (const product of basket.value) {
        updateCartQuantity(product, product.quantity, false)
      }

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

    const { data: response } = await useApi('shop/cart/update/batch', {
      method: 'PUT',
      body,
      cache: 'no-cache'
    }).catch((error) => {
      console.error(
        'Errore durante il caricamento di "shop/cart/update/batch"',
        error
      )
    })

    if (!response.value.success) {
      throw new Error(response)
    }

    for (const product of response.value.data) {
      updateCartQuantity(product, product.quantity, false)
    }

    return response
  }

  function clearCart() {
    cart.value = []

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

    trackEcommerceEvent('add_to_cart', product)

    const existingProduct = pickProduct(variationId)

    if (existingProduct) {
      const index = cart.value.indexOf(existingProduct)
      cart.value[index].quantity += quantity

      notify({
        message: [
          'cart.addedToCart',
          quantity,
          {
            named: {
              name: title,
              count: quantity,
            },
          },
        ],
        status: 'success',
      })

      return quantity
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
      message: [
        'cart.addedToCart',
        1,
        {
          named: {
            name: title,
            count: quantity,
          },
        },
      ],
      status: 'success',
    })

    return quantity
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
      if (server) {
        notify({
          message: !server
            ? ['cart.quantityUpdated']
            : [
                'cart.addedToCart',
                diff,
                {
                  named: {
                    name: product.title,
                    count: diff,
                  },
                },
              ],
          status: 'success',
        })
      }

      return diff
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
    const { variationId } = product
    const existingProduct = pickProduct(variationId)

    if (!existingProduct) {
      notify({
        message: ['cart.missingProduct'],
        status: 'warning',
      })

      return false
    }

    cart.value = cart.value.filter((item) => item !== existingProduct)

    trackEcommerceEvent('remove_from_cart', product)

    notify({
      message: [
        'cart.removedFromCart',
        1,
        {
          named: {
            name: product.title,
          },
        },
      ],
      status: 'warning',
    })

    return true
  }

  function validateCoupon() {
    if (!hasCoupon.value) {
      return false
    }

    let error = false

    if (coupon.value.expiration) {
      const now = new Date().toLocaleString('it-IT', {
        timeZone: coupon.value.expiration.timezone,
      })

      const expiration = new Date(coupon.value.expiration.date).toLocaleString(
        'it-IT',
        {
          timeZone: 'Europe/Rome',
        }
      )

      if (now > expiration) {
        error = ['coupon.expired']
      }
    } else if (
      coupon.value.minimum_amount &&
      subTotal.value < coupon.value.minimum_amount
    ) {
      error = ['coupon.missingMinimumAmount']
      // deepcode ignore DuplicateIfBody: Documentazione
    } else if (
      coupon.value.maximum_amount &&
      subTotal.value > coupon.value.maximum_amount
    ) {
      error = ['coupon.reachMaximumAmount']
    } else if (validProducts.value.length === 0) {
      // Se non c'è alcun prodotto valido per il coupon,
      // a prescindere dalla tipologia di sconto, invalido il coupon
      error = ['coupon.invalidCoupon']
    } else if (
      ['fixed_cart', 'percent'].includes(coupon.value.discount_type) &&
      validProducts.value.length !== cart.value.length
      // deepcode ignore DuplicateIfBody: Documentazione
    ) {
      // Se il coupon si applica al carrello, ed il numero di prodotti validi
      // non combacia con quello attuale, allora invalido il coupon
      error = ['coupon.invalidCoupon']
    }

    if (error) {
      removeCoupon()

      notify({
        message: error,
        status: 'danger',
      })

      return false
    }

    return coupon.value
  }

  function removeCoupon() {
    coupon.value = {}
  }

  async function applyCoupon(newCoupon) {
    const body = {
      coupon: newCoupon,
      cart: cart.value,
    }

    const { data: response } = await useApi(`shop/coupon/validate`, {
      method: 'POST',
      body,
      cache: 'no-cache'
    })

    if (response.value.success) {
      notify({
        message: response.value.message,
        status: 'success',
      })

      coupon.value = response.value.data

      return true
    }

    notify({
      message: response.value.message,
      status: 'danger',
    })

    // coupon.value = {}

    return false
  }

  async function remoteClearCart() {
    if (!isLoggedIn.value) {
      return clearCart()
    }

    const { data: response } = await useApi('shop/cart/clear', {
      method: 'DELETE',
      cache: 'no-cache',
      body: { test: 0 },
    })

    if (!response.value.success) {
      throw new Error(response.value.message)
    }

    return clearCart()
  }

  async function remoteAddToCart(product, quantity = 1) {
    if (quantity < 1) {
      notify({
        message: 'Quantità non valida',
        status: 'danger',
      })

      return false
    }

    quantity = parseInt(quantity)

    if (!isLoggedIn.value) {
      return addToCart(product, quantity)
    }

    try {
      const { data: response } = await useApi('shop/cart/add', {
        method: 'POST',
        body: {
          quantity,
          id: product.id,
          variationId: product.variationId,
        },
        cache: 'no-cache'
      })

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
      const { data: response } = await useApi('shop/cart/remove', {
        method: 'DELETE',
        body: {
          key: product.key,
          id: product.id,
          variationId: product.variationId,
        },
        cache: 'no-cache'
      })

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
    const { data: response } = await useApi('shop/cart/add/batch', {
      method: 'POST',
      body: products,
      cache: 'no-cache'
    }).catch((error) => {
      console.error(
        'Errore durante il caricamento di "shop/cart/add/batch"',
        error
      )
    })

    return response.value
  }

  function setPaymentMethod(method) {
    paymentMethod.value = method

    return paymentMethod.value
  }

  async function requestPaymentIntent(email, data = {}) {
    // Create a PaymentIntent with the order amount and currency
    const { data: response } = await useApi('shop/checkout/payment-intent', {
      method: 'POST',
      body: {
        data: { email, ...data },
        cart: cart.value,
        intent: stripePaymentIntent.value?.intentId,
      },
      cache: 'no-cache'
    })

    if (!response.value.success) {
      throw new Error(response.value.message, {
        cause: response.value.errors,
      })
    }

    stripePaymentIntent.value = response.value.data

    return stripePaymentIntent
  }

  return {
    coupon: skipHydrate(coupon),
    cart: skipHydrate(cart),
    hasCoupon,
    discount,
    shippingMethod,
    shippingCost,
    stripePaymentIntent: skipHydrate(stripePaymentIntent),
    paymentMethod: skipHydrate(paymentMethod),
    isEmpty,
    count,
    total,
    granTotal,
    subTotal,
    hasFreeShipping,
    hasMinimumOrderCost,
    costBeforeFreeShipping,
    setPaymentMethod,
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
    requestPaymentIntent,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
