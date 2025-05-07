<template>
  <svg viewBox="0 0 600 600" :class="CSS_NAME" :style="style">
    <g style="clip-path: url(#product-mask)">
      <rect width="600" height="600" stroke="none" />

      <image
        width="600"
        height="600"
        :href="href"
        :preserveAspectRatio="aspectRatio"
      />
    </g>
  </svg>
</template>

<script setup>
// Constants
const CSS_NAME = 'o-product-image'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  src: {
    type: String,
    default: null,
  },
  background: {
    type: String,
    default: 'light',
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
  width: {
    type: Number,
    default: 600,
  },
  height: {
    type: Number,
    default: 600,
  },
  size: {
    type: String,
    default: 'cover',
    validator(value) {
      return ['cover', 'contain'].includes(value)
    },
  },
})

// Computed
const style = computed(() => {
  const style = {}

  if (props.background) {
    style['--product-image-background'] = `var(--color-${props.background})`
  }

  return style
})

const aspectRatio = computed(() => {
  // https://www.digitalocean.com/community/tutorials/svg-preserve-aspect-ratio
  if (props.size === 'contain') {
    return 'xMidYMid meet'
  }

  return 'xMidYMid slice'
})

const href = computed(() => {
  const source = props.src ? props.src : '/logo.png'

  return source
})
</script>

<style lang="scss">
$prefix: 'product-image';
@include object($prefix) {
  rect {
    fill: get-var(background, get-var(color-light), $prefix: $prefix);
  }
}
</style>
