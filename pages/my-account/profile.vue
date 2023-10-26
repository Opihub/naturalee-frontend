<template>
  <section>
    <FormUpdateUserDetails :user-data="account" />
  </section>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'profile',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/profilo',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const user = useAccountStore()

// Data
const account = await user.load()
// Watcher

// Computed

// Methods
</script>
