import {
  defineStore,
  acceptHMRUpdate,
  skipHydrate,
  computed,
  useApi,
} from '#imports'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'

export const useConfigurationStore = defineStore('configuration', () => {
  const nuxtApp = useNuxtApp()

  const configuration = useLocalStorage(
    'configuration',
    {},
    {
      serializer: StorageSerializers.object,
    }
  )

  const referer_link = useCookie('referer_link');
  const landing_page = useCookie('landing_page');


  const set_cookie = () => {
    if(!referer_link.value)
      referer_link.value = document?.referer_link;

    if(!landing_page.value)
      landing_page.value = window?.location?.href;
  }


  const load = async () => {
    const { data, refresh } = await useApi('config', {
      key: 'config',
      dataOnly: true,
      expiration_hours:24
    })

    if (!data.value) {
      await refresh()
    } else {
      configuration.value = data.value
    }

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
    set_cookie
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useConfigurationStore, import.meta.hot)
  )
}
