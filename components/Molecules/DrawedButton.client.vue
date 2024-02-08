<template>
  <BaseButton :class="`${CSS_NAME}--drawed`">
    <ButtonSVG :class="`${CSS_NAME}__background`" />

    <div :class="innerClassName">
      <slot />
    </div>
  </BaseButton>
</template>

<script setup>
// Imports
import ButtonSVG from '@/assets/svg/button.svg'

// Constants
const CSS_NAME = 'o-button'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  innerClass: {
    type: [String, Array, Object],
    default: null,
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed
const innerClassName = computed(() => {
  const className = assembleClassName(props.innerClass)

  className.push(`${CSS_NAME}__content`)

  return className
})

// Methods
</script>

<style lang="scss">
$prefix: 'button';
@include object($prefix) {
  @include modifier('drawed') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        padding: rem(16px) rem(20px),
        text-transform: none,
      )
    );

    margin: 0;
    border-radius: 0;
    background-color: transparent;
    position: relative;
    color: get-var(text-color, get-var(color-black), $prefix: $prefix);

    @include element('content') {
      position: relative;
      z-index: 1;
    }

    @include element('background') {
      position: absolute;
      z-index: 0;
      inset: 0;
      width: 100%;
      height: 100%;
      fill: get-var(background-color, get-var(color-white), $prefix: $prefix);
      stroke: get-var(border-color, get-var(color-green), $prefix: $prefix);
      stroke-width: get-var(border-size, rem(1px), $prefix: $prefix);

      @include transition(stroke, fill);
    }

    @include is('current') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-white),
          background-color: get-var(color-green),
          // border-color: get-var(color-green),
        )
      );

      &:hover {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            text-color: get-var(color-green),
            background-color: get-var(color-yellow),
            border-color: get-var(color-yellow),
          )
        );
      }
    }
  }
}
</style>
