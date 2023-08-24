<template>
  <component :is="tag" :class="className" :style="style">
    <!-- TODO -->
    <slot name="video" />
    <slot />
  </component>
</template>

<script setup>
const CSS_NAME = 'o-background'

const props = defineProps({
  contentCenter: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
  tag: {
    type: String,
    default: 'div',
    validator(value) {
      return ['div', 'section', 'main', 'span'].includes(value)
    },
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

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.contentCenter) {
    className.push(`${CSS_NAME}--centered`)
  }

  return className
})

const style = computed(() => {
  const style = {}

  if (props.image) {
    style['--background-image'] = `url(${props.image})`
  }

  if (props.color) {
    style['--background-color'] = `var(--color-${props.color})`
  }

  return style
})
</script>

<style lang="scss">
$prefix: 'background';
@include object($prefix) {
  width: get-var(width, auto, $prefix: $prefix);
  height: get-var(height, auto, $prefix: $prefix);
  background-image: get-var(image, $prefix: $prefix);
  background-color: get-var(color, transparent, $prefix: $prefix);
  background-position: get-var(position, center, $prefix: $prefix);
  background-size: get-var(size, cover, $prefix: $prefix);
  background-repeat: get-var(repeat, no-repeat, $prefix: $prefix);

  @include modifier('centered') {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
