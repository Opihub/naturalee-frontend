<template>
  <BaseOverlay :class="CSS_NAME">
    <InlineMenu
      :menu="primaryMenu"
      :class="`${CSS_NAME}__primary`"
      class="u-mt-large"
      direction="vertical"
      color="green"
    />
    <InlineMenu
      :menu="socialsMenu"
      :class="`${CSS_NAME}__socials`"
      class="u-mt-huge"
      color="green"
    />
  </BaseOverlay>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-header-mobile'
// Define (Props, Emits, Page Meta)
defineProps({
  primaryMenu: {
    type: Array,
    default() {
      return []
    },
  },
  socialsMenu: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss" scoped>
$prefix: 'header-mobile';

@include object('overlay') {
  @include set-local-vars(
    $prefix: 'overlay',
    $map: (
      inset: calc(get-var(layout-header-height) + get-var(layout-header-offset))
        0 get-var(layout-bottom-gap) 0,
    )
  );
}

@include component($prefix) {
  @include from(tablet) {
    display: none;
  }

  @include set-local-vars(
    $prefix: 'container',
    $map: (
      align-items: start,
    )
  );

  @include set-local-vars(
    $prefix: 'container',
    $map: (
      padding: 0,
    )
  );
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      direction: column,
    )
  );

  @include element('primary') {
    width: 100%;

    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        font-size: rem(25px),
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        width: 100%,
      )
    );

    @include set-local-vars(
      $prefix: 'link-label',
      $map: (
        width: 100%,
      )
    );
  }
  @include element('socials') {
    width: 100%;
    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        justify-content: center,
      )
    );
    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        font-size: rem(20px),
      )
    );
  }
}
</style>
