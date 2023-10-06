<template>
  <InputField
    :type="provinces.length > 0 ? 'select' : 'text'"
    :data="provinces"
    label-key="name"
  >
    <slot />
  </InputField>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
defineProps({
  country: {
    type: String,
    default: null,
  },
  provinces: {
    type: Array,
    required: true,
  },
})

// Component life-cycle hooks

// Composables
// TODO: watchEffect al cambio della nazione passata
// const provinces = await useApi(`countries/${props.country}/provinces`)

// Data

// Watcher

// Computed

// Methods
</script>
