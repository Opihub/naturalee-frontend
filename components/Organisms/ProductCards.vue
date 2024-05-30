<template>
  <Splide
    :class="CSS_NAME"
    :options="options"
    :has-track="false"
    :aria-label="title"
  >
    <SplideTrack>
      <SplideSlide
        v-for="product in products"
        :key="product.id"
        :class="`${CSS_NAME}__slide`"
      >
        <ProductCard :class="`${CSS_NAME}__item`" :product="product" />
      </SplideSlide>
    </SplideTrack>

    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <ArrowSVG />
      </button>
      <button class="splide__arrow splide__arrow--next">
        <ArrowSVG />
      </button>
    </div>
  </Splide>
</template>

<script setup>
// Imports
import ArrowSVG from 'assets/svg/arrow.svg'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/vue-splide'

// Constants
const CSS_NAME = 'c-product-cards'

const SPLIDE_OPTIONS = {
  type: 'loop',
  // drag: 'free',
  noDrag: true,
  perPage: 1,
  perMove: 1,
  arrows: true,
  pagination: false,
  gap: 20,
  mediaQuery: 'min',
  breakpoints: {
    0: {
      perPage: 1,
    },
    767.98: {
      perPage: 2,
    },
    991.98: {
      perPage: 3,
      autoWidth: true,
    },
    1998.98: {
      perPage: 4,
      autoWidth: true,
    },
  },
}

// Define (Props, Emits, Page Meta)
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  products: {
    type: Array,
    default() {
      return []
    },
  },
  trackable: {
    type: [String, Object],
    default: null,
    validator(value) {
      if (typeof value === 'object') {
        return 'name' in value
      }

      return value
    },
  },
})

// Computed
const options = computed(() => {
  const options = SPLIDE_OPTIONS

  if (!process.client) {
    return options
  }

  for (const breakpoint of Object.keys(options.breakpoints)) {
    if ((window?.innerWidth || 0) < breakpoint) {
      continue
    }

    options.breakpoints[breakpoint].destroy =
      options.breakpoints[breakpoint].perPage >= props.products.length
  }

  return options
})

// Component life-cycle hooks
onBeforeRouteUpdate((leaveGuard) => {
  if (
    !props.trackable ||
    // Se è un oggetto, deve avere sia almeno il Name
    (typeof props.trackable === 'object' && !props.trackable?.name)
  ) {
    return
  }

  const product = props.products.find((product) => {
    let { link } = product

    if (!link.endsWith('/')) {
      link += '/'
    }

    return link === leaveGuard.fullPath
  })

  if (!product) {
    console.warn('Prodotto non trovato')
    return true
  }

  let list = props.trackable
  // Se è una string, allora la accorpa in un oggetto
  if (typeof list === 'string') {
    list = { name: list }
  }

  // Se l'ID è assente, allora viene utilizzato o l'attributo ID nell'HTML
  // oppure l'intero path della rotta corrente
  if (!list?.id) {
    list.id = attrs.id || route.fullPath
  }

  trackEcommerceEvent('select_item', product, {
    index: props.products.indexOf(product),
    ...list,
  })
})

onMounted(() => {
  // Verifica che la props trackable sia valida
  if (
    !props.trackable ||
    // Se è un oggetto, deve avere sia almeno il Name
    (typeof props.trackable === 'object' && !props.trackable?.name)
  ) {
    return
  }

  let list = props.trackable
  // Se è una string, allora la accorpa in un oggetto
  if (typeof list === 'string') {
    list = { name: list }
  }

  // Se l'ID è assente, allora viene utilizzato o l'attributo ID nell'HTML
  // oppure l'intero path della rotta corrente
  if (!list?.id) {
    list.id = attrs.id || route.fullPath
  }

  trackEcommerceEvent('view_item_list', props.products, {
    ...list,
  })
})
</script>

<style lang="scss">
$prefix: 'product-cards';
@include component($prefix) {
  $splide: '.splide';

  @include set-local-vars(
    $prefix: $prefix,
    $map: (
      columns: 1,
      gap: rem(30px),
    )
  );

  padding: 0 get-var(gap, $prefix: $prefix);

  @include from(desktop) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        columns: 3,
      )
    );
  }

  @include from(large) {
    padding: 0 rem(54px);

    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        columns: 4,
      )
    );
  }

  @include element('item') {
    height: 100%;

    @include from(large) {
      width: rem(385px);
    }
  }

  &#{$splide} {
    @include element('arrows') {
      width: 100%;
      inset: 0;
      position: absolute;
      pointer-events: none;
    }

    @include element('arrow') {
      padding: rem(10px);
      margin: 0;
      border: 0;
      position: absolute;
      background-color: transparent;
      border-radius: 0;
      cursor: pointer;
      top: 50%;
      transform: translate(
          calc(50% * get-var(scale, 1, $prefix: $prefix)),
          -50%
        )
        scaleX(get-var(scale, 1, $prefix: $prefix));
      display: block;
      pointer-events: all;

      svg {
        width: rem(17.5px);
        height: rem(17.5px);
      }

      @include modifier('prev') {
        left: 0;
        right: auto;

        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            scale: -1,
          )
        );
      }

      @include modifier('next') {
        right: 0;
        left: auto;
      }
    }
  }

  @include is-not('active') {
    @include element('item') {
      width: 100%;
    }

    &#{$splide} {
      visibility: visible;
      padding: 0;

      #{compose-element($splide, 'arrows')} {
        display: none;
      }

      #{compose-element($splide, 'list')} {
        display: flex;
        align-items: stretch;
        gap: get-var(gap, $prefix: $prefix);
      }

      #{compose-element($splide, 'slide')} {
        @include column-width($prefix, '#{$prefix}-slide');
      }
    }
  }
}
</style>
