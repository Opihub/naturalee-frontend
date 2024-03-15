<template>
  <section>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteTeaser :title="page.title" :image="page.image" />

    <Suspense>
      <ProductsGrid
        v-if="wishlist.length > 0"
        class="u-pb-huge u-pt-none u-pt-medium@desktop"
        :use="wishlist"
        paginate
      />
      <SiteContainer v-else class="u-pb-huge u-pt-huge">
        <BaseMessage
          >Non hai ancora aggiunto i tuoi prodotti preferiti</BaseMessage
        >
      </SiteContainer>
    </Suspense>
  </section>
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
const { page } = await usePage()
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

const { wishlist } = storeToRefs(store)

// Watcher

// Computed

// Methods
</script>
