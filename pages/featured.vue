<template>
  <main>
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
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'featured',
})

defineI18nRoute({
  paths: {
    it: '/featured',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data
const { page } = await usePage('featured')

// Watcher

// Computed

// Methods
</script>
