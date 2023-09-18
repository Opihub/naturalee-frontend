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
  name: 'order-products'
})

// Component life-cycle hooks

// Composables
const route = useRoute()
const order = await useApi(`shop/orders/${route.params.id}/products`)

// Data

// Watcher

// Computed

// Methods
</script>
