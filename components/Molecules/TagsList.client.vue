<template>
  <dl :class="CSS_NAME">
    <dt v-if="title" :class="`${CSS_NAME}__title`">{{ title }}</dt>
    <dd :class="`${CSS_NAME}__list`">
      <BaseButton
        v-for="item in list"
        :key="item[itemKey]"
        as="link"
        color="transparent"
        :to="resolveLink(item)"
        >{{ item[itemValue] }}</BaseButton
      >
    </dd>
  </dl>
</template>

<script setup>
// Constants
const CSS_NAME = 'c-tags'

// Define (Props, Emits, Page Meta)
defineProps({
  list: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: null,
  },
  itemKey: {
    type: String,
    default: 'id',
  },
  itemValue: {
    type: String,
    default: 'name',
  },
  resolveLink: {
    type: Function,
    required: true,
  },
})
</script>

<style lang="scss">
$prefix: 'tags';
@include component($prefix) {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  gap: rem(20px);

  @include element('title') {
    flex: 0 0 auto;
  }

  @include element('list') {
    flex: 1 1 100%;
    display: flex;
    flex-wrap: wrap;
    gap: rem(10px) rem(15px);

    @include set-local-vars(
      $prefix: 'button',
      $map: (
        padding: rem(8px) rem(12px),
        font-weight: get-var(weight-regular),
      )
    );
  }
}
</style>
