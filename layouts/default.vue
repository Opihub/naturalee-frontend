<template>
  <div ref="layout" :class="CSS_NAME">
    <HeaderTopBar
      :socials-menu="topbar.socialsMenu"
      :primary-menu="topbar.primaryMenu"
      :banners="topbar.banners"
    />

    <HeaderMain
      :categories="header.categories"
      :username="header.username"
      :profile-menu="header.profileMenu"
      :cart="header.cart"
    />

    <HeaderBottomBar
      v-if="!hideBottombar"
      :breadcrumb="bottombar.breadcrumb"
    />
    <slot />

    <section class="u-pt-huge" style="background-color: var(--color-white)">
      <CategoryCards
        v-if="categories"
        class="u-mb-huge"
        :title="categoriesTitle"
        :categories="categories"
      />

      <MarqueeSlider v-if="marquee.length" :marquee="marquee" />
    </section>

    <CategoriesMenu
      v-if="header.categories"
      ref="categoriesMenu"
      :class="`${CSS_NAME}__categories`"
      :categories="header.categories"
    />

    <SiteFooter
      :copyright="footer.copyright"
      :menu="footer.menu"
      :socials-menu="footer.socialsMenu"
      :privacy-menu="footer.privacyMenu"
      :payment-image="footer.paymentImage"
    >
      <template #by> R-innovazione by <u>Opiquad.it</u> </template>
    </SiteFooter>
  </div>
</template>

<script setup>
const CSS_NAME = 'o-layout'

defineProps({
  topbar: {
    type: Object,
    required: true,
  },
  header: {
    type: Object,
    required: true,
  },
  bottombar: {
    type: Object,
    required: true,
    validator(value) {
      return 'search' in value
    },
  },
  hideBottombar: {
    type: Boolean,
    default: false,
  },
  categoriesTitle: {
    type: String,
    default: null,
  },
  categories: {
    type: Array,
    default() {
      return []
    },
  },
  marquee: {
    type: Array,
    default() {
      return []
    },
  },
  footer: {
    type: Object,
    required: true,
  },
})

const layout = ref(null)
const categoriesMenu = ref(null)

const setBottomGap = () => {
  if (!layout.value) {
    return
  }

  layout.value.style.setProperty(
    '--layout-bottom-gap',
    `${categoriesMenu.value.$el.clientHeight}px`
  )
}

onMounted(() => {
  setBottomGap()
  window.addEventListener('resize', setBottomGap)
})

onUnmounted(() => {
  window.removeEventListener('resize', setBottomGap)
})
</script>

<style lang="scss">
$prefix: 'layout';
@include object($prefix) {
  margin-bottom: get-var(bottom-gap, 0, $prefix: $prefix);

  @include element('categories') {
    position: fixed;
    inset: auto 0 0;
    z-index: 20;
    background-color: get-var(color-white);

    justify-content: space-around;
    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        gap: 0,
        font-size: rem(13px),
        line-height: rem(16px),
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        padding: rem(18px) 0,
      )
    );

    @include from(desktop) {
      display: none;
    }
  }
}
</style>
