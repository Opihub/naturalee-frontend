<template>
  <div :class="CSS_NAME">
    <div :class="`${CSS_NAME}__holder`">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-receipt'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'receipt';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      border-gap: rem(13px),
    )
  );

  display: block;
  position: relative;
  padding: get-var(border-gap, $prefix: $prefix) 0;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: get-var(border-gap, $prefix: $prefix);
    background-image: url('assets/images/receipt-border.png');
    background-size: contain;
    background-repeat: repeat-x;
    background-position: left bottom;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
    transform: scaleY(-1);
  }

  @include element('holder') {
    background-color: get-var(color-white);
  }
}
</style>
