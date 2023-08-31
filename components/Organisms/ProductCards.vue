<template>
  <SiteContainer>
    <BaseHeading
      v-if="title"
      class="u-mb-medium u-text-center u-text-left@tablet"
      tag="h5"
      >{{ title }}</BaseHeading
    >
    <ClientOnly>
      <Splide
        :class="CSS_NAME"
        :options="SPLIDE_OPTIONS"
        :has-track="false"
        aria-label="Prodotti consigliati"
      >
        <SplideTrack>
          <SplideSlide v-for="product in products" :key="product.id">
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
    </ClientOnly>
  </SiteContainer>
</template>

<script setup>
import ArrowSVG from 'assets/svg/arrow.svg'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/vue-splide'

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
    767.98: {
      perPage: 2,
    },
    991.98: {
      perPage: 4,
      autoWidth: true,
    },
  },
}

defineProps({
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
})
</script>

<style lang="scss">
$prefix: 'product-cards';
@include component($prefix) {
  padding: 0 rem(30px);

  @include from(desktop) {
    padding: 0 rem(54px);
  }

  @include element('item') {
    @include from(desktop) {
      width: rem(385px);
    }
  }

  &.splide {
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
}
</style>
