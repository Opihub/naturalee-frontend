<template>
  <Transition name="fade">
    <section :class="CSS_NAME">
      <SiteContainer :max-width="maxWidth" flex>
        <slot />
      </SiteContainer>
    </section>
  </Transition>
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
  inset: 0;
  z-index: get-var(z-#{$prefix});
  background-color: get-var(background-color, get-var(color-light), $prefix: $prefix);
  opacity: get-var(opacity, 1, $prefix: $prefix);
  cursor: get-var(cursor, default, $prefix: $prefix);
}
</style>
