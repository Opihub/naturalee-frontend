<template>
  <section>
    <Suspense>
      <ProductsGrid
        class="u-pb-huge u-pt-none u-pt-medium@desktop"
        :from="`shop/orders/${$route.params.id}/products`"
        list-type="list"
        :cached="false"
      />
    </Suspense>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'order-products'
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>
