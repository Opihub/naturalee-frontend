import { computed } from '#imports'

export const useTotal = (products, config) => {
  const subTotal = computed(() => {
    console.debug(products?.value || products)
    console.debug(products?.value || products || [])
    return (products?.value || products || []).reduce((total, current) => {
      return total + current.price * current.quantity
    }, 0)
  })

  const granTotal = computed(() => {
    let total = subTotal.value
    const { shipping, payment } = config

    if ('value' in shipping) {
      if (shipping.value?.price) {
        total += shipping.value.price
      } else if (!isNaN(shipping.value)) {
        total += shipping.value
      }
    } else {
      total += shipping || 0
    }

    if ('value' in payment) {
      if (payment.value?.price) {
        total += payment.value.price
      } else if (!isNaN(payment.value)) {
        total += payment.value
      }
    } else {
      total += payment || 0
    }

    return total
  })

  return {
    subTotal,
    granTotal,
  }
}
