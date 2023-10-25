<template>
  <footer :class="CSS_NAME">
    <slot />
  </footer>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-footer'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'footer';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: rem(30px) 0 rem(40px),
      gap: rem(44px),
      font-size: 13px,
      line-height: 19px,
      max-image-width: rem(270px),
    )
  );

  display: flex;
  flex-wrap: wrap;
  gap: get-var(gap, $prefix: $prefix);
  background-color: get-var(color-green);
  padding: get-var(padding, $prefix: $prefix);
  position: relative;

  @include from(tablet) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        padding: rem(30px) 0 rem(12px),
      )
    );
  }
}
</style>
