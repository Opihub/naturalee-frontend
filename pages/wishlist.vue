<template>
  <main>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteTeaser
      :title="page.title"
      :image="page.image"
    />

    <Suspense>
      <ProductsGrid
        class="u-pb-huge u-pt-none u-pt-medium@desktop"
        :use="wishlist"
        paginate
      />
    </Suspense>
  </main>
</template>

<script setup>
// Imports
import { useWishlistStore } from '@/stores/wishlist'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'wishlist',
})

defineI18nRoute({
  paths: {
    it: '/i-miei-preferiti',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const store = useWishlistStore()

// Data
const { page } = await usePage('wishlist')
const { wishlist } = storeToRefs(store)

// Watcher

// Computed

// Methods
</script>
