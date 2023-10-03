<template>
  <div :class="CSS_NAME">
    <div v-if="slots.head" :class="`${CSS_NAME}__head`">
      <slot name="head" />
      <BaseLink color="green" underline :to="link">Modifica</BaseLink>
    </div>
    <div :class="`${CSS_NAME}__body`">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-box'

// Define (Props, Emits, Page Meta)
defineProps({
  link: {
    type: String,
    default: null,
  },
})
// Component life-cycle hooks

// Composables
const slots = useSlots()

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'box';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      radius: rem(20px),
    )
  );

  background-color: get-var(color-white);
  border-radius: get-var(radius, $prefix: $prefix);

  @include element('head') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        text-transform: uppercase,
      )
    );

    font-weight: get-var(weight-bold);
    @include typography(16px, 20px);
    border-radius: get-var(radius, $prefix: $prefix)
      get-var(radius, $prefix: $prefix) 0 0;
    border-bottom: get-var(border-bottom-size, 2px, $prefix: $prefix)
      get-var(border-bottom-style, solid, $prefix: $prefix)
      get-var(border-bottom-color, get-var(color-light), $prefix: $prefix);
    display: get-var(head-display, block, $prefix: $prefix);
    justify-content: get-var(head-justify, start, $prefix: $prefix);
    align-items: get-var(head-align, start, $prefix: $prefix);
    padding: rem(24px) rem(40px);
    background-color: get-var(color-white);
  }

  @include element('body') {
    display: block;
    padding: rem(20px) rem(40px) rem(40px);
    background-color: get-var(body-background, trasparent, $prefix: $prefix);
  }
}
</style>
