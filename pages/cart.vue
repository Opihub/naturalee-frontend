<template>
  <main class="s-cart">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-pb-huge">
      <div class="o-row">
        <template v-if="!isEmpty">
          <SiteContainer :max-width="1060" padless>
            <CartTable
              :products="basket"
              :on-delete="deleteFromCart"
              :on-clear="clearCart"
            />
          </SiteContainer>

          <SiteContainer :max-width="520" padless>
            <OrderResume :sub-total="subTotal" :total="total" :heading="$t('cart.total')">
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
        </template>

        <BaseMessage v-else :message="$t('cart.empty')" />
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

// Component life-cycle hooks

// Composables
const { page } = await usePage('cart')
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
