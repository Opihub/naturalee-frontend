<template>
  <section class="c-topbar">
    <SiteContainer class="c-topbar__container">
      <InlineMenu :menu="socialsMenu" class="c-topbar__left" gap="mini" />

      <div v-if="banners.length > 0" class="c-topbar__center">
        <ClientOnly>
          <Splide :options="SPLIDE_OPTIONS" aria-label="My Favorite Images">
            <SplideSlide v-for="(banner, index) in banners" :key="index">
              {{ banner }}
            </SplideSlide>
          </Splide>
        </ClientOnly>
      </div>

      <InlineMenu :menu="primaryMenu" class="c-topbar__right" />
    </SiteContainer>
  </section>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

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
@include component('topbar') {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #{get-var(color-green)};
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
    justify-self: start;
  }

  @include element('center') {
    list-style: none;
    padding: 0;
    text-align: center;
    color: get-var(color-white);
    @include typography(15px, 19px);
    overflow: hidden;
  }

  @include element('right') {
    justify-self: end;
  }
}
</style>
