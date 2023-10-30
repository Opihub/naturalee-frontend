<template>
  <main>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-mb-huge">
      <ProductDetail :product="page" />
    </SiteContainer>

    <template v-if="page?.brand && page.brand === 'MIO ORTO'">
      <NuxtImg class="u-mb-huge" src="mioorto-row.png" />
    </template>

    <SiteContainer class="u-pt-huge u-pb-huge">
      <ProductCards
        v-if="related.data && related.data.length"
        :products="related.data"
        :title="$t('products.related')"
      />
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  middleware: ['category', 'product'],
})

// Component life-cycle hooks

// Data
const route = useRoute()
const { page } = await usePage(
  route.params.variation,
  `shop/categories/${route.params.category}/products/${route.params.product}`
)

const related = await useApi(
  `shop/categories/${route.params.category}/products/${route.params.product}/${route.params.variation}/related`
)

// Watcher

// Computed

// Methods
</script>
