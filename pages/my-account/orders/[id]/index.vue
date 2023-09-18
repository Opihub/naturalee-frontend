<template>
  <section>
    {{ $route.params.id }} - {{ order }}
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  alias: '/my-account/orders/:id/view',
  name: 'order-view'
})

// Component life-cycle hooks

// Composables
const route = useRoute()
const order = await useApi(`shop/orders/${route.params.id}`)

// Data

// Watcher

// Computed

// Methods
</script>
