import { computed } from '#imports'

export const useTotal = (products, config) => {
  const subTotal = computed(() => {
    return products.reduce((total, current) => {
      return total + current.price * current.quantity
    }, 0)
  })

  const granTotal = computed(() => {
    return subTotal.value + config?.shipping || 0
  })

  return {
    subTotal,
    granTotal,
  }
}
