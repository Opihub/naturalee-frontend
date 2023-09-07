<template>
  <CompleteLayout>
    <slot />

    <section class="u-pt-huge" style="background-color: var(--color-white)">
      <CategoryCards
        v-if="categories && categories.data"
        class="u-pb-huge"
        :title="categoriesTitle"
        :categories="categories.data"
      />

      <MarqueeSlider
        v-if="marquee && marquee.data.length"
        :marquee="marquee.data"
      />
    </section>
  </CompleteLayout>
</template>

<script setup>
// Imports
import CompleteLayout from '@/layouts/standard'

// Constants

// Define (Props, Emits, Page Meta)
defineProps({
  categoriesTitle: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks

// Composables
const categories = await useApi('shop/categories').catch((error) => {
  console.error('Errore durante il caricamento di "shop/categories"', error)
})

const marquee = await useApi('layout/marquee').catch((error) => {
  console.error('Errore durante il caricamento di "layout/marquee"', error)
})

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'layout';
@include object($prefix) {
  margin-bottom: get-var(bottom-gap, 0, $prefix: $prefix);

  @include element('categories') {
    position: fixed;
    inset: auto 0 0;
    z-index: 20;
    background-color: get-var(color-white);

    justify-content: space-around;
    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        gap: 0,
        font-size: rem(13px),
        line-height: rem(16px),
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        padding: rem(18px) 0,
      )
    );

    @include from(desktop) {
      display: none;
    }
  }
}
</style>
