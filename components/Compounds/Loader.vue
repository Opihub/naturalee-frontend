<template>
  <BaseOverlay :class="CSS_NAME">
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </BaseOverlay>
</template>

<script setup>
// Imports
// import SpinnerLottie from 'assets/lotties/spinner.json'

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

<style lang="scss" scoped>
$prefix: 'loader';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'overlay',
    $map: (
      opacity: 1,
      cursor: wait,
      background-color: get-var(color-green),
    )
  );

  .loader {
    display: inline-block;
    position: fixed;
    width: rem(220px);
    height: rem(220px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: rem(200px);
      height: rem(200px);
      margin: rem(8px);
      border: rem(8px) solid get-var(color-yellow);
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: get-var(color-yellow) transparent transparent transparent;
      &:nth-child(1) {
        animation-delay: -0.45s;
      }
      &:nth-child(2) {
        animation-delay: -0.3s;
      }
      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
