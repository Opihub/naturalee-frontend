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
  name: 'terms-and-conditions',
  alias: ['/termini-e-condizioni', '/condizioni-di-vendita'],
})

defineI18nRoute({
  paths: {
    it: '/termini-e-condizioni',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data
const {page} = await usePage('termini-e-condizioni')
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

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
