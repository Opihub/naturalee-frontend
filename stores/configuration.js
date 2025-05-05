import {
  defineStore,
  acceptHMRUpdate,
  computed,
  useApi,
  useCookie,
} from '#imports'
import { skipHydrate } from 'pinia'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'

export const useConfigurationStore = defineStore('configuration', () => {
  const configuration = useLocalStorage(
    'configuration',
    {},
    {
      serializer: StorageSerializers.object,
    }
  )

  const referrer_link = useCookie('referrer_link');
  const landing_page = useCookie('landing_page');
  const pwa_mode = useCookie('pwa_mode');


  const set_cookie = () => {
    if(!referrer_link.value)
      referrer_link.value = document?.referrer;

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

    set_cookie()

  }

  const shopCategories = computed(() => {
    return configuration.value.categories || []
  })

  const shopSellingMethods = computed(() => {
    return configuration.value.selling_methods || []
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

  const getPWAInfo = ()=>{
    let isStandalone = false
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isStandalone = true
    }
    pwa_mode.value = isStandalone
  };

  return {
    configuration: skipHydrate(configuration),
    shopCategories,
    shopSellingMethods,
    products,
    layout,
    menu,
    load,
    set_cookie,
    getPWAInfo
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useConfigurationStore, import.meta.hot)
  )
}
