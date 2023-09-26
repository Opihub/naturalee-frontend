<template>
  <BaseButton :class="className" type="button">
    <slot />
    <slot name="svg" />
  </BaseButton>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-button'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  underline: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['black', 'green', 'yellow', 'white'].includes(value)
    },
  },
  underlineColor: {
    type: String,
    default: null,
    validator(value) {
      // The value must match one of these strings
      return ['black', 'green', 'yellow', 'white'].includes(value)
    },
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed
const className = computed(() => {
  const className = [`${CSS_NAME}--inline`]

  if (props.underline) {
    className.push('is-underline')
  }

  if (props.underlineColor) {
    className.push(`${CSS_NAME}--underline-${props.underlineColor}`)
  }

  return className
})

// Methods
</script>

<style lang="scss">
$prefix: 'button';
@include object($prefix) {
  @include modifier('inline') {
    border: 0;
    border-radius: 0;
    padding: 0;
    background-color: transparent;
    outline-offset: 3px;

    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-weight: get-var(weight-regular),
        text-transform: none,
      )
    );

    @include is('underline') {
      text-decoration: underline;

      @include transition(color, text-decoration-color);

      text-decoration-color: get-var(
        decoration-color,
        inherit,
        $prefix: $prefix
      );

      text-underline-offset: get-var(
        decoration-offset,
        rem(4px),
        $prefix: $prefix
      );

      text-decoration-thickness: get-var(
        decoration-thickness,
        rem(1px),
        $prefix: $prefix
      );
    }

    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        text-color: get-var(color-black),
      )
    );

    &:hover {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-green),
        )
      );
    }

    @include modifier('yellow') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-yellow),
        )
      );

      &:hover {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            text-color: get-var(color-white),
          )
        );
      }
    }

    @include modifier('green') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-green),
        )
      );

      &:hover {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            text-color: get-var(color-yellow),
          )
        );
      }
    }

    @include modifier('white') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          text-color: get-var(color-white),
        )
      );

      &:hover {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            text-color: get-var(color-yellow),
          )
        );
      }
    }

    @include modifier('underline-yellow') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          decoration-color: get-var(color-yellow),
        )
      );

      &:hover {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            decoration-color: get-var(color-white),
          )
        );
      }
    }

    @include modifier('underline-green') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          decoration-color: get-var(color-green),
        )
      );

      &:hover {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            decoration-color: get-var(color-yellow),
          )
        );
      }
    }

    @include modifier('underline-white') {
      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          decoration-color: get-var(color-white),
        )
      );

      &:hover {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            decoration-color: get-var(color-yellow),
          )
        );
      }
    }
  }
}
</style>
