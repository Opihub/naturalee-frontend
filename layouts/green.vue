<template>
  <LayoutWrapper color="green">
    <FooterNavigation class="u-pt-large u-pb-huge" />

    <main id="page">
      <slot />
    </main>

    <SiteFooter class="u-mt-auto">
      <FooterCopyrights
        :copyright="layout.copyright"
        :privacy-menu="menu.privacy"
      />
    </SiteFooter>
  </LayoutWrapper>
</template>

<script setup>
// Imports
import { useConfigurationStore } from '@/stores/configuration'

// Constants
const configurationStore = useConfigurationStore()

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const { menu, layout } = storeToRefs(configurationStore)

// Data

// Watcher

// Computed

// Methods
</script>
