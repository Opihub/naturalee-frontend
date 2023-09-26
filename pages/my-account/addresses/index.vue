<template>
  <SiteContainer>
    {{ account }}
    <!-- <BaseCard /> -->
  </SiteContainer>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const store = useAccountStore()
// Data
const { account } = storeToRefs(store)

// Watcher

// Computed

// Methods
</script>

<style></style>
