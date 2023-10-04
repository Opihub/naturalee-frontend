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
        :search="search"
      />
    </Suspense>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Data
const route = useRoute()
const router = useRouter()
const search = ref(route.query.search ? route.query.search : '')

// Watcher
watch(search, (search) => {
  router.push({
    path: '/search',
    query: { search },
  })
})

// Computed
const title = computed(() => {
  return `Hai cercato: ${search.value}`
})

const breadcrumbs = computed(() => {
  return [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: title.value,
    },
  ]
})

// Methods
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
