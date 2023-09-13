<template>
  <button :class="CSS_NAME" type="button">
    <span :class="`${CSS_NAME}__scale`">
      <span :class="`${CSS_NAME}__times`"> &times; </span>
    </span>
  </button>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-cross'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'cross';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      scale: 3,
    )
  );
  position: relative;
  font-size: inherit;
  line-height: inherit;
  display: inline-block;
  border-radius: 0;
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;

  &:focus {
    outline-offset: calc(
      (
          get-var(width, rem(10px), $prefix: $prefix) *
            get-var(scale, $prefix: $prefix) -
            get-var(width, rem(10px), $prefix: $prefix)
        ) / 2
    );
  }

  @include element('scale') {
    display: block;
    transform: scale(#{get-var(scale, $prefix: $prefix)});
  }

  @include element('times') {
    font-size: 0;
    position: relative;
    display: block;
    width: get-var(width, rem(10px), $prefix: $prefix);
    height: get-var(height, rem(10px), $prefix: $prefix);
    transform: scale(calc(1 / #{get-var(scale, $prefix: $prefix)}));

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      inset: 50% 0 auto 0;
      transform: translateY(-50%)
        rotate(
          calc(
            45deg * #{get-var(on, 1, $prefix: $prefix)} * #{get-var(
                rotate,
                1,
                $prefix: $prefix
              )}
          )
        );
      height: rem(1.5px);
      background-color: get-var(color, get-var(color-black), $prefix: $prefix);
      @include transition(background-color, transform);
    }

    &::before {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          rotate: 1,
        )
      );
    }

    &::after {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          rotate: -1,
        )
      );
    }
  }

  &:hover {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        on: 0,
        color: get-var(color-yellow),
      )
    );
  }
}
</style>
