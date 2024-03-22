<template>
  <section>
    <Suspense>
      <ProductsGrid
        class="u-pb-huge u-pt-none"
        :from="`shop/orders/${$route.params.id}/products`"
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
  path: '/il-mio-account/ordini/:id/riordina',
  name: 'order-products',
  key: 'order-products',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/ordini/[id]/riordina',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>
