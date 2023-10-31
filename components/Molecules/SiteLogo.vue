<template>
  <BaseLink :to="{ name: 'home' }" :class="CSS_NAME">
    <template #svg>
      <!-- <ClientOnly> -->
      <AltLogo v-if="alt" :class="`${CSS_NAME}__image`" />
      <MainLogo v-else :class="`${CSS_NAME}__image`" />
      <!-- </ClientOnly> -->
    </template>
  </BaseLink>
</template>

<script setup>
import MainLogo from 'assets/svg/main-logo.svg'
import AltLogo from 'assets/svg/alt-logo.svg'

const CSS_NAME = 'c-logo'

defineProps({
  alt: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
$prefix: 'logo';
@include component($prefix) {
  @include element(image) {
    width: get-var(width, rem(220px), $prefix: $prefix);
    height: get-var(height, rem(34.6px), $prefix: $prefix);
    display: block;
  }
}
</style>
