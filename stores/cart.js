import { defineStore, acceptHMRUpdate, skipHydrate, computed } from '#imports'
import {
  useLocalStorage,
  useSessionStorage,
  StorageSerializers,
} from '@vueuse/core'
// import { useApi } from '@/composables/api'

export const useCartStore = defineStore('cart', () => {
  const cart = useLocalStorage('cart', [], {
    serializer: StorageSerializers.object,
  })

  const shippingCost = useSessionStorage('shippingCost', 0)

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

  return {
    cart: skipHydrate(cart),
    shippingCost: skipHydrate(shippingCost),
    count,
    totals,
    subTotals,
    pickProduct,
    clearCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    deleteFromCart,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
