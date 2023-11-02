<template>
  <section>
    <BaseHeading
      tag="h1"
      use="h3"
      class="u-mb-large"
      color="black"
      :text="$t(`addresses.${$route.params.address}`)"
    />

    <FormUpdateAddress
      v-model:address="data.address"
      v-model:invoice="data.invoice"
      :is-billing="isBilling"
    />
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'address-details',
  key: 'address-details',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/indirizzi/[address]',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const route = useRoute()
const response = await useApi(
  `/shop/addresses/${route.params.address}`,
  {
    method: 'GET',
  },
  {
    cache: false,
    dataOnly: true,
  }
)

// Data
const isBilling = ref(route.params.address === 'billing')
const data = ref({
  address: {
    firstName: response.value.firstName,
    lastName: response.value.lastName,
    country: response.value.country,
    address: response.value.address,
    address2: response.value.address2,
    province: response.value.province,
    city: response.value.city,
    postcode: response.value.postcode,
  },
  invoice: {
    invoice: response.value.invoice,
    company: response.value.company,
    cfPrivate: response.value.cfPrivate,
    cfCompany: response.value.cfCompany,
    vat: response.value.vat,
    sdi: response.value.sdi,
    pec: response.value.pec,
  },
})
// Watcher

// Computed

// Methods
</script>
