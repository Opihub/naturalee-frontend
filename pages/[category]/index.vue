<template>
  <section>
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
  </section>
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
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

// Watcher

// Computed

// Methods
</script>
