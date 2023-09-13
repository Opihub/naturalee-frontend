<template>
  <div :class="CSS_NAME" :style="style">
    <slot />
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-layout'

// Define (Props, Emits, Page Meta)
const props = defineProps({
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

// Composables

// Data

// Watcher

// Computed
const style = computed(() => {
  const style = {}

  if (props.color) {
    style['--layout-background-color'] = `var(--color-${props.color})`
  }

  return style
})

// Methods
</script>

<style lang="scss">
$prefix: 'layout';
@include object($prefix) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 100vh;
  margin-bottom: get-var(bottom-gap, 0, $prefix: $prefix);
  background-color: get-var(background-color, transparent, $prefix: $prefix);
}
</style>
