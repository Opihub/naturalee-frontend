<template>
  <InlineMenu
    :class="CSS_NAME"
    :menu="categories"
    :item-class="`${CSS_NAME}__item`"
    gap="large"
    color="dark"
    hover-color="green"
  />
</template>

<script setup>
const CSS_NAME = 'c-categories-menu'

defineProps({
  categories: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss">
$prefix: 'categories-menu';
@include component($prefix) {
  text-transform: uppercase;
  justify-content: center;

  @include set-vars(
    $prefix: 'menu',
    $map: (
      font-size: rem(15px),
      line-height: rem(19px),
    )
  );

  @include set-local-vars(
    $prefix: 'menu-item',
    $map: (
      height: 100%,
      padding: rem(18px) rem(16px),
    )
  );

  @include element('item') {
    height: 100%;
  }
}
</style>
