<template>
  <SiteContainer :class="CSS_NAME">
    <InlineMenu
      :class="`${CSS_NAME}__menu`"
      :menu="copyright"
      color="white"
      gap="mini"
      separator="-"
    >
      <template #before="{ itemClassName }">
        <li :class="itemClassName">&copy;Copyright {{ getYear() }}</li>
      </template>
      <template #after="{ itemClassName }">
        <li :class="itemClassName">
          <BaseLink :to="{ name: 'contacts' }" color="white" underline
            >Company Info</BaseLink
          >
        </li>
      </template>
    </InlineMenu>

    <InlineMenu
      :class="`${CSS_NAME}__menu`"
      :menu="privacyMenu"
      color="white"
      gap="mini"
      separator="-"
    >
      <template #after="{ className }">
        <li :class="className">
          R-innovazione by
          <BaseLink
            to="https://www.opiquad.it/"
            target="_blank"
            color="white"
            underline
            >Opiquad.it</BaseLink
          >
        </li>
      </template>
    </InlineMenu>
  </SiteContainer>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-footer-copyright'

// Define (Props, Emits, Page Meta)
defineProps({
  copyright: {
    type: Array,
    default() {
      return []
    },
  },
  privacyMenu: {
    type: Array,
    default() {
      return []
    },
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
const getYear = () => {
  const current = new Date()
  return current.getFullYear()
}
</script>

<style lang="scss">
$prefix: 'footer-copyright';
@include component($prefix) {
  display: flex;
  flex-direction: column;
  color: get-var(color-white);
  gap: rem(10px);

  @include from(desktop) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: rem(8px);
  }

  @include set-local-vars(
    $prefix: 'menu',
    $map: (
      row-gap: rem(4px),
      font-size: 13px,
      line-height: 16px,
      font-weight: get-var(weight-regular),
    )
  );

  @include element('menu') {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
