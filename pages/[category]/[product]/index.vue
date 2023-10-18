<template>
  <main>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-mb-huge">
      <ProductDetail :product="page" />
    </SiteContainer>

    <template
      v-if="page?.tag && page.tag.find((tag) => tag.slug === 'mioorto')"
    >
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
