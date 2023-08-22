<template>
  <div class="o-layout">
    <HeaderTopBar
      ref="topBarElement"
      :socials-menu="topbar.socialsMenu"
      :primary-menu="topbar.primaryMenu"
      :banners="topbar.banners"
    />

    <HeaderMain ref="headerElement" />

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
      console.debug(value)

      return (
        value.copyright &&
        value.menu &&
        value.socialsMenu &&
        value.privacyMenu &&
        value.paymentImage
      )
    },
  },
  topbar: {
    type: Object,
    required: true,
    validator(value) {
      if (typeof value !== 'object') {
        return false
      }
      console.debug(value)

      return value.socialsMenu && value.primaryMenu && value.banners
    },
  },
})
</script>
