<template>
  <main class="s-wip">
    <WorkInProgress />
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'standard',
  name: 'selling-conditions',
  alias: '/condizioni-di-vendita',
})

defineI18nRoute({
  paths: {
    it: '/condizioni-di-vendita',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data
await usePage('condizioni-di-vendita')

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
