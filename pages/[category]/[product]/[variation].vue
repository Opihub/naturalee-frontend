<template>
  <main>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-pb-huge">
      <ProductDetail :product="page" />

      <BackgroundHolder class="u-pt-huge u-pb-huge" tag="section">
        <ProductCards
          v-if="related.data && related.data.length"
          :products="related.data"
          :title="$t('products.related')"
        />
      </BackgroundHolder>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  validate: async (route) => {
    if (!isCategory(route.params.category)) {
      return false
    }

    const { response } = await usePage(
      route.params.variation,
      `shop/categories/${route.params.category}/products/${route.params.product}`
    )

    return response.value.success
  },
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
