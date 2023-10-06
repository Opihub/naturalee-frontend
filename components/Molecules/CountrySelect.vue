<template>
  <InputField type="select" :data="country.data" label-key="name">
    <slot />
  </InputField>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data
const country = await useApi('/countries/')

// Watcher

// Computed

// Methods
</script>
