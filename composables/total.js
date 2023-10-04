import { computed } from '#imports'

export const useTotal = (products, config) => {
  const subTotal = computed(() => {
    return (products?.value || products).reduce((total, current) => {
      return total + current.price * current.quantity
    }, 0)
  })

  const granTotal = computed(() => {
    let total = subTotal.value
    const { shipping } = config

    if ('value' in shipping) {
      total += shipping.value
    } else {
      total += shipping || 0
    }

    return total
  })

  return {
    subTotal,
    granTotal,
  }
}
