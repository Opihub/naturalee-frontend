<template>
  <main class="s-search">
    <HeaderBottomBar v-model:search="search" :breadcrumb="breadcrumbs" />

    <SiteContainer class="u-pt-large u-pb-large">
      <BaseHeading tag="h1" use="h4" :text="title" />
    </SiteContainer>

    <Suspense>
      <ProductsGrid
        class="u-pb-huge u-pt-none"
        from="shop/search/products"
        :search="$route.query?.search || ''"
        paginate
      />
    </Suspense>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'search',
})

defineI18nRoute({
  paths: {
    it: '/cerca',
  },
  locales: ['it'],
})

// Data & Composables
const config = useRuntimeConfig()
const route = useRoute()
const search = ref(route.query.search ? route.query.search : '')

// Watcher

// Computed
const title = computed(() => {
  if (route.query.search) {
    return `Hai cercato: ${route.query.search}`
  }

  return 'Scrivi almeno tre caratteri per avviare la ricerca'
})

const breadcrumbTitle = computed(() => {
  let title = 'Ricerca nei prodotti'
  if (route.query.search) {
    title = `Hai cercato: ${route.query.search}`
  }

  return title
})

const seoTitle = computed(() => {
  let title = breadcrumbTitle.value

  if (config.public.title) {
    title += ` ${config.public.seoSeparator || '|'} ${config.public.title}`
  }

  return title
})

const breadcrumbs = computed(() => {
  return [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: breadcrumbTitle.value,
    },
  ]
})

// Methods

// Component life-cycle hooks
usePageSeo({
  title: seoTitle
})
</script>

<style lang="scss">
@include scope('search') {
  @include object('heading') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        text-color: get-var(color-black),
      )
    );
  }
}
</style>
