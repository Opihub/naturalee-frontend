<template>
  <section>
    <BaseHeading
      v-if="!orders"
      tag="h1"
      use="h3"
      class="u-mb-large"
      color="black"
      >Caricamento ordini in corso&hellip;</BaseHeading
    >
    <OrdersTable v-else :orders="orders.records" />
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/il-mio-account/ordini',
  name: 'orders-list',
  key: 'orders-list',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/ordini',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables

// Data
const orders = await useApi('shop/orders', {}, { dataOnly: true })

// Watcher

// Computed

// Methods
</script>
