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
const footerElement = ref(null)

defineProps({
  topbar: {
    type: Object,
    required: true,
    validator(value) {
      if (typeof value !== 'object') {
        return false
      }

      return value.socialsMenu && value.primaryMenu && value.banners
    },
  },
  header: {
    type: Object,
    required: true,
    validator(value) {
      if (typeof value !== 'object') {
        return false
      }

      return (
        value.categories && value.username && value.profileMenu && value.cart
      )
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
    validator(value) {
      if (typeof value !== 'object') {
        return false
      }

      return (
        value.copyright &&
        value.menu &&
        value.socialsMenu &&
        value.privacyMenu &&
        value.paymentImage
      )
    },
  },
})
</script>
