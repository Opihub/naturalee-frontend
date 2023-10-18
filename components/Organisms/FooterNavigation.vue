<template>
  <SiteContainer :class="CSS_NAME">
    <div :class="`${CSS_NAME}__links`">
      <SiteLogo :alt="true" />
      <InlineMenu v-if="socialsMenu" :menu="socialsMenu" svg-size="24px" gap="mini" />
    </div>

    <InlineMenu v-if="menu" :menu="menu" :class="`${CSS_NAME}__menu`" />

    <NuxtImg :class="`${CSS_NAME}__payment`" src="/pagamenti-sicuri.png" />
  </SiteContainer>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-footer-navigation'

// Define (Props, Emits, Page Meta)
defineProps({
  socialsMenu: {
    type: Array,
    default() {
      return []
    },
  },
  menu: {
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
</script>

<style lang="scss">
$prefix: 'footer-navigation';
@include component($prefix) {
  display: flex;
  flex-direction: column;
  gap: rem(30px);

  @include until(tablet) {
    @include set-local-vars(
      $prefix: 'logo',
      $map: (
        width: get-var(max-image-width, $prefix: $prefix),
        height: 42.5px,
      )
    );
  }

  @include from(tablet) {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    align-items: center;
    gap: rem(8px);

    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        font-size: 18px,
        line-height: 23px,
      )
    );
  }

  @include from(desktop) {
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto;
    justify-content: space-between;
  }

  @include element('links') {
    grid-column: 1 / 2;
    display: flex;
    align-items: center;
    gap: rem(30px);
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    justify-self: start;

    svg {
      fill: currentColor;

      @include set-local-vars(
        $prefix: 'link-svg',
        $map: (
          width: auto,
          height: rem(24px),
        )
      );
    }

    @include from(desktop) {
      flex-direction: row;
      align-items: baseline;
    }

    @include between(tablet, desktop) {
      grid-row: 1 / 3;
      grid-column: 1 / 2;
    }
  }

  @include element('menu') {
    grid-column: 2 / 3;
    list-style: none;
    padding: 0;
    text-align: center;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        width: 100%,
        padding: rem(10px),
      )
    );

    @include until(tablet) {
      @include set-local-vars(
        $prefix: 'menu',
        $map: (
          gap: 0,
        )
      );
    }

    @include from(tablet) {
      flex-direction: row;
    }

    @include between(tablet, desktop) {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      justify-self: end;
    }
  }

  @include element('payment') {
    justify-self: end;
    grid-column: 3 / 4;
    margin: 0 auto;
    max-width: get-var(max-image-width, $prefix: $prefix);
    flex-wrap: wrap;
    justify-content: center;

    @include from(tablet) {
      margin: 0;
      max-width: 100%;
    }

    @include between(tablet, desktop) {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
  }
}
</style>
