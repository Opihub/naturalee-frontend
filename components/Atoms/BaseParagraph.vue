<template>
  <p :class="className">
    <slot>{{ text }}</slot>
  </p>
</template>

<script setup>
const CSS_NAME = 'o-paragraph'

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'black',
    validator(value) {
      // The value must match one of these strings
      return ['black', 'white'].includes(value)
    },
  },
  size: {
    type: String,
    default: 'default',
    validator(value) {
      // The value must match one of these strings
      return ['default', 'small'].includes(value)
    },
  },
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.color && props.color !== 'black') {
    className.push(`${CSS_NAME}--${props.color}`)
  }

  if (props.size && props.size !== 'small') {
    className.push(`${CSS_NAME}--${props.size}`)
  }

  return className
})
</script>

<style lang="scss">
$prefix: 'paragraph';
@include object($prefix) {
  font-weight: get-var(font-weight, get-var(weight-regular), $prefix: $prefix);
  color: get-var(text-color, get-var(color-black), $prefix: $prefix);
  font-size: get-var(font-size, rem(18px), $prefix: $prefix);
  line-height: get-var(line-height, rem(28px), $prefix: $prefix);
  font-family: get-var(font-family, get-var(family-text), $prefix: $prefix);
  width: get-var(width, auto, $prefix: $prefix);
  white-space: get-var(white-space, normal, $prefix: $prefix);
  display: block;

  @include modifier('white') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-white),
      )
    );
  }

  @include modifier('small') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-size: 13px,
        line-height: 30px,
      )
    );
  }
}
</style>
