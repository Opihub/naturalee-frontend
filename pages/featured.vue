<template>
  <section>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteTeaser
      :breadcrumb="page.breadcrumbs"
      :title="page.title"
      :image="page.image"
    />

    <Suspense>
      <ProductsGrid
        class="u-pb-huge u-pt-none u-pt-medium@desktop u-mt-huge u-mt-none@desktop"
        :from="`shop/featured/products`"
        paginate
      />
    </Suspense>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/prodotti-consigliati',
  name: 'featured',
})

defineI18nRoute({
  paths: {
    it: '/prodotti-consigliati',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data
const { page } = await usePage()
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

// Watcher

// Computed

// Methods
</script>
