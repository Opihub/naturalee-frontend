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
      class="u-pb-huge u-pt-medium"
        :from="`shop/categories/${$route.params.category}/products`"
        :filters="page.filters"
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
  validate: async (route) => {
    return isCategory(route.params.category)
  },
})

// Component life-cycle hooks

// Data
const route = useRoute()
const { page } = await usePage(route.params.category, 'shop/categories')

// Watcher

// Computed

// Methods
</script>
