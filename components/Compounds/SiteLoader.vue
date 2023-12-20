<template>
  <BaseOverlay :class="[CSS_NAME, `${CSS_NAME}--starter`]">
    <div :class="`${CSS_NAME}__spinner`">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </BaseOverlay>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-loader'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'loader';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'overlay',
    $map: (
      opacity: 0.6,
      cursor: wait,
    )
  );

  backdrop-filter: blur(3px);

  @include element('spinner') {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @include modifier('starter') {
    @include element('spinner') {
      width: rem(220px);
      height: rem(220px);

      & div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: rem(200px);
        height: rem(200px);
        margin: rem(8px);
        border: rem(8px) solid transparent;
        border-radius: 50%;
        animation: lds-ring-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) get-var(delay, 0s, $prefix: $prefix) infinite, lds-ring-color 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-top-color: get-var(color-yellow);

        &:nth-child(1) {
          @include set-local-vars($prefix: $prefix, $map: (
            delay: -0.45s,
          ));
        }

        &:nth-child(2) {
          @include set-local-vars($prefix: $prefix, $map: (
            delay: -0.3s,
          ));
        }

        &:nth-child(3) {
          @include set-local-vars($prefix: $prefix, $map: (
            delay: -0.15s,
          ));
        }
      }
    }
  }

  @keyframes lds-ring-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes lds-ring-color {
    0% {
      border-top-color: get-var(color-yellow);
    }

    33% {
      border-top-color: get-var(color-orange);
    }

    66% {
      border-top-color: get-var(color-green);
    }

    100% {
      border-top-color: get-var(color-yellow);
    }
  }
}
</style>
