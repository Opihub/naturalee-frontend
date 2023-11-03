<template>
  <BaseOverlay :class="CSS_NAME">
    <SiteAccordion title="categorie" :max-width="1060">
      <InlineMenu :class="`${CSS_NAME}__categories`" :menu="categories" />
    </SiteAccordion>
    <InlineMenu
      :menu="primaryMenu"
      :class="`${CSS_NAME}__primary`"
      class="u-mt-large"
      direction="vertical"
      arrow
    />
  </BaseOverlay>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-header-mobile'
// Define (Props, Emits, Page Meta)
defineProps({
  categories: {
    type: Array,
    default() {
      return []
    },
  },
  primaryMenu: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss" scoped>
$prefix: 'header-mobile';
@include component($prefix) {
  margin-top: rem(132px);
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      justify-content: start,
    )
  );

  @include object('accordion') {
    width: 100%;
    @include set-local-vars(
      $prefix: 'title',
      $map: (
        color: get-var(color-yellow),
      )
    );
    @include component('menu-item') {
      @include set-local-vars(
        $prefix: 'menu',
        $map: (
          width: 80px,
        )
      );
    }
  }

  @include element('categories') {
    flex-wrap: wrap;
  }

  @include element('primary') {
    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        font-size: rem(20px),
      )
    );
  }
}
</style>
