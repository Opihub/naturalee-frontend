<template>
  <main>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <SiteTeaser
      :breadcrumb="page.breadcrumbs"
      :title="page.title"
      :image="page.image"
    />

    <Suspense>
      <ProductsGrid
        class="u-pb-huge u-pt-medium"
        :from="`shop/featured/products`"
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
const { page } = await usePage('featured')

// Watcher

// Computed

// Methods
</script>
