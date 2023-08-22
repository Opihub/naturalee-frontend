<template>
  <section :class="`${CSS_NAME}`">
    <SiteContainer :class="`${CSS_NAME}__container`">
      <BreadCrumb v-if="breadcrumb.length" :menu="breadcrumb" />

      <SearchForm :class="`${CSS_NAME}__search`" size="mini" placeholder="Di cosa hai bisogno?" />
    </SiteContainer>
  </section>
</template>

<script setup>
const CSS_NAME = 'c-bottom-bar'

defineProps({
  breadcrumb: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss">
$prefix: 'bottom-bar';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: rem(8px),
      font-size: 14px,
      line-height: 18px,
      background-color: get-var(color-green),
    )
  );

  display: flex;
  flex-wrap: wrap;
  background-color: get-var(background-color, $prefix: $prefix);
  padding: get-var(padding, $prefix: $prefix) 0;
  position: relative;

  @include element('search') {
    margin-left: auto;
    width: 100%;
    max-width: get-var(search-width, rem(495px), $prefix: $prefix);
  }

  @include element('container') {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(8px);
  }
}
</style>
