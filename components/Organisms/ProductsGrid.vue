<template>
  <section :class="CSS_NAME">
    <ClientOnly>
      <ResponsiveTrigger
        :is="SiteContainer"
        v-if="sortable || filters.length"
        :size="992"
      >
        <div :class="`${CSS_NAME}__toolbar`" class="u-mb-huge">
          <div
            v-if="filters.length"
            :class="[CSS_NAME_ACTION, `${CSS_NAME_ACTION}--filter`]"
          >
            <button
              :class="`${CSS_NAME_ACTION}__trigger`"
              type="button"
              @click="toggleOverlay(true)"
            >
              {{ $t('filter') }}
            </button>

            <Transition name="fade">
              <KeepAlive>
                <ResponsiveTrigger
                  :is="BaseOverlay"
                  v-show="isFilterOverlayOpen"
                  :size="992"
                  desktop-first
                  :class="CSS_NAME_OVERLAY"
                >
                  <template #before>
                    <div :class="`${CSS_NAME_OVERLAY}__header`">
                      <span>{{ selectedFiltersMessage }}</span>
                      <u @click="clearFilters">{{ $t('clearFilters') }}</u>
                    </div>
                  </template>

                  <ul :class="`${CSS_NAME}__filter`">
                    <li
                      v-for="filter in filters"
                      :key="filter.slug"
                      :class="`${CSS_NAME}__filter__item`"
                    >
                      <BaseButton
                        color="transparent"
                        scope="filter"
                        :class="{
                          'is-active': chosenFilters.includes(filter.slug),
                        }"
                        @click="toggleFilter(filter.slug)"
                        >{{ filter.text }}</BaseButton
                      >
                    </li>
                  </ul>

                  <template #after>
                    <div :class="`${CSS_NAME_OVERLAY}__footer`">
                      <BaseButton
                        color="transparent"
                        scope="filter"
                        @click="toggleOverlay(false)"
                        >{{ $t('apply') }}
                      </BaseButton>
                    </div>
                  </template>
                </ResponsiveTrigger>
              </KeepAlive>
            </Transition>
          </div>

          <div v-if="sortable && orderOptions" :class="CSS_NAME_ACTION">
            <button
              :class="[
                `${CSS_NAME_ACTION}__trigger`,
                `${CSS_NAME_ACTION}__trigger--intent`,
              ]"
              type="button"
            >
              Ordina
              <Suspense>
                <NuxtIcon name="caret" />
              </Suspense>
            </button>
            <select
              :value="orderby"
              :class="{
                [`${CSS_NAME_ACTION}__trigger`]: true,
                [`${CSS_NAME_ACTION}__trigger--select`]: true,
                'is-active': orderby !== null,
              }"
              @change="changeOrder($event.target.value)"
            >
              <option value="">Ordina per...</option>
              <option
                v-for="(name, key) in orderOptions"
                :key="key"
                :value="key"
              >
                {{ name }}
              </option>
            </select>
          </div>
        </div>
      </ResponsiveTrigger>
    </ClientOnly>

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

      <span v-if="showLoader" ref="loader" :class="`${CSS_NAME}__loader`"
        >Caricamento</span
      >
      <!-- <BaseButton
        v-if="canFetch && products.length"
        :disabled="isFetching"
        @click="fetchProducts"
        >Carica altri prodotti</BaseButton
      > -->
    </SiteContainer>
  </section>
</template>

<script setup>
// Imports
import BaseOverlay from '@/components/Atoms/BaseOverlay.vue'
import SiteContainer from '@/components/Atoms/SiteContainer.vue'
import { useElementVisibility, useTimeoutFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// Constants
const CSS_NAME = 'c-products-grid'
const CSS_NAME_OVERLAY = `${CSS_NAME}__overlay`
const CSS_NAME_ACTION = `${CSS_NAME}__action`
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
const isFilterOverlayOpen = ref(false)
const selectedFiltersMessage = ref('Nessun filtro selezionato')

const orderby = ref(route.query.sort || null)

// Watcher
watch(orderby, () => {
  updateQuery()
})
watch(
  () => chosenFilters.value,
  () => {
    updateQuery()
  },
  { deep: true }
)

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

  if (props.use) {
    return products.value.length < props.use.length
  }

  return false
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

  changeFiltersMessage()

  fetchProducts()
}

const changeFiltersMessage = () => {
  if (chosenFilters.value.length === 0) {
    selectedFiltersMessage.value = 'Nessun filtro selezionato'
  } else if (chosenFilters.value.length === 1) {
    selectedFiltersMessage.value = '1 filtro selezionato'
  } else {
    selectedFiltersMessage.value = `${chosenFilters.value.length} filtri selezionati`
  }
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

  changeFiltersMessage()

  resetParams()

  fetchProducts()
}

const changeOrder = (order) => {
  orderby.value = order

  resetParams()

  fetchProducts()
}

const toggleOverlay = (status = null) => {
  isFilterOverlayOpen.value =
    status === null ? !isFilterOverlayOpen.value : status
}

const fetchProducts = async () => {
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
      canFetch.value = pagination.last !== true

      if (pagination.last) {
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

  @include element('toolbar') {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: rem(20px);
    background-color: get-var(color-white);
    padding: 0 get-var(padding, $prefix: 'container');
    @include typography(16px, 20px);

    @include from(desktop) {
      @include typography(14px, 18px);
      padding: 0;
      align-items: flex-start;
      background-color: transparent;
      justify-content: space-between;
      // gap: rem(10px);
    }
  }

  @include element('overlay') {
    padding: rem(20px) 0;

    @include set-local-vars(
      $prefix: 'container',
      $map: (
        direction: column,
        align-items: stretch,
        gap: rem(20px),
        height: 100%,
        justify-content: flex-start,
      )
    );

    @include element('header') {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: nowrap;
    }

    @include element('footer') {
      margin-top: auto;

      @include object('button') {
        width: 100%;
      }
    }
  }

  @include element('filter') {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    flex-direction: column;
    gap: rem(10px) rem(20px);
    padding: 0;
    margin: 0;

    @include from(tablet) {
      flex-direction: row;
      gap: rem(10px);
    }

    @include between(tablet, desktop) {
      justify-content: space-between;
    }

    @include from(desktop) {
      gap: rem(10px);
    }

    @include from(full) {
      gap: rem(10px) rem(20px);
    }

    @include element('item') {
      width: 100%;

      @include between(tablet, desktop) {
        width: calc(50% - 10px);
      }

      @include from(desktop) {
        width: auto;
      }
    }

    @include object('button') {
      width: 100%;

      @include from(desktop) {
        width: auto;
      }
    }
  }

  @include element('action') {
    position: relative;
    flex: 1 1 100%;
    text-align: center;

    & + #{current(&)} {
      border-left: 1px solid get-var(color-dark);

      @include from(desktop) {
        border-left: none;
      }
    }

    @include from(desktop) {
      flex: 0 1 auto;

      &:last-child {
        margin-left: auto;
      }
    }

    @include element('trigger') {
      width: 100%;
      margin: 0;
      border: 0;
      padding: rem(10px) 0;
      cursor: pointer;
      color: get-var(color-dark);
      line-height: inherit;
      font-size: 1em;
      display: inline-block;
      background-color: transparent;
      text-transform: uppercase;
      position: relative;
      font-family: get-var(family-main);
      @include transition(color, background-color);

      .nuxt-icon {
        display: inline-block;
        vertical-align: middle;
        color: get-var(color-yellow);

        svg {
          width: rem(7.84px);
          height: rem(4.48px);
        }
      }

      option {
        text-transform: none;
        color: get-var(color-dark);
        background-color: get-var(color-white);
      }

      @include modifier('intent') {
        pointer-events: none;

        @include from(desktop) {
          display: none;
        }
      }

      @include modifier('select') {
        @include until(desktop) {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
      }

      @include from(desktop) {
        width: auto;
        min-width: get-var(inner-width, rem(200px), $prefix: 'button');
        padding: rem(12px) rem(20px);
        border-radius: get-var(border-circle);
        border: 1px solid get-var(color-dark);
        text-transform: none;

        &:hover {
          color: get-var(color-dark);
          background-color: get-var(color-white);
        }

        @include is('active') {
          color: get-var(color-white);
          background-color: get-var(color-dark);
        }
      }
    }

    @include modifier('filter') {
      position: static;

      @include element('trigger') {
        @include from(desktop) {
          display: none;
        }
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
