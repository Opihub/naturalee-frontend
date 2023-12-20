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
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 90%);
    z-index: 1;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 rem(10px) rem(10px) rem(10px);
    border-color: transparent transparent transparent transparent;
    clear: both;
    transition: border-color 0.5s;
  }
  &:focus,
  &:after {
    content: attr(aria-label);
    width: 100%;
    min-width: 0;
    padding: 0.5em 1em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 20%);
    @include customMedia(600px, true) {
      left: unset;
      top: 50%;
      right: 0;
      transform: translate(77%, 20%);
    }
    z-index: 1;
    border-radius: 0.2em;
    color: transparent;
    background: transparent;
    text-align: center;
    font-weight: 700;
    opacity: 0;
    transition: background 0.5s, opacity 0.5s, color 0.5s, min-width 0.5s;
    font-size: 0;
  }
  &:hover:after {
    background: get-var(color-yellow);
    opacity: 1;
    font-size: rem(14px);
    color: get-var(color-green);
    min-width: rem(280px);
  }
  &:hover:before {
    border-color: transparent transparent get-var(color-yellow) transparent;
  }
}
</style>
