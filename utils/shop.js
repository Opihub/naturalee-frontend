import { storeToRefs } from '#imports'
import { useConfigurationStore } from '@/stores/configuration'

export function isValidCategory(slug = null) {
  const configurationStore = useConfigurationStore()
  const { shopCategories } = storeToRefs(configurationStore)

  return shopCategories.value.some((category) => category.slug === slug)
}

export function isValidSellingMethod(slug = null) {
  const configurationStore = useConfigurationStore()
  const { shopSellingMethods } = storeToRefs(configurationStore)

  // Se non ci sono elementi prendiamo come valida la variazione
  if (shopSellingMethods.value.length === 0) {
    return true
  }

  return shopSellingMethods.value.some((category) => category.slug === slug)
}

export function orderId(id) {
  return `#${id.toString().padStart(7, '0')}`
}
