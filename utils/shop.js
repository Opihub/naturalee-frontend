import { storeToRefs } from '#imports'
import { useConfigurationStore } from '@/stores/configuration'

export function isCategory(slug = null) {
  const configurationStore = useConfigurationStore()
  const { shopCategories } = storeToRefs(configurationStore)

  return shopCategories.value.some((category) => category.slug === slug)
}

export function orderId(id) {
  return `#${id.toString().padStart(7, '0')}`
}
