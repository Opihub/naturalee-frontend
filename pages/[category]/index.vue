<template>
  <section>
    <HeaderBottomBar color="light" />

    <SiteTeaser
      :breadcrumb="page.breadcrumbs"
      :title="page.title"
      :image="page.image"
    />

    <ProductsGrid
      class="u-pb-huge u-pt-none u-pt-medium@desktop"
      :from="`shop/categories/${$route.params.category}/products`"
      :filters="page.filters"
      paginate
      sortable
      :trackable="`Categoria ${route.params.category}`"
    />
  </section>
</template>

<script setup>
// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'category',
})

// Data
const route = useRoute()

if (!isCategory(route.params.category)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Pagina non trovata',
  })
}

const { page } = await usePage(route.params.category, 'shop/categories')

if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}
</script>
