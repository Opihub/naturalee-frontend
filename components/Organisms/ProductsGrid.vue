<template>
  <section :class="className">
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
          :type="listType"
          :wishlist="isGrid"
          :details="isGrid"
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
  paginate: {
    type: Boolean,
    default: false,
  },
  listType: {
    type: String,
    default: 'grid',
    validator(value) {
      return ['grid', 'list'].includes(value)
    },
  },
  orderOptions: {
    type: Object,
    default() {
      const { t } = useI18n()
      return {
        asc: {
          label: t('asc'),
          value: 'price-asc',
        },
        desc: {
          label: t('desc'),
          value: 'price-desc',
        },
      }
    },
  },
  from: {
    type: String,
    default: null,
  },
  cached: {
    type: Boolean,
    default: true,
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
const isGrid = computed(() => {
  return props.listType === 'grid'
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.listType === 'list') {
    className.push(`${CSS_NAME}--list`)
  }

  return className
})

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
  if (!Array.isArray(chosenFilters.value)) {
    chosenFilters.value = chosenFilters.value.split(' ')
  }

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
        'Ops! Si è verificato un errore... Ricarica la pagina'
      return
    }

    let last = false
    if (props.paginate) {
      const records = props.use.slice(
        page.value * DEFAULT_LIMIT,
        (page.value + 1) * DEFAULT_LIMIT
      )

      page.value += 1

      products.value = [...products.value, ...records]

      if (records.length < DEFAULT_LIMIT) {
        last = true
      }
    } else {
      products.value = props.use
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

  try {
    const params = {}

    if (props.paginate) {
      params.limit = DEFAULT_LIMIT

      if (page.value > 0) {
        params.page = page.value
      }
    }

    if (props.search) {
      params.search = props.search
    }

    if (orderby.value) {
      params.orderby = orderby.value
    }

    if (chosenFilters.value.length > 0) {
      params['filters[]'] = chosenFilters.value
    }

    const response = await useApi(
      props.from,
      {
        method: 'GET',
        params,
      },
      {
        cache: props.cached,
      }
    )

    if (response.value.success) {
      if (!props.paginate) {
        const records = response.value.data
        products.value = records

        canFetch.value = false
        stopLazyLoad()
        return
      }

      const { pagination, records } = response.value.data

      products.value = [...products.value, ...records]
      page.value = pagination?.next || page.value

      if (!pagination.next) {
        canFetch.value = false
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
      'Ops! Si è verificato un errore... Ricarica la pagina'
  } finally {
    isFetching.value = false
  }
}

const updateQuery = () => {
  const query = {}

  if (props.search) {
    query.search = props.search
  }

  if (orderby.value) {
    query.sort = orderby.value
  }

  if (chosenFilters.value && chosenFilters.value.length > 0) {
    query['filters[]'] = chosenFilters.value
  }

  router.push({ query })
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

  @include modifier('list') {
    @include component('product-card') {
      @include from(tablet) {
        @include set-local-vars(
          $prefix: 'product-card',
          $map: (
            padding: rem(15px) 0,
          )
        );
      }
      @include set-local-vars(
        $prefix: 'row',
        $map: (
          columns: 1,
        )
      );
      @include element('thumbnail') {
        @include from(tablet) {
          padding: 0;
        }
        @include from(large) {
          padding: rem(10px);
        }
      }
      @include element('buy') {
        @include until(desktop) {
          padding-bottom: rem(30px);
          @include set-local-vars(
            $prefix: 'counter',
            $map: (
              margin: 0,
            )
          );
        }
      }
    }
  }
}
</style>
