<template>
  <div ref="layout" :class="CSS_NAME">
    <HeaderTopBar
      :socials-menu="socialsMenu.data"
      :primary-menu="primaryMenu.data"
      :banners="topbarBanners.data"
    />

    <HeaderMain
      :categories="categoriesMenu.data"
      :username="profile.data.username"
      :profile-menu="profileMenu.data"
      :cart="cart.data"
    />

    <slot />

    <section class="u-pt-huge" style="background-color: var(--color-white)">
      <CategoryCards
        v-if="categories && categories.data"
        class="u-mb-huge"
        :title="categoriesTitle"
        :categories="categories.data"
      />

      <MarqueeSlider
        v-if="marquee && marquee.data.length"
        :marquee="marquee.data"
      />
    </section>

    <CategoriesMenu
      v-if="categoriesMenu && categoriesMenu.data"
      ref="categoriesMenuElement"
      :class="`${CSS_NAME}__categories`"
      :categories="categoriesMenu.data"
    />

    <SiteFooter
      :copyright="copyrights.data"
      :menu="primaryMenu.data"
      :socials-menu="socialsMenu.data"
      :privacy-menu="privacyMenu.data"
      payment-image="/pagamenti-sicuri.png"
    >
      <template #by> R-innovazione by <u>Opiquad.it</u> </template>
    </SiteFooter>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-layout'

// Props & Emits
defineProps({
  categoriesTitle: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks
onMounted(() => {
  setBottomGap()
  window.addEventListener('resize', setBottomGap)
})

onUnmounted(() => {
  window.removeEventListener('resize', setBottomGap)
})

// Data
const layout = ref(null)
const categoriesMenuElement = ref(null)

const profile = await useApi('profile').catch((error) => {
  console.error('Errore durante il carimento di "profile"', error)
})
const categories = await useApi('shop/categories').catch((error) => {
  console.error('Errore durante il carimento di "shop/categories"', error)
})
const cart = await useApi('shop/cart/products').catch((error) => {
  console.error('Errore durante il carimento di "shop/cart/products"', error)
})

const marquee = await useApi('layout/marquee').catch((error) => {
  console.error('Errore durante il carimento di "layout/marquee"', error)
})
const topbarBanners = await useApi('layout/topbar').catch((error) => {
  console.error('Errore durante il carimento di "layout/topbar"', error)
})
const copyrights = await useApi('layout/copyright').catch((error) => {
  console.error('Errore durante il carimento di "layout/copyright"', error)
})

const primaryMenu = await useApi('menu/primary').catch((error) => {
  console.error('Errore durante il carimento di "menu/primary"', error)
})
const socialsMenu = await useApi('menu/socials').catch((error) => {
  console.error('Errore durante il carimento di "menu/socials"', error)
})
const profileMenu = await useApi('menu/profile').catch((error) => {
  console.error('Errore durante il carimento di "menu/profile"', error)
})
const privacyMenu = await useApi('menu/privacy').catch((error) => {
  console.error('Errore durante il carimento di "menu/privacy"', error)
})
const categoriesMenu = await useApi('menu/categories').catch((error) => {
  console.error('Errore durante il carimento di "menu/categories"', error)
})

// Watcher

// Computed

// Methods
const setBottomGap = () => {
  if (!layout.value) {
    return
  }

  layout.value.style.setProperty(
    '--layout-bottom-gap',
    `${categoriesMenuElement.value.$el.clientHeight}px`
  )
}
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
