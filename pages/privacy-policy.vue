<template>
  <section class="s-wip">
    <WorkInProgress />
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'standard',
  name: 'privacy-policy',
})

defineI18nRoute({
  paths: {
    it: '/privacy-policy',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data
await usePage('privacy-policy')

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
@include scope('wip') {
  flex: 1 1 100%;
  display: flex;
}
</style>
