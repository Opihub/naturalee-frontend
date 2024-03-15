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
      v-model:address="address"
      v-model:invoice="invoice"
      :is-billing="isBilling"
      :editable-invoice="isBilling"
    />
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/il-mio-account/indirizzi/:address',
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
const { address, invoice } = useBillingAddress(response)
// Watcher

// Computed

// Methods
</script>
