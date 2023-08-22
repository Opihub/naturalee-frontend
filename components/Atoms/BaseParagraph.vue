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
@include object(paragraph) {
  $prefix: heading;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      font-weight: get-var(weight-regular),
      text-color: get-var(color-black),
      font-size: 18px,
      line-height: 28px,
      font-family: get-var(family-text),
    )
  );

  color: get-var(text-color, $prefix: $prefix);
  font-weight: get-var(font-weight, $prefix: $prefix);
  font-size: get-var(font-size, $prefix: $prefix);
  line-height: get-var(line-height, $prefix: $prefix);
  font-family: get-var(font-family, $prefix: $prefix);
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
