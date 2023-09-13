<template>
  <main class="s-wip">
    <SiteContainer flex>
      <BaseHeading>Work in progress</BaseHeading>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'standard',
  alias: [
    '/azienda',
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

  @include set-local-vars(
    $prefix: 'container',
    $map: (
      align-items: center,
      justify-content: center,
    )
  );

  @include object('container') {
    align-self: center;
  }
}
</style>
