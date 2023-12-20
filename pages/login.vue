<template>
  <section class="o-page">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <ProfileForms class="o-page__main" />
  </section>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'standard',
  name: 'login',
  middleware: () => {
    const store = useAccountStore()
    const { isLoggedIn } = storeToRefs(store)

    if (isLoggedIn.value) {
      console.debug(isLoggedIn.value)
      return navigateTo({ name: 'my-account' })
    }

    return true
  },
})

// Component life-cycle hooks

// Composables

// Data
const { page } = await usePage('my-account')

// Watcher

// Computed

// Methods
</script>
