<template>
  <span
    :class="CSS_NAME"
  ></span>
</template>

<script setup>
// Constants
const CSS_NAME = 'o-miniloader'

// Define (Props, Emits, Page Meta)
defineProps({
})
</script>

<style lang="scss">
$prefix: 'miniloader';
@include object($prefix) {
  width: 100%;
  text-align: center;
  display: block;
  opacity: 0.4;
  @include typography(14px, 18px);
  font-weight: get-var(weight-regular);
  position: relative;
  transform: translateY(-20px);

  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 50px;
    background-color: get-var(color-green);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 200px;
    animation: pulse 2s infinite ease-in-out;
    transform-origin: center center;
  }

  &:before {
    content: '';
    display: block;
    width: 50px;
    height: 50px;
    background-color: get-var(color-green);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) scale(0.3, 0.3);
    border-radius: 200px;
    transform-origin: center center;
    opacity: 1;
    z-index: 59;
  }

  @keyframes pulse {
    0% {
      opacity: 0.5;
      transform: translateX(-50%) scale(0.1, 0.1);
    }
    60% {
      opacity: 0.5;
      transform: translateX(-50%) scale(1, 1);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) scale(1.3, 1.3);
    }
  }
}
</style>
