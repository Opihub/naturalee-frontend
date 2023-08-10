<template>
  <ol :class="CSS_NAME" itemscope itemtype="https://schema.org/BreadcrumbList">
    <template v-for="(record, index) in menu" :key="record.id">
      <li
        class="c-breadcrumb__item"
        itemscope
        itemprop="itemListElement"
        itemtype="https://schema.org/ListItem"
      >
        <BaseLink
          v-if="menu.length - 1 !== index"
          itemprop="item"
          :to="record.url"
          :target="record.target"
          color="white"
        >
          <span itemprop="name">{{ record.title }}</span>
        </BaseLink>
        <span v-else itemprop="name">{{ record.title }}</span>

        <meta itemprop="position" :content="index + 1" />
      </li>
      <li v-if="menu.length - 1 !== index" class="c-breadcrumb__separator">
        {{ separator }}
      </li>
    </template>
  </ol>
</template>

<script setup>
const CSS_NAME = 'c-breadcrumb'

defineProps({
  menu: {
    type: Array,
    default() {
      return []
    },
  },
  separator: {
    type: String,
    default: '/',
  },
})
</script>

<style lang="scss">
@include component('breadcrumb') {
  $prefix: breadcrumb;

  @include set-vars(
    $prefix: $prefix,
    $map: (
      text-color: get-var(color-white),
      gap: rem(4px),
    )
  );

  list-style: none;
  display: flex;
  align-items: baseline;
  gap: #{get-var(gap, $prefix: $prefix)};
  padding: 0;
  margin: 0;
  color: #{get-var(text-color, $prefix: $prefix)};
  @include typography(14px, 18px);
  @include font-weight(regular);

  @include element(separator) {
    user-select: none;
  }
}
</style>
