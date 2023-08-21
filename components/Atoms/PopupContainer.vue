<template>
  <div :class="className" :style="style">
    <slot />
  </div>
</template>

<script setup>
const CSS_NAME = 'o-popup'

const props = defineProps({
  maxWidth: {
    type: String,
    default: null,
    validator(value) {
      return !isNaN(parseFloat(value))
    },
  },
  color: {
    type: String,
    default: 'green',
    validator(value) {
      return ['green', 'white'].includes(value)
    },
  },
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.color !== 'green') {
    className.push(`${CSS_NAME}--${props.color}`)
  }

  return className
})

const style = computed(() => {
  const style = {}

  if (props.maxWidth) {
    style['--popup-max-width'] =
      typeof props.maxWidth === 'number'
        ? `${props.maxWidth}px`
        : props.maxWidth
  }

  return style
})
</script>

<style lang="scss">
$prefix: 'popup';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      outer-arrow-size: 10px,
      inner-arrow-offset: 1px,
      inner-arrow-size:
        calc(
          get-var(outer-arrow-size, $prefix: $prefix) -
            get-var(inner-arrow-offset, $prefix: $prefix)
        ),
    )
  );

  width: 100%;
  max-width: get-var(max-width, get-var(container-width), $prefix, $prefix);
  margin: 0;
  padding: 0;
  border: 1px solid
    get-var(border-color, get-var(color-green), $prefix: $prefix);
  background-color: get-var(
    background-color,
    get-var(color-white),
    $prefix: $prefix
  );
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: auto 0 100% 50%;
    transform: translate(-50%);
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  &::after {
    border-width: 0 get-var(inner-arrow-size, $prefix: $prefix)
      get-var(inner-arrow-size, $prefix: $prefix);
    border-bottom-color: get-var(
      arrow-color,
      get-var(color-green),
      $prefix: $prefix
    );
  }

  &::before {
    border-width: 0 get-var(outer-arrow-size, $prefix: $prefix)
      get-var(outer-arrow-size, $prefix: $prefix);
    border-bottom-color: get-var(
      border-color,
      get-var(color-green),
      $prefix: $prefix
    );
  }

  @include modifier('white') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        arrow-color: get-var(color-white),
      )
    );
  }
}
</style>
