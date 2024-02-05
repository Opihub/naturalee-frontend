import { computed } from '#imports'

export const useTotal = (products, config) => {
  const subTotal = computed(() => {
    return (products?.value || products || []).reduce((total, current) => {
      return total + (current.discountPrice || current.price) * current.quantity
    }, 0)
  })

  const granTotal = computed(() => {
    let total = subTotal.value
    const { shipping, payment } = config

    if (shipping && 'value' in shipping) {
      if (shipping.value?.price) {
        total += shipping.value.price
      } else if (shipping.value?.cost) {
        total += shipping.value.cost
      } else if (!isNaN(shipping.value)) {
        total += shipping.value
      }
    } else {
      total += shipping || 0
    }

    if (payment && 'value' in payment) {
      if (payment.value?.price) {
        total += payment.value.price
      } else if (payment.value?.cost) {
        total += payment.value.cost
      } else if (!isNaN(payment.value)) {
        total += payment.value
      }
    } else {
      total += payment || 0
    }

    return total
  })

  const total = computed(() => {
    let total = granTotal.value
    const { discount } = config

    if (discount && 'value' in discount) {
      total -= discount.value
    } else {
      total -= discount || 0
    }

    return total
  })

  return {
    subTotal,
    granTotal,
    total,
  }
}
