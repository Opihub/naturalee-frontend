import { computed } from '#imports'

export const usePrice = () => {
  const calculatedPrice = computed(() => (product) => {
    return (product.discountPrice || product.price) * product.quantity
  })

  return {
    calculatedPrice,
  }
}
