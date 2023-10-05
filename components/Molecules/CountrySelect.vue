<template>
  <InputField type="select" :data="country.data" label-key="name">
    <slot />
  </InputField>
</template>

<script setup>
// Imports

// Constants
const country = await useApi(
  `/countries/`,
  {
    method: 'GET',
  },
  {
    cache: false,
  }
)
// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
// TODO: watchEffect al cambio della nazione passata
// const provinces = await useApi(`countries/${props.country}/provinces`)

// Watcher

// Computed

// Methods
</script>
