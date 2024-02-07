import {
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  useApi,
} from '#imports'
import { useSessionStorage, StorageSerializers } from '@vueuse/core'

export const useConfigurationStore = defineStore('configuration', () => {
  const configuration = useSessionStorage(
    'configuration',
    {},
    {
      serializer: StorageSerializers.object,
    }
  )

  const load = async () => {
    const response = await useApi('config', {}, { dataOnly: true })

    configuration.value = response.value
    console.debug(configuration.value)
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

  return {
    configuration: skipHydrate(configuration),
    shopCategories,
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
