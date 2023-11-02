<template>
  <main class="s-cart">
    <Transition name="fade">
      <LoadingOverlay v-if="sending" />
    </Transition>

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
      <FormWrapper class="o-form--cart" @submit.prevent="saveCart">
        <template #default="{ columnClassName }">
          <div :class="[columnClassName, 'o-form__basket']">
            <CartTable
              :products="basket"
              :on-delete="deleteFromCart"
              :on-clear="clearCart"
            />
          </div>

          <div :class="[columnClassName, 'o-form__resume']">
            <OrderResume
              :sub-total="subTotal"
              :total="total"
              :heading="$t('cart.total')"
            >
              <template #before="{ className }">
                <div :class="className">
                  <span>{{ $t('coupon.formTitle') }}</span>

                  <FormCoupon
                    tag="div"
                    class="u-mt-mini"
                    :placeholder="$t('coupon.formPlaceholder')"
                  />
                </div>
              </template>

              <template #after="{ footerClassName }">
                <div :class="footerClassName">
                  <BaseButton
                    :disabled="sending"
                    type="submit"
                    color="green"
                    :text="$t('cart.proceed')"
                  />
                </div>
              </template>
            </OrderResume>
          </div>
        </template>
      </FormWrapper>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'cart',
  layout: 'standard'
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
const { sending, send } = useSender()

// Data
const { isEmpty, subTotal, total } = storeToRefs(cart)
const basket = await cart.load()

// Watcher

// Computed

// Methods
const { deleteFromCart, clearCart } = cart
const saveCart = async () => {
  if (sending.value) {
    return
  }

  const response = await send(async () => await cart.save(basket))

  console.debug(response.value)
  if (!response.value.success) {
    notify({
      status: 'danger',
      message: response.value.data,
    })

    return
  }

  await navigateTo({
    name: 'checkout',
  })
}
</script>

<style lang="scss" scoped>
@include object('form') {
  @include modifier('cart') {
    @include element('basket') {
      @include set-local-vars(
        $prefix: 'field',
        $map: (
          width: rem(1060px),
        )
      );
    }
    @include element('resume') {
      @include set-local-vars(
        $prefix: 'field',
        $map: (
          width: rem(520px),
        )
      );
    }
  }
}
</style>
