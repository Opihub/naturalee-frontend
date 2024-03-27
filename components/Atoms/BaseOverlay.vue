<template>
  <section :class="CSS_NAME">
    <SiteContainer :max-width="maxWidth" flex>
      <slot />
    </SiteContainer>
  </section>
</template>

<script setup>
// Constants
const CSS_NAME = 'o-overlay'

// Define (Props, Emits, Page Meta)
defineProps({
  maxWidth: {
    type: [Number, String],
    default: '100%',
  },
})
</script>

<style lang="scss">
$prefix: 'overlay';
@include object($prefix) {
  position: fixed;
  inset: get-var(inset, 0, $prefix: $prefix);
  z-index: get-var(z-#{$prefix});
  background-color: rgba(
    get-var(background-color, get-var(rgb-light), $prefix: $prefix),
    get-var(opacity, 1, $prefix: $prefix)
  );
  cursor: get-var(cursor, default, $prefix: $prefix);
}
</style>
