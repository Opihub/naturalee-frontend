<template>
  <section>
      <BaseHeading v-if="!orders" tag="h1" use="h3" class="u-mb-large" color="black"
        >Caricamento ordini in corso&hellip;</BaseHeading
      >
    <OrdersTable v-else :orders="orders" />
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
onMounted(async () => {
  const response = await useApi(
    'shop/orders',
    {},
    {
      cache: false,
    }
  )

  if (!response.value.success) {
    orders.value = []
    return
  }

  // TODO pagination
  orders.value = response.value.data.records
})

// Composables

// Data
const orders = ref(null)

// Watcher

// Computed

// Methods
</script>
