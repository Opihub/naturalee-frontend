<template>
  <span
    v-if="text.length > 0"
    :class="CSS_NAME"
    :text="text"
    :style="{
      '--total': text.length,
      '--radius': 1 / Math.sin(INNER_ANGLE / (180 / Math.PI)),
    }"
  >
    <span
      v-for="(letter, index) in text.split('')"
      :key="letter + index"
      :style="{ '--index': `${index}` }"
      >{{ letter }}</span
    >
  </span>
</template>

<script setup>
// Constants
const CSS_NAME = 'o-circular-text'
const INNER_ANGLE = 360 / 15

// Define (Props, Emits, Page Meta)
defineProps({
  text: {
    type: String,
    default: null,
  },
})
</script>

<style lang="scss" scoped>
$prefix: 'circular-text';
@include object($prefix) {
  display: block;
  position: get-var(position, absolute, $prefix: $prefix);
  z-index: 3;
  & [style*='--index'] {
    --inner-angle: calc((360 / var(--total)) * 0.65deg);
    @include from('tablet') {
      --inner-angle: calc((360 / var(--total)) * 0.7deg);
    }
    --character-width: 1.5; /* In "ch" units */
    --radius: calc(
      (var(--character-width, 1) / sin(var(--inner-angle))) * -1ch
    );
    font-size: get-var(font-size, rem(16px), $prefix: $prefix);
    // @include from('tablet') {
    //   font-size: get-var(circular-font-size, rem(12px));
    // }
    @include from('desktop') {
      font-size: get-var(font-size, rem(18px), $prefix: $prefix);
    }
    position: get-var(letter-position, absolute, $prefix: $prefix);
    top: 30%;
    left: 50%;
    color: $red;
    transform: rotate(calc(var(--inner-angle) * var(--index) - 55deg))
      translateY(var(--radius, -5ch));
    @include from('tablet') {
      transform: rotate(calc(var(--inner-angle) * var(--index) - 70deg))
        translateY(var(--radius, -5ch));
    }
  }
}
</style>
