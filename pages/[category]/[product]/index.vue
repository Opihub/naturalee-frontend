<template>
  <section>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-mb-huge">
      <ProductDetail :product="page" />
    </SiteContainer>

    <template v-if="page?.brand && page.brand === 'MIO ORTO'">
      <NuxtImg class="u-mb-huge" src="home/mioorto-row.png" />
    </template>

    <SiteContainer class="u-pt-huge u-pb-huge">
      <ProductCards
        v-if="related.data && related.data.length"
        :products="related.data"
        :title="$t('products.related')"
      />
    </SiteContainer>
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
const { page } = await usePage(
  route.params.product,
  `shop/categories/${route.params.category}/products`
)

const related = await useApi(
  `shop/categories/${route.params.category}/products/${route.params.product}/related`
)

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
main img {
  width: 100%;
}
</style>
