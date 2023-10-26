import {
  defineStore,
  acceptHMRUpdate,
  storeToRefs,
  skipHydrate,
  ref,
} from '#imports'
import { useApi } from '@/composables/api'
import { useAccountStore } from '@/stores/account'
import { useSessionStorage, StorageSerializers } from '@vueuse/core'

export const useShippingStore = defineStore('shipping', () => {
  const profile = useAccountStore()

  const { isLoggedIn } = storeToRefs(profile)

  // State
  const provinces = ref([])
  const countriesProvince = ref({})

  const address = useSessionStorage(
    'shippingAddress',
    {
      firstName: null,
      lastName: null,
      country: null,
      address: null,
      address2: null,
      province: null,
      city: null,
      postcode: null,
    },
    {
      serializer: StorageSerializers.object,
    }
  )

  // Getters

  // Actions
  const load = async () => {
    if (!isLoggedIn.value) {
      return address
    }

    const response = await useApi(
      'shop/addresses/shipping',
      {
        method: 'GET',
      },
      {
        cache: false,
      }
    ).catch((error) => {
      console.error(
        'Errore durante il caricamento di "shop/addresses/shipping"',
        error
      )
    })

    if (!response.value.success) {
      throw new Error(response)
    }

    address.value = response.value.data

    return address
  }

  const loadProvinces = async (newCountry) => {
    let newProvinces = []

    if (newCountry) {
      const countryData = await useApi(`/countries/${newCountry}`, {
        method: 'GET',
      })

      newProvinces = countryData.value.data.provinces
    }

    provinces.value = newProvinces
  }

  const currentProvince = (country) => {
    // Se ho già una provincia associata alla nazione corrente, allora la carico
    if (country in countriesProvince.value) {
      return countriesProvince.value[country]
    }

    if (provinces.value.length > 0) {
      const province = provinces.value.find(() => true)

      if (province) {
        return province.id
      }
    }

    return null
  }

  const saveCountry = (country, province) => {
    countriesProvince.value[country] = province
  }

  return {
    address: skipHydrate(address),
    provinces,
    countriesProvince,
    load,
    loadProvinces,
    currentProvince,
    saveCountry,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShippingStore, import.meta.hot))
}
