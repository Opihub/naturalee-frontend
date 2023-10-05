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
  alias: [
    '/consegna',
    '/privacy-policy',
    '/cookie-policy',
    '/term-and-conditions',
    '/condizioni-di-vendita',
  ],
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
