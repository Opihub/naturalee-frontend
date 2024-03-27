<template>
  <InputField type="select" :data="countries.data" label-key="name">
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
const countries = await useApi('countries')

// Watcher

// Computed

// Methods
</script>
