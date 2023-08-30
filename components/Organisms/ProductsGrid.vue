<template>
  <SiteContainer :class="CSS_NAME">
    <div v-if="products.length" class="o-row">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="o-row__column"
      />
    </div>

    <BaseMessage v-else-if="!canFetch">{{ noProductsMessage }}</BaseMessage>

    <span
      v-if="canFetch && products.length"
      ref="loader"
      :class="`${CSS_NAME}__loader`"
      >Caricamento</span
    >
    <!-- <BaseButton
      v-if="canFetch && products.length"
      :disabled="isFetching"
      @click="fetchProducts"
      >Carica altri prodotti</BaseButton
    > -->
  </SiteContainer>
</template>

<script setup>
// Imports
import { useElementVisibility } from '@vueuse/core'

// Constants
const CSS_NAME = 'c-products-grid'

// Props & Emits
const props = defineProps({
  from: {
    type: String,
    required: true,
  },
})

// Component life-cycle hooks
onMounted(() => {
  fetchProducts()
})

// Data
const products = ref([])
const page = ref(0)
const canFetch = ref(true)
const isFetching = ref(false)
const loader = ref(null)
const noProductsMessage = ref('Nessun prodotto trovato')
const loaderIsVisible = useElementVisibility(loader)

// Watcher
const stopLazyLoad = watch(loaderIsVisible, (newValue) => {
  if (newValue) {
    fetchProducts()
  }
})

// Methods
const fetchProducts = async () => {
  if (!canFetch.value) {
    return
  }

  if (isFetching.value) {
    return
  }

  isFetching.value = true

  const response = await useApi(props.from, {
    method: 'GET',
    params: {
      page,
      limit: 12,
    },
  })

  const { pagination, records } = response.data

  isFetching.value = false

  if (response.success) {
    products.value = [...products.value, ...records]
    page.value = pagination?.next || page.value
    canFetch.value = pagination.last !== true

    if (pagination.last) {
      stopLazyLoad()
    }

    return
  }

  canFetch.value = false
  noProductsMessage.value = response.message
}
</script>

<style lang="scss">
$prefix: 'products-grid';
@include component($prefix) {
  @include object('row') {
    & + * {
      margin-top: rem(30px);
    }
  }

  @include object('button') {
    margin-left: auto;
    margin-right: auto;
  }

  @include element('loader') {
    width: 100%;
    text-align: center;
    display: block;
    opacity: 0.4;
    @include typography(14px, 18px);
    font-weight: get-var(weight-regular);
  }

  @include from(tablet) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 3,
      )
    );
  }

  @include from(full) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 4,
      )
    );
  }
}
</style>
