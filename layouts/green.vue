<template>
  <LayoutWrapper color="green">
    <FooterNavigation class="u-pt-large u-pb-huge" />

    <slot />

    <SiteFooter class="u-mt-auto">
      <FooterCopyrights
        :copyright="copyrights.data"
        :privacy-menu="privacyMenu.data"
      />
    </SiteFooter>
  </LayoutWrapper>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const copyrights = await useApi('layout/copyright').catch((error) => {
  console.error('Errore durante il caricamento di "layout/copyright"', error)
})

const privacyMenu = await useApi('menu/privacy').catch((error) => {
  console.error('Errore durante il caricamento di "menu/privacy"', error)
})

// Data

// Watcher

// Computed

// Methods
</script>
