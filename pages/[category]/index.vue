<template>
  <main>
    <HeaderBottomBar color="light" />

    <SiteTeaser
      :breadcrumb="page.breadcrumbs"
      :title="page.title"
      :image="page.image"
    />

    <Suspense>
      <ProductsGrid
        class="u-pb-huge u-pt-none u-pt-medium@desktop"
        :from="`shop/categories/${$route.params.category}/products`"
        :filters="page.filters"
        paginate
        sortable
      />
    </Suspense>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  middleware: ['category'],
})

// Component life-cycle hooks

// Data
const route = useRoute()
const { page } = await usePage(route.params.category, 'shop/categories')

// Watcher

// Computed

// Methods
</script>
