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
      <BaseHeading
        class="u-mb-medium u-text-center u-text-left@tablet"
        tag="h5"
        >{{ $t('products.related') }}</BaseHeading
      >

      <ProductCards
        v-if="!pending && related.data && related.data.length"
        :products="related.data"
        :trackable="{
          id: `related_${route.fullPath}`,
          name: `Correlati ${page.title}`,
        }"
      />
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'product-child',
})

// Data
const route = useRoute()
const { page } = await usePage(
  route.params.variation,
  `shop/categories/${route.params.category}/products/${route.params.product}`
)
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

const { pending, data: related, refresh } = await useApi(
  `shop/categories/${route.params.category}/products/${route.params.product}/${route.params.variation}/related`,
  {
    expiration_hours:6
  }
)


if (!related.value) {
  console.log("qui related");
    await refresh()
  }

// Component life-cycle hooks
onMounted(() => {
  trackEcommerceEvent('view_item', page?.value)
})
</script>

<style lang="scss" scoped>
main img {
  width: 100%;
}
</style>
