import { computed } from '#imports'

export const useTotal = (products, config) => {
  const subTotal = computed(() => {
    return (products?.value || products).reduce((total, current) => {
      return total + current.price * current.quantity
    }, 0)
  })

  const granTotal = computed(() => {
    const { shipping } = config

    return subTotal.value + (shipping?.value || shipping || 0)
  })

  return {
    subTotal,
    granTotal,
  }
}
