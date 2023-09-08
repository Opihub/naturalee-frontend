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
  size: {
    type: Number,
    required: true,
  },
  desktopFirst: {
    type: Boolean,
    default: false,
  },
  props: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<style lang="scss">
$prefix: 'overlay';
@include object($prefix) {
  position: fixed;
  inset: 0;
  z-index: 110;
  background-color: get-var(color-light);
}
</style>
