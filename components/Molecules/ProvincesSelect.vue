<template>
  <InputField
    v-model="savedUserProvice"
    :type="provinces && provinces.length > 0 ? 'select' : 'text'"
    :data="provinces"
    label-key="name"
  >
    <slot />
  </InputField>
</template>

<script setup>
// Imports

// Constants
const savedUserProvice = ref('RC')

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
  userProvice: {
    type: String,
    default: null,
  },
})
defineEmits(['provinces:empty'])
// Component life-cycle hooks
// Composables
// TODO: watchEffect al cambio della nazione passata
// const provinces = await useApi(`countries/${props.country}/provinces`)

// Data

// Watcher

// Computed

// Methods
</script>
