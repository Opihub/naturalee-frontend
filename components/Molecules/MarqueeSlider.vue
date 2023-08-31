<template>
  <ClientOnly>
    <Splide
      :class="CSS_NAME"
      :options="SPLIDE_OPTIONS"
      :extensions="{ AutoScroll }"
      aria-label="Marquee"
    >
      <SplideSlide
        v-for="(item, index) in marquee"
        :key="index"
        :class="`${CSS_NAME}__item`"
      >
        {{ item }}
      </SplideSlide>
    </Splide>
  </ClientOnly>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

const CSS_NAME = 'c-marquee'

const SPLIDE_OPTIONS = {
  type: 'loop',
  // drag: 'free',
  noDrag: true,
  focus: 'center',
  perPage: 1,
  autoScroll: {
    speed: 1,
  },
  arrows: false,
  pagination: false,
  autoWidth: true,
  gap: 130,
  mediaQuery: 'min',
  breakpoints: {
    767.98: {
      gap: 180,
    },
  },
}

defineProps({
  marquee: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss">
@include component(marquee) {
  @include element(item) {
    color: get-var(color-green);
    font-weight: get-var(weight-black);
    @include letter-spacing(16);
    @include typography(50px, 105px);

    @include from(tablet) {
      @include typography(72px, 150px);
    }
  }
}
</style>
