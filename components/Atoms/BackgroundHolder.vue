<template>
  <component :is="tag" :class="className" :style="style">
    <div v-if="slots.back" :class="`${CSS_NAME}__back`">
      <slot name="back" />
    </div>

    <slot :class-name="`${CSS_NAME}__front`" />
  </component>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-background'

// Define (Props, Emits, Page Meta)
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

// Component life-cycle hooks

// Composables
const slots = useSlots()

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (props.contentCenter) {
    className.push(`${CSS_NAME}--centered`)
  }

  if (slots.back) {
    className.push(`${CSS_NAME}--holder`)
  }

  return className
})

const style = computed(() => {
  const style = {}

  if (props.image) {
    const url = props.image
    style['--background-image'] = `url(${url})`
  }

  if (props.color) {
    style['--background-color'] = `var(--color-${props.color})`
  }

  return style
})

// Methods
</script>

<style lang="scss">
$prefix: 'background';
@include object($prefix) {
  $prefix-back: '#{$prefix}-back';
  width: get-var(width, auto, $prefix: $prefix);
  height: get-var(height, auto, $prefix: $prefix);
  background-image: get-var(image, $prefix: $prefix);
  background-color: get-var(color, transparent, $prefix: $prefix);
  background-position: get-var(position, center, $prefix: $prefix);
  background-size: get-var(size, cover, $prefix: $prefix);
  background-repeat: get-var(repeat, no-repeat, $prefix: $prefix);
  overflow: get-var(overflow, visible, $prefix: $prefix);

  @include modifier('centered') {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include modifier('holder') {
    position: relative;
  }

  @include element('front') {
    position: relative;
    z-index: 2;
  }

  @include element('back') {
    position: absolute;
    z-index: 0;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    width: get-var(width, 100%, $prefix: $prefix-back);
    height: get-var(height, auto, $prefix: $prefix-back);
    pointer-events: none;
  }
}
</style>
