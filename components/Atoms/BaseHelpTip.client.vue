<template>
  <span :class="CSS_NAME" :aria-label="label">
    <slot />
  </span>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-help-tip'

// Define (Props, Emits, Page Meta)
defineProps({
  label: {
    type: String,
    default: '',
    require: true,
  },
})
// Component life-cycle hooks

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'help-tip';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      angle-height: rem(10px),
    )
  );

  position: relative;
  margin: 0 0.5em;
  background-color: rgba(0, 0, 0, 0.2);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: rem(20px);
  height: rem(20px);
  line-height: rem(20px);
  border-radius: 50%;

  padding: 0;
  cursor: help;

  &::before {
    content: '';
    left: 50%;
    top: 100%;
    position: absolute;
    transform: translateX(-50%);
    z-index: 1;
    width: 0;
    height: 0;
    border: get-var(angle-height, $prefix: $prefix) solid transparent;
    border-top-width: 0;
    border-bottom-color: get-var(color-yellow);

    opacity: 0;
    visibility: hidden;
    @include transition(opacity, visibility);
  }

  &::after {
    content: attr(aria-label);
    width: rem(200px);
    padding: 0.5em 1em;
    left: 50%;
    top: 100%;
    position: absolute;
    transform: translate(-50%, get-var(angle-height, $prefix: $prefix));
    z-index: 1;
    border-radius: 0.2em;
    color: get-var(color-green);
    background: get-var(color-yellow);
    text-align: center;
    font-weight: 700;
    font-size: rem(14px);

    opacity: 0;
    visibility: hidden;
    @include transition(opacity, visibility);

    @include customMedia(600px, true) {
      left: unset;
      top: 50%;
      right: 0;
      transform: translate(77%, get-var(angle-height, $prefix: $prefix));
    }
  }

  &:focus,
  &:hover {
    &::after,
    &::before {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
