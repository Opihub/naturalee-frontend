import { useCartStore } from '@/stores/cart';
<template>
  <main class="s-cart">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-pb-huge">
      <div class="o-row">
        <template v-if="!isEmpty">
          <SiteContainer :max-width="1060" padless>
            <CartTable />
          </SiteContainer>

          <SiteContainer :max-width="520" padless>
            <CartResume />
          </SiteContainer>
        </template>

        <BaseMessage v-else :message="$t('cart.empty')" />
      </div>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const { page } = await usePage('cart')
const store = useCartStore()

// Data
const { isEmpty } = storeToRefs(store)

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
@include scope('cart') {
}
</style>
