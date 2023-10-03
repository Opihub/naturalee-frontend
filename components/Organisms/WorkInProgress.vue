<template>
  <SiteContainer flex class="o-wip u-pt-huge u-pb-huge">
    <BaseHeading>Work in progress</BaseHeading>
  </SiteContainer>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
@include object('wip') {
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
