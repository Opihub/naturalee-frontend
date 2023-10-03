<template>
  <div>
    <FormAddresses :user-data="response.data" />
  </div>
</template>

<script setup>
// Imports

// Constants
const route = useRoute()
const response = await useApi(
  `/shop/addresses/${route.params.addresses}`,
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

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped></style>
