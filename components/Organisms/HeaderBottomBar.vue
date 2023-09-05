<template>
  <section :class="`${CSS_NAME}`">
    <SiteContainer :class="`${CSS_NAME}__container`">
      <BreadCrumb
        v-if="breadcrumb && breadcrumb.length"
        :class="`${CSS_NAME}__breadcrumb`"
        :menu="breadcrumb"
      />

      <SearchForm
        :search="search"
        :class="`${CSS_NAME}__search`"
        size="mini"
        placeholder="Di cosa hai bisogno?"
        @update:search="$emit('update:search', $event)"
      />
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-bottom-bar'

// Props & Emits
defineProps({
  breadcrumb: {
    type: Array,
    default() {
      return []
    },
  },
  search: {
    type: String,
    default: null,
  },
})

defineEmits(['update:search'])

// Component life-cycle hooks

// Data

// Watcher

// Computed

// Methods
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

  @include element('breadcrumb') {
    @include until(tablet) {
      display: none;
    }
  }

  @include element('search') {
    width: 100%;
    max-width: 100%;

    @include from(tablet) {
      margin-left: auto;
      max-width: get-var(search-width, rem(495px), $prefix: $prefix);
    }
  }

  @include element('container') {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(8px);
  }
}
</style>
