<template>
  <span :class="CSS_NAME" :style="style">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-highlight-text'
// Define (Props, Emits, Page Meta)
const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
    validator(value) {
      return [
        'green',
        'red',
        'brown',
        'orange',
        'yellow',
        'light',
        'dark',
        'white',
        'black',
      ].includes(value)
    },
  },
})

// Component life-cycle hooks

// Data

// Watcher

// Computed
const style = computed(() => {
  const style = {}

  if (props.color) {
    style['--highlight-color'] = `${props.color}`
  }
  return style
})
</script>

<style lang="scss" scoped>
$prefix: 'highlight-text';
@include object($prefix) {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 105%;
    height: 30px;
    background-color: get-var(highlight-color, $yellow);
    border-top-right-radius: 90px 90px;
    border-bottom-right-radius: 90px 90px;
    border-top-left-radius: 80px 80px;
    border-bottom-left-radius: 80px 80px;
    transform: translate(-50%, 40%) rotateX(60deg);
    z-index: -1;
  }
}
</style>
