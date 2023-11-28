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
    type: [Object],
    required: true,
  },
  svgSize: {
    type: [Object],
    required: true,
  },
  zIndex: {
    type: [String, Number],
    default: '10',
  },
})
// Component life-cycle hooks

// Data

// Watcher

// Computed
const style = computed(() => {
  const style = {}

  if (props.coordinates) {
    const refCoordinates = {
      default: props.coordinates?.default,
      tablet: props.coordinates?.tablet,
      desktop: props.coordinates?.desktop,
      large: props.coordinates?.large,
      full: props.coordinates?.full,
    }
    let previous
    for (const media in refCoordinates) {
      const coordinates = refCoordinates[media]
      if (coordinates) {
        for (const position in coordinates) {
          const coordinate = coordinates[position]
          const value = !isNaN(coordinate) ? `${coordinate}px` : coordinate
          style[`--floating-icon-${media}-position-${position}`] = value
        }
        previous = coordinates
      } else {
        for (const position in previous) {
          const coordinate = previous[position]
          const value = !isNaN(coordinate) ? `${coordinate}px` : coordinate
          style[`--floating-icon-${media}-position-${position}`] = value
        }
      }
    }
  }

  if (props.svgSize) {
    const refSize = {
      default: props.svgSize?.default,
      tablet: props.svgSize?.tablet,
      desktop: props.svgSize?.desktop,
      large: props.svgSize?.large,
      full: props.svgSize?.full,
    }

    let previous
    for (const media in refSize) {
      const value = refSize[media]

      if (value) {
        style[`--svg-${media}-width`] = !isNaN(value?.width)
          ? `${value?.width}px`
          : value?.width
        style[`--svg-${media}-height`] = !isNaN(value?.height)
          ? `${value?.height}px`
          : value?.height
        previous = value
      } else {
        style[`--svg-${media}-width`] = !isNaN(previous?.width)
          ? `${previous?.width}px`
          : previous?.width
        style[`--svg-${media}-height`] = !isNaN(previous?.height)
          ? `${previous?.height}px`
          : previous?.height
      }
    }
  }

  if (!isNaN(props.zIndex)) {
    style['--floating-icon-zindex'] = props.zIndex
  }

  return style
})

// Methods
</script>

<style lang="scss">
$prefix: 'floating-icon';

@include object($prefix) {
  position: absolute;

  top: get-var(default-position-top, $prefix: $prefix);
  left: get-var(default-position-left, $prefix: $prefix);
  right: get-var(default-position-right, $prefix: $prefix);
  bottom: get-var(default-position-bottom, $prefix: $prefix);

  @include from(tablet) {
    top: get-var(tablet-position-top, $prefix: $prefix);
    left: get-var(tablet-position-left, $prefix: $prefix);
    right: get-var(tablet-position-right, $prefix: $prefix);
    bottom: get-var(tablet-position-bottom, $prefix: $prefix);
  }
  @include from(desktop) {
    top: get-var(desktop-position-top, $prefix: $prefix);
    left: get-var(desktop-position-left, $prefix: $prefix);
    right: get-var(desktop-position-right, $prefix: $prefix);
    bottom: get-var(desktop-position-bottom, $prefix: $prefix);
  }
  @include from(large) {
    top: get-var(large-position-top, $prefix: $prefix);
    left: get-var(large-position-left, $prefix: $prefix);
    right: get-var(large-position-right, $prefix: $prefix);
    bottom: get-var(large-position-bottom, $prefix: $prefix);
  }
  @include from(full) {
    top: get-var(full-position-top, $prefix: $prefix);
    left: get-var(full-position-left, $prefix: $prefix);
    right: get-var(full-position-right, $prefix: $prefix);
    bottom: get-var(full-position-bottom, $prefix: $prefix);
  }

  z-index: get-var(zindex, $prefix: $prefix);
  user-select: none;
  //pointer-events: none;
  svg {
    margin: 0;
    width: #{get-var(default-width, $prefix: 'svg')};
    height: #{get-var(default-height, $prefix: 'svg')};
    @include from(tablet) {
      width: #{get-var(tablet-width, $prefix: 'svg')};
      height: #{get-var(tablet-height, $prefix: 'svg')};
    }
    @include from(desktop) {
      width: #{get-var(desktop-width, $prefix: 'svg')};
      height: #{get-var(desktop-height, $prefix: 'svg')};
    }
    @include from(large) {
      width: #{get-var(large-width, $prefix: 'svg')};
      height: #{get-var(large-height, $prefix: 'svg')};
    }
    @include from(full) {
      width: #{get-var(full-width, $prefix: 'svg')};
      height: #{get-var(full-height, $prefix: 'svg')};
    }
  }
}
</style>
