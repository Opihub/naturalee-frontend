<template>
  <section>
    <OrdersTable :orders="orders" />
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
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
    return
  }

  // TODO pagination
  orders.value = response.value.data.records
})

// Composables

// Data
const orders = ref([])

// Watcher

// Computed

// Methods
</script>
