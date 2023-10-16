<template>
  <main>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-pb-huge">
      <ProductDetail :product="page" />

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
  validate: async (route) => {
    if (!isCategory(route.params.category)) {
      return false
    }

    const { response } = await usePage(
      route.params.product,
      `shop/categories/${route.params.category}/products`
    )

    return response.value.success
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

console.debug(related.value)

// Watcher

// Computed

// Methods
</script>
