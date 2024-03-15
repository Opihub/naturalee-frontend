import {
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  useApi,
} from '#imports'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'

export const useConfigurationStore = defineStore('configuration', () => {
  const configuration = useLocalStorage(
    'configuration',
    {},
    {
      serializer: StorageSerializers.object,
    }
  )

  const load = async () => {
    const response = await useApi('config', {}, { dataOnly: true })

    configuration.value = response.value
  }

  const shopCategories = computed(() => {
    return configuration.value.categories || []
  })

  const menu = computed(() => {
    return configuration.value.menu || {}
  })

  const layout = computed(() => {
    return configuration.value.layout || {}
  })

  const products = computed(() => {
    return configuration.value.products || {}
  })

  return {
    configuration: skipHydrate(configuration),
    shopCategories,
    products,
    layout,
    menu,
    load,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useConfigurationStore, import.meta.hot)
  )
}
