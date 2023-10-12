<template>
  <div :class="className">
    <div :class="`${CSS_NAME}__holder`" v-bind="$attrs">
      <div
        v-if="slots.header"
        :class="[`${CSS_NAME}__head`, `${CSS_NAME}__block`]"
      >
        <slot name="header" />
      </div>

      <slot :class-name="CSS_NAME_BLOCK" />
    </div>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-receipt'
const CSS_NAME_BLOCK = `${CSS_NAME}__block`

// Define (Props, Emits, Page Meta)
defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  containerClass: {
    type: String,
    default: null,
  },
  topLess: {
    type: Boolean,
    default: false,
  },
  bottomLess: {
    type: Boolean,
    default: false,
  },
})

// Component life-cycle hooks

// Composables
const slots = useSlots()

// Data

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME, props.containerClass]

  if (props.topLess) {
    className.push(`${CSS_NAME}--topless`)
  }

  if (props.bottomLess) {
    className.push(`${CSS_NAME}--bottomless`)
  }

  return className
})

// Methods
</script>

<style lang="scss">
$prefix: 'receipt';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      border-gap: rem(13px),
    )
  );

  display: block;
  position: relative;
  padding: get-var(border-gap, $prefix: $prefix) 0;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: get-var(border-gap, $prefix: $prefix);
    background-image: url('assets/images/receipt-border.png');
    background-size: contain;
    background-repeat: repeat-x;
    background-position: left bottom;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
    transform: scaleY(-1);
  }

  @include element('holder') {
    background-color: get-var(color-white);
  }
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: rem(40px),
    )
  );

  font-family: get-var(family-text);
  font-weight: get-var(weight-regular);
  @include typography(18px, 28px);

  @include element('block') {
    padding: rem(20px) get-var(padding, $prefix: $prefix);
  }

  @include element('head') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        text-transform: uppercase,
      )
    );

    padding-top: rem(10px);
    font-weight: get-var(weight-bold);
    @include typography(16px, 20px);
    border-bottom: 2px solid get-var(color-light);
  }

  @include modifier('topless') {
    &::before {
      content: none;
      display: none;
    }
  }

  @include modifier('bottomless') {
    &::after {
      content: none;
      display: none;
    }
  }
}
</style>
