<template>
  <main class="s-cart">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <BackgroundHolder v-if="isEmpty" class="u-pt-huge u-pb-huge" tag="section">
      <SiteContainer class="u-mb-medium">
        <BaseHeading
          text="Non hai ancora nessun prodotto nel carrello"
          tag="h4"
          color="black"
        />
      </SiteContainer>

      <ProductCards
        :products="products.data"
        title="Guarda tra i nostri prodotti consigliati"
      />
    </BackgroundHolder>

    <SiteContainer v-else class="u-pt-huge u-pb-huge">
      <div class="o-row">
        <SiteContainer :max-width="1060" padless>
          <CartTable
            :products="basket"
            :on-delete="deleteFromCart"
            :on-clear="clearCart"
          />
        </SiteContainer>

        <SiteContainer :max-width="520" padless>
          <OrderResume
            :sub-total="subTotal"
            :total="total"
            :heading="$t('cart.total')"
          >
            <template #before="{ className }">
              <div :class="className">
                <span>{{ $t('coupon.formTitle') }}</span>

                <FormCoupon
                  class="u-mt-mini"
                  :placeholder="$t('coupon.formPlaceholder')"
                />
              </div>
            </template>

            <template #after="{ footerClassName }">
              <div :class="footerClassName">
                <BaseButton as="link" color="green" to="/checkout">{{
                  $t('cart.proceed')
                }}</BaseButton>
              </div>
            </template>
          </OrderResume>
        </SiteContainer>
      </div>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import { useShippingStore } from '@/stores/shipping'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'cart',
})

defineI18nRoute({
  paths: {
    it: '/carrello',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const { page } = await usePage('cart')
const products = await useApi('shop/homepage/products')
const cart = useCartStore()
const shippingStore = useShippingStore()

// Data
const { isEmpty, subTotal, total, shippingMethod } = storeToRefs(cart)
const basket = await cart.load()
const shippingAddress = await shippingStore.load()

// Watcher

// Computed

// Methods
const updateAddress = (address) => {
  shippingAddress.value = address
}

const updateShippingMethod = (method) => {
  console.debug(shippingMethod.value)
  shippingMethod.value = method
}
const { deleteFromCart, clearCart } = cart

// Provide
provide('shipping', {
  address: shippingAddress,
  updateAddress,
  method: shippingMethod,
  updateMethod: updateShippingMethod,
})
</script>

<style lang="scss">
@include scope('cart') {
}
</style>
