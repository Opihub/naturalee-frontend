<template>
  <LayoutWrapper color="green" class="s-error">
    <main id="page">
      <slot />
    </main>
  </LayoutWrapper>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include scope('error') {
  background-position: center;
  background-size: cover;
  background-image: url('assets/images/back-404.png');
  align-items: center;
  justify-content: center;

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-white),
    )
  );

  @include set-local-vars(
    $prefix: 'paragraph',
    $map: (
      text-color: get-var(color-white),
    )
  );

  @include set-local-vars(
    $prefix: 'container',
    $map: (
      direction: column,
    )
  );
}
</style>
