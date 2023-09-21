<template>
  <section :class="CSS_NAME">
    <ProductsFilters
      v-if="sortable || filters.length"
      class="u-mb-huge"
      :filters="filters"
      :sortable="sortable"
      :orderby="orderby"
      :order-options="orderOptions"
      :chosen-filters="chosenFilters"
      @order:change="changeOrder"
      @filter:change="toggleFilter"
      @filter:clear="clearFilters"
    />

    <SiteContainer>
      <div v-if="products.length" class="o-row">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="o-row__column"
        />
      </div>

      <BaseMessage v-else-if="!canFetch">{{ noProductsMessage }}</BaseMessage>

      <span v-if="showLoader" ref="loader" :class="`${CSS_NAME}__loader`">{{
        $t('common.loading')
      }}</span>
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports
import { useElementVisibility, useTimeoutFn } from '@vueuse/core'

// Constants
const CSS_NAME = 'c-products-grid'
const DEFAULT_LIMIT = 12

// Define (Props, Emits, Page Meta)
const props = defineProps({
  filters: {
    type: Array,
    default() {
      return []
    },
  },
  search: {
    type: String,
    default: null,
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  orderOptions: {
    type: Object,
    default() {
      const { t } = useI18n()

      return {
        asc: t('asc'),
        desc: t('desc'),
      }
    },
  },
  from: {
    type: String,
    default: null,
  },
  use: {
    type: Array,
    default() {
      return []
    },
  },
})

// Component life-cycle hooks

// Composables
const timeout = useTimeoutFn(() => {
  resetParams()

  fetchProducts()
}, 300)

const route = useRoute()
const router = useRouter()

// Data
const products = ref([])
const page = ref(0)
const canFetch = ref(true)
const isFetching = ref(false)

const loader = ref(null)
const loaderIsVisible = useElementVisibility(loader)

const noProductsMessage = ref('Nessun prodotto trovato')

const chosenFilters = ref(
  route.query['filters[]'] ? route.query['filters[]'] : []
)

const orderby = ref(route.query.sort || null)

// Watcher
const stopLazyLoad = watch(loaderIsVisible, (newValue) => {
  if (newValue) {
    fetchProducts()
  }
})

watch(
  () => props.search,
  (current, old) => {
    timeout.stop()

    if (current !== old) {
      timeout.start()
    }
  }
)

// Computed
const showLoader = computed(() => {
  if (isFetching.value) {
    return true
  }

  if (props.use && props.use.length) {
    return products.value.length < props.use.length
  }

  return canFetch.value
})

// Methods
const resetParams = () => {
  page.value = 0
  products.value = []
  canFetch.value = true
}

const clearFilters = () => {
  resetParams()

  chosenFilters.value = []

  fetchProducts()
}

const toggleFilter = (filter) => {
  const index = chosenFilters.value.indexOf(filter)

  if (index > -1) {
    chosenFilters.value = chosenFilters.value.filter(
      (current) => current !== filter
    )
  } else {
    chosenFilters.value.push(filter)
  }

  resetParams()

  fetchProducts()
}

const changeOrder = (order) => {
  orderby.value = order

  resetParams()

  fetchProducts()
}

const fetchProducts = async () => {
  updateQuery()

  if (!props.from) {
    if (!props.use) {
      noProductsMessage.value =
        'È avvenuto un errore durante il caricamento dei prodotti. Ci scusiamo per il disagio'
      return
    }

    let last = false
    const records = props.use.slice(
      page.value * DEFAULT_LIMIT,
      (page.value + 1) * DEFAULT_LIMIT
    )

    page.value += 1

    products.value = [...products.value, ...records]

    if (records.length < DEFAULT_LIMIT) {
      last = true
    }

    if (last) {
      stopLazyLoad()
    }

    return
  }

  if (!canFetch.value) {
    return
  }

  if (isFetching.value) {
    return
  }

  isFetching.value = true

  try {
    const params = {
      limit: DEFAULT_LIMIT,
    }

    if (page.value > 0) {
      params.page = page.value
    }

    if (orderby.value) {
      params.orderby = orderby.value
    }

    if (props.search) {
      params.search = props.search
    }

    if (chosenFilters.value.length > 0) {
      params['filters[]'] = chosenFilters.value
    }

    const response = await useApi(props.from, {
      method: 'GET',
      params,
    })

    if (response.value.success) {
      const { pagination, records } = response.value.data

      products.value = [...products.value, ...records]
      page.value = pagination?.next || page.value

      if (!pagination.next) {
        canFetch.value = false
        stopLazyLoad()
      }
    } else {
      canFetch.value = false
      noProductsMessage.value =
        response.value.code === 'category_products_not_found'
          ? 'Nessun prodotto trovato per la categoria corrente.'
          : response.value.message
    }
  } catch (error) {
    console.error(error)
    canFetch.value = false
    noProductsMessage.value =
      'È avvenuto un errore durante il caricamento dei prodotti. Ci scusiamo per il disagio'
  } finally {
    isFetching.value = false
  }
}

const updateQuery = () => {
  router.push({
    query: { sort: orderby.value, 'filters[]': chosenFilters.value },
  })
}

// On created
await fetchProducts()
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
