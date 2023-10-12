<template>
  <main class="s-checkout">
    {{ order }}
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'green',
  validate: async (route) => {
    return true
  },
})

// Component life-cycle hooks

// Composables

// Data
const order = useState('order')

// Watcher

// Computed

// Methods
</script>
