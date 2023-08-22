<template>
  <section :class="CSS_NAME">
    <SiteContainer :class="`${CSS_NAME}__container`">
      <InlineMenu :menu="socialsMenu" :class="`${CSS_NAME}__left`" gap="mini" />

      <ClientOnly>
        <div v-if="banners && banners.length" :class="`${CSS_NAME}__center`">
          <Splide :options="SPLIDE_OPTIONS" aria-label="My Favorite Images">
            <SplideSlide v-for="(banner, index) in banners" :key="index">
              {{ banner }}
            </SplideSlide>
          </Splide>
        </div>
      </ClientOnly>

      <InlineMenu :menu="primaryMenu" :class="`${CSS_NAME}__right`" />
    </SiteContainer>
  </section>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

const CSS_NAME = 'c-topbar'

const SPLIDE_OPTIONS = {
  arrows: false,
  type: 'loop',
  pagination: false,
  direction: 'ttb',
  perPage: 1,
  height: 19,
  autoplay: true,
  interval: 4000,
}

defineProps({
  socialsMenu: {
    type: Array,
    default() {
      return []
    },
  },
  primaryMenu: {
    type: Array,
    default() {
      return []
    },
  },
  banners: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss">
$prefix: 'topbar';
@include component($prefix) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: get-var(color-green);
  padding: rem(8px) 0;
  position: relative;

  @include element('container') {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: space-between;
    align-items: center;
    column-gap: rem(8px);
  }

  @include element('left') {
    grid-column: 1 / 2;
    justify-self: start;
    margin-right: auto;
  }

  @include element('center') {
    grid-column: 2 / 3;
    list-style: none;
    padding: 0;
    text-align: center;
    color: get-var(color-white);
    @include typography(15px, 19px);
    overflow: hidden;
  }

  @include element('right') {
    grid-column: 3 / 4;
    justify-self: end;
    margin-left: auto;
  }
}
</style>
