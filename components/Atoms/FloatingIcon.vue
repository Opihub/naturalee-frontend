<template>
  <div :class="CSS_NAME" :style="style">
    <slot />
  </div>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
const CSS_NAME = 'o-floating-icon'
const props = defineProps({
  svg: {
    type: String,
    default: null,
  },
  coordinates: {
    type: Object,
    required: true,
  },
  svgSize: {
    type: [String, Number, Object],
    default: '1em',
  },
})
// Component life-cycle hooks

// Data

// Watcher

// Computed
const style = computed(() => {
  const style = {}
  if (props.coordinates) {
    for (const coordinate in props.coordinates) {
      const value = !isNaN(props.coordinates[coordinate])
        ? `${props.coordinates[coordinate]}px`
        : props.coordinates[coordinate]

      if (coordinate in props.coordinates) {
        style[`--floating-icon-position-${coordinate}`] = value
      }
    }
  }

  if (props.svgSize) {
    const size = !isNaN(props.svgSize) ? `${props.svgSize}px` : props.svgSize
    style['--svg-width'] = size
    style['--svg-height'] = size
    if (typeof props.svgSize === 'object') {
      style['--svg-width'] = !isNaN(props.svgSize?.width)
        ? `${props.svgSize?.width}px`
        : props.svgSize?.width
      style['--svg-height'] = !isNaN(props.svgSize?.width)
        ? `${props.svgSize?.width}px`
        : props.svgSize?.height
    }
  }
  return style
})

// Methods
</script>

<style lang="scss">
$prefix: 'floating-icon';

@include object($prefix) {
  position: absolute;
  top: get-var(position-top, $prefix: $prefix);
  left: get-var(position-left, $prefix: $prefix);
  right: get-var(position-right, $prefix: $prefix);
  bottom: get-var(position-bottom, $prefix: $prefix);
  z-index: 10;
  user-select: none;
  //pointer-events: none;
  svg {
    margin: 0;
    width: #{get-var(width, $prefix: 'svg')};
    height: #{get-var(height, $prefix: 'svg')};
  }
}
</style>
