<template>
  <section :class="className">
    <SiteContainer :class="`${CSS_NAME}__container`">
      <InlineMenu
        :menu="socialsMenu"
        :class="`${CSS_NAME}__left`"
        gap="mini"
      />

      <ClientOnly>
        <div v-if="banners && banners.length" :class="`${CSS_NAME}__center`">
          <Splide
            ref="splide"
            :options="SPLIDE_OPTIONS"
            aria-label="My Favorite Images"
            @splide:mounted="updateHeight"
          >
            <SplideSlide
              v-for="banner in banners"
              :key="banner.id"
              :class="`${CSS_NAME}__banner`"
            >
              <span ref="slides">{{ banner.text }}</span>
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

const props = defineProps({
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

const className = computed(() => {
  const className = [CSS_NAME]

  if (!props.banners || props.banners.length <= 0) {
    className.push('has-no-banners')
  }

  return className
})

const splide = ref(null)
const slides = ref([])

onMounted(() => {
  window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
})

const updateHeight = () => {
  if (slides.value.length <= 0) {
    return
  }

  let height = 0

  for (const slide of slides.value) {
    height = Math.max(height, slide.offsetHeight)
  }

  splide.value.splide.options = {
    height,
  }

  splide.value.splide.refresh()
}
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
    grid-template-columns: 1fr auto 1fr;
    justify-content: space-between;
    align-items: center;
    gap: rem(8px);
    display: grid;

    @include between(tablet, desktop) {
      grid-template-rows: auto auto;
      grid-template-columns: 1fr 1fr;
    }
  }

  @include element('banner') {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include element('left') {
    grid-column: 1 / 2;
    justify-self: start;
    margin-right: auto;

    svg {
      fill: currentColor;

      @include set-local-vars(
        $prefix: 'link-svg',
        $map: (
          width: auto,
          height: rem(15px),
        )
      );
    }

    @include until(tablet) {
      display: none;
    }

    @include between(tablet, desktop) {
      grid-row: 2 / 3;
    }
  }

  @include element('center') {
    grid-column: 2 / 3;
    list-style: none;
    padding: 0;
    text-align: center;
    color: get-var(color-white);
    @include typography(15px, 19px);
    overflow: hidden;

    @include between(tablet, desktop) {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
  }

  @include element('right') {
    grid-column: 3 / 4;
    justify-self: end;
    margin-left: auto;

    @include until(tablet) {
      display: none;
    }

    @include between(tablet, desktop) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }
  }

  @include until(tablet) {
    @include has('no-banners') {
      display: none;
    }
  }
}
</style>
