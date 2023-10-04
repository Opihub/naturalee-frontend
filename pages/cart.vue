import { useCartStore } from '@/stores/cart';
<template>
  <main class="s-cart">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <SiteContainer class="u-pt-huge u-pb-huge">
      <div class="o-row">
        <template v-if="!isEmpty">
          <SiteContainer :max-width="1060" padless>
            <CartTable :products="basket" :on-delete="deleteFromCart" :on-clear="clearCart" />
          </SiteContainer>

          <SiteContainer :max-width="520" padless>
            <OrderResume :sub-total="subTotal" :heading="$t('cart.total')">
              <template #before="{ className }">
                <div :class="className">
                  <span>{{ $t('coupon.formTitle') }}</span>

                  <FormCoupon
                    class="u-mt-mini"
                    :placeholder="$t('coupon.formPlaceholder')"
                  />
                </div>
              </template>

              <template #after="{ className }">
                <div :class="className">
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

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const { page } = await usePage('cart')
const cart = useCartStore()

// Data
const { isEmpty, subTotal } = storeToRefs(cart)
const basket = await cart.load()

// Watcher

// Computed

// Methods
const { deleteFromCart, clearCart } = cart
</script>

<style lang="scss">
@include scope('cart') {
}
</style>
