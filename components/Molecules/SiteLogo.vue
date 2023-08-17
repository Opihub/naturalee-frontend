<template>
  <BaseLink to="/" :class="CSS_NAME">
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
  @include set-vars(
    $prefix: $prefix,
    $map: (
      width: 220px,
      height: 34.6px,
    )
  );

  @include element(image) {
    width: get-var(width, $prefix: $prefix);
    height: get-var(height, $prefix: $prefix);
    display: block;
  }
}
</style>
