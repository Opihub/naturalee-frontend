<template>
  <div class="o-layout">
    <HeaderTopBar
      ref="topBarElement"
      :socials-menu="topbar.socialsMenu"
      :primary-menu="topbar.primaryMenu"
      :banners="topbar.banners"
    />

    <HeaderMain
      ref="headerElement"
      :categories="header.categories"
      :username="header.username"
      :profile-menu="header.profileMenu"
      :cart="header.cart"
    />

    <HeaderBottomBar
      ref="bottomBarElement"
      :search="bottombar.search"
      :breadcrumb="bottombar.breadcrumb"
    />
    <slot />

    <MarqueeSlider v-if="marquee.length" :marquee="marquee" />

    <SiteFooter
      ref="footerElement"
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
const topBarElement = ref(null)
const headerElement = ref(null)
const bottomBarElement = ref(null)
const footerElement = ref(null)

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
</script>
