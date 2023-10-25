<template>
  <CompleteLayout override-last-element>
    <slot />

    <BackgroundHolder class="u-pt-huge u-mt-auto" color="white" :class="{'u-pb-medium': marquee && marquee.data.length}">
      <CategoryCards
        v-if="categories && categories.data"
        :title="$t('products.homepageFeatured')"
        :categories="categories.data"
        class="u-mb-medium"
      />

      <MarqueeSlider
        v-if="marquee && marquee.data.length"
        :marquee="marquee.data"
      />
    </BackgroundHolder>
  </CompleteLayout>
</template>

<script setup>
// Imports
import CompleteLayout from '@/layouts/standard'

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const categories = await useApi('shop/categories', {}, { local: true }).catch(
  (error) => {
    console.error('Errore durante il caricamento di "shop/categories"', error)
  }
)

const marquee = await useApi('layout/marquee', {}, { local: true }).catch(
  (error) => {
    console.error('Errore durante il caricamento di "layout/marquee"', error)
  }
)

// Data

// Watcher

// Computed

// Methods
</script>
