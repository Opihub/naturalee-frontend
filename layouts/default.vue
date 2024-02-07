<template>
  <CompleteLayout override-last-element>
    <slot />

    <template #after>
      <BackgroundHolder
        class="u-pt-huge u-mt-auto"
        color="white"
        :class="{ 'u-pb-medium': menu.marquee && menu.marquee.length }"
      >
        <CategoryCards
          v-if="shopCategories.length"
          :title="$t('products.categoriesFeatured')"
          :categories="shopCategories"
          class="u-mb-medium"
        />

        <MarqueeSlider
          v-if="layout.marquee && layout.marquee.length"
          :marquee="layout.marquee"
        />
      </BackgroundHolder>
    </template>
  </CompleteLayout>
</template>

<script setup>
// Imports
import CompleteLayout from '@/layouts/standard'
import { useConfigurationStore } from '@/stores/configuration'

// Constants
const configurationStore = useConfigurationStore()

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const { shopCategories, menu, layout } = storeToRefs(configurationStore)

// Data

// Watcher

// Computed

// Methods
</script>
