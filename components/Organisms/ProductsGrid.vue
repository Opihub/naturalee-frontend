<template>
  <SiteContainer :class="CSS_NAME">
    <div
      v-if="sortable || filters.length"
      :class="`${CSS_NAME}__toolbar`"
      class="u-mb-huge"
    >
      <ul v-if="filters.length" :class="`${CSS_NAME}__filter`">
        <li v-for="filter in filters" :key="filter.slug">
          <BaseButton
            color="transparent"
            scope="filter"
            :class="{ 'is-active': chosenFilters.includes(filter.slug) }"
            @click="toggleFilter(filter.slug)"
            >{{ filter.text }}</BaseButton
          >
        </li>
      </ul>

      <div v-if="sortable && orderOptions" :class="`${CSS_NAME}__action`">
        <BaseButton
          ref="orderButton"
          color="transparent"
          scope="filter"
          svg="arrow-group"
          :class="{
            [`${CSS_NAME}__order`]: true,
            'is-active': orderby !== null,
          }"
          :text="orderByText"
          :svg-size="[9.14, 12.15]"
          @click="toggleDropdown()"
        />
        <OnClickOutside
          :options="{ ignore: [orderButton] }"
          @trigger="toggleDropdown(false)"
        >
          <Transition name="fade">
            <PopupContainer
              v-show="isOrderDropdownOpen"
              :class="`${CSS_NAME}__dropdown`"
            >
              <ul :class="`${CSS_NAME}__sorts`">
                <li
                  :class="{
                    [`${CSS_NAME}__sorts__item`]: true,
                    'is-active': orderby === null,
                  }"
                  @click="changeOrder(null)"
                >
                  Ordina per...
                </li>
                <li
                  v-for="(name, key) in orderOptions"
                  :key="key"
                  :class="{
                    [`${CSS_NAME}__sorts__item`]: true,
                    'is-active': orderby === key,
                  }"
                  @click="changeOrder(key)"
                >
                  {{ name }}
                </li>
              </ul>
            </PopupContainer>
          </Transition>
        </OnClickOutside>
      </div>
    </div>

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
import { OnClickOutside } from '@vueuse/components'

// Constants
const CSS_NAME = 'c-products-grid'

// Props & Emits
const props = defineProps({
  filters: {
    type: Array,
    default() {
      return []
    },
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  orderOptions: {
    type: Object,
    default() {
      return {
        asc: 'Prezzo crescente',
        desc: 'Prezzo decrescente',
      }
    },
  },
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
const loaderIsVisible = useElementVisibility(loader)
const noProductsMessage = ref('Nessun prodotto trovato')

const chosenFilters = ref([])

const orderby = ref(null)
const orderButton = ref(null)
const isOrderDropdownOpen = ref(false)

// Watcher
const stopLazyLoad = watch(loaderIsVisible, (newValue) => {
  if (newValue) {
    fetchProducts()
  }
})

// Computed
const orderByText = computed(() => {
  return props.orderOptions[orderby.value] || 'Ordina per...'
})

// Methods
const toggleFilter = (filter) => {
  const index = chosenFilters.value.indexOf(filter)

  if (index > -1) {
    delete chosenFilters.value[index]
  } else {
    chosenFilters.value.push(filter)
  }

  products.value = []
  canFetch.value = true

  fetchProducts()
}

const changeOrder = (order) => {
  orderby.value = order

  toggleDropdown(false)

  products.value = []
  canFetch.value = true

  fetchProducts()
}

const toggleDropdown = (status = null) => {
  isOrderDropdownOpen.value =
    status === null ? !isOrderDropdownOpen.value : status
}

const fetchProducts = async () => {
  if (!canFetch.value) {
    return
  }

  if (isFetching.value) {
    return
  }

  isFetching.value = true

  try {
    const response = await useApi(props.from, {
      method: 'GET',
      params: {
        page,
        limit: 12,
        orderby,
        'filters[]': chosenFilters.value.filter((filter) => filter),
      },
    })

    if (response.success) {
      const { pagination, records } = response.data

      products.value = [...products.value, ...records]
      page.value = pagination?.next || page.value
      canFetch.value = pagination.last !== true

      if (pagination.last) {
        stopLazyLoad()
      }
    } else {
      canFetch.value = false
      noProductsMessage.value = response.message
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

  @include element('toolbar') {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: flex-start;
    gap: rem(20px);
  }

  @include element('filter') {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: rem(10px) rem(20px);
    padding: 0;
    margin: 0;
  }

  @include element('order') {
    min-width: get-var(inner-width, rem(200px), $prefix: 'button');
    white-space: nowrap;

    @include set-local-vars(
      $prefix: 'button',
      $map: (
        padding: rem(12px) rem(20px),
        text-transform: none,
      )
    );
  }

  @include element('action') {
    position: relative;
  }

  @include element('dropdown') {
    position: absolute;
    inset: 100% 0 auto;
    z-index: 10;
  }

  @include element('sorts') {
    list-style: none;
    padding: 0;
    margin: 0;

    @include element('item') {
      cursor: pointer;
      padding: rem(14px) rem(20px);
      border-bottom: 1px solid rgba(get-var(rgb-green), 0.45);

      &:last-child {
        border-bottom: 0;
      }
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
}
</style>
