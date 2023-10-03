<template>
  <div :class="className" :style="style">
    <slot />
  </div>
</template>

<script setup>
const CSS_NAME = 'o-container'

const props = defineProps({
  maxWidth: {
    type: [Number, String],
    default: null,
  },
  padless: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
  flex: {
    type: Boolean,
    default: false,
  },
  flipped: {
    type: Boolean,
    default: false,
  },
})

const { style: maxWidth } = useMaxWidth(
  props.full ? '100%' : props.maxWidth,
  'container'
)

const style = computed(() => {
  let style = {}

  if (maxWidth.value) {
    style = { ...maxWidth.value }
  }

  if (props.padless || props.full) {
    style['--container-padding'] = 0
  }

  return style
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.flex) {
    className.push(`${CSS_NAME}--flex`)
  }
  if (props.flipped) {
    className.push(`${CSS_NAME}--flipped`)
  }

  return className
})
</script>

<style lang="scss">
$prefix: 'container';
@include object($prefix) {
  width: 100%;
  height: get-var(height, auto, $prefix: $prefix);
  margin: get-var(margin, 0 auto, $prefix: $prefix);
  padding: 0
    get-var(padding, get-var(container-default-padding), $prefix: $prefix);
  max-width: get-var(max-width, get-var(container-size), $prefix: $prefix);

  @include modifier('flex') {
    display: flex;
    flex-direction: get-var(direction, row, $prefix: $prefix);
    flex-wrap: get-var(wrap, wrap, $prefix: $prefix);
    align-items: get-var(align-items, center, $prefix: $prefix);
    justify-content: get-var(justify-content, space-between, $prefix: $prefix);
    gap: get-var(gap, 0, $prefix: $prefix);
  }

  @include modifier('flipped') {
    display: flex;
    flex-direction: column;
    @include from('tablet') {
      flex-direction: row-reverse;
    }
    flex-wrap: get-var(wrap, wrap, $prefix: $prefix);
    align-items: get-var(align-items, center, $prefix: $prefix);
    justify-content: get-var(justify-content, space-between, $prefix: $prefix);
    gap: get-var(gap, 0, $prefix: $prefix);
  }
}
</style>
