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
  name: 'cookie-policy',
})

defineI18nRoute({
  paths: {
    it: '/cookie-policy',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data

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
