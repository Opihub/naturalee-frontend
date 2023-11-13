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
    style['--highlight-color'] = `var(--color-${props.color})`
  }

  return style
})
</script>

<style lang="scss" scoped>
$prefix: 'highlight-text';
@include object($prefix) {
  position: relative;
  z-index: 1;
  display: inline-block;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 105%;
    height: get-var(height, rem(18px), $prefix: $prefix);
    background-color: get-var(color, get-var(color-yellow), $prefix: $prefix);
    border-top-right-radius: 90px 90px;
    border-bottom-right-radius: 90px 90px;
    border-top-left-radius: 80px 80px;
    border-bottom-left-radius: 80px 80px;
    transform: translate(get-var(translate, #{-50%, 0}, $prefix: $prefix))
      rotateX(get-var(rotate, 60deg, $prefix: $prefix));
    z-index: -1;

    @include from(desktop) {
      height: get-var(height, rem(45px), $prefix: $prefix);
    }
  }
}
</style>
