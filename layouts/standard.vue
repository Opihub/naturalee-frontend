<template>
  <LayoutWrapper ref="layoutElement">
    <HeaderTopBar
      :socials-menu="socialsMenu.data"
      :primary-menu="primaryMenu.data"
      :banners="topbarBanners.data"
    />

    <HeaderMain
      ref="headerElement"
      :categories="categoriesMenu.data"
      :profile-menu="profileMenu.data"
    />

    <slot />

    <SiteFooter :class="{ 'u-mt-auto': !overrideLastElement }">
      <FooterNavigation
        :socials-menu="socialsMenu.data"
        :menu="footerMenu.data"
      />

      <FooterCopyrights
        :copyright="copyrights.data"
        :privacy-menu="privacyMenu.data"
      />
    </SiteFooter>

    <CategoriesMenu
      v-if="categoriesMenu && categoriesMenu.data"
      ref="categoriesMenuElement"
      :class="`${CSS_NAME}__categories`"
      :categories="categoriesMenu.data"
    />
  </LayoutWrapper>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-layout'

// Define (Props, Emits, Page Meta)
defineProps({
  overrideLastElement: {
    type: Boolean,
    default: false,
  },
})

// Component life-cycle hooks
onMounted(() => {
  setBottomGap()
  setHeaderGap()

  window.addEventListener('resize', setBottomGap)
  window.addEventListener('resize', setHeaderGap)
})

onUnmounted(() => {
  window.removeEventListener('resize', setBottomGap)
  window.removeEventListener('resize', setHeaderGap)
})

// Composables
const topbarBanners = await useApi('layout/topbar').catch((error) => {
  console.error('Errore durante il caricamento di "layout/topbar"', error)
})
const copyrights = await useApi('layout/copyright').catch((error) => {
  console.error('Errore durante il caricamento di "layout/copyright"', error)
})

const primaryMenu = await useApi('menu/primary').catch((error) => {
  console.error('Errore durante il caricamento di "menu/primary"', error)
})
const footerMenu = await useApi('menu/footer').catch((error) => {
  console.error('Errore durante il caricamento di "menu/footer"', error)
})
const socialsMenu = await useApi('menu/socials').catch((error) => {
  console.error('Errore durante il caricamento di "menu/socials"', error)
})
const profileMenu = await useApi('menu/profile').catch((error) => {
  console.error('Errore durante il caricamento di "menu/profile"', error)
})
const privacyMenu = await useApi('menu/privacy').catch((error) => {
  console.error('Errore durante il caricamento di "menu/privacy"', error)
})
const categoriesMenu = await useApi('menu/categories').catch((error) => {
  console.error('Errore durante il caricamento di "menu/categories"', error)
})

// Data
const layoutElement = ref(null)
const headerElement = ref(null)
const categoriesMenuElement = ref(null)

// Watcher

// Computed

// Methods
const setBottomGap = () => {
  if (!layoutElement.value || !categoriesMenuElement.value) {
    return
  }

  getElement(layoutElement).style.setProperty(
    '--layout-bottom-gap',
    `${categoriesMenuElement.value.$el.clientHeight}px`
  )
}

const setHeaderGap = () => {
  if (!layoutElement.value || !headerElement.value) {
    return
  }

  getElement(layoutElement).style.setProperty(
    '--layout-header-height',
    `${headerElement.value.$el.clientHeight}px`
  )
}
</script>

<style lang="scss">
$prefix: 'layout';
@include object($prefix) {
  @include element('categories') {
    position: fixed;
    inset: auto 0 0;
    z-index: get-var(z-categories);
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
