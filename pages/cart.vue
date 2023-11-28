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
              :on-delete="deleteFromBasket"
              :on-clear="clearBasket"
            />
          </div>

          <div :class="[columnClassName, 'o-form__resume']">
            <OrderResume :heading="$t('cart.total')">
              <template
                #default="{
                  className,
                  rowClassName,
                  totalClassName,
                  gridClassName,
                  gridCellLeftClassName,
                  gridCellRightClassName,
                  gridCellFullClassName,
                }"
              >
                <div :class="[className, rowClassName]">
                  <span>{{ $t('coupon.formTitle') }}</span>

                  <FormCoupon
                    tag="div"
                    class="u-mt-mini"
                    :placeholder="$t('coupon.formPlaceholder')"
                  />
                </div>

                <div
                  class="u-pt-half u-pb-half"
                  :class="[gridClassName, rowClassName]"
                >
                  <span :class="gridCellLeftClassName">{{
                    $t('common.subTotal')
                  }}</span>
                  <PriceHolder
                    :class="gridCellRightClassName"
                    :price="subTotal"
                  />

                  <span :class="gridCellLeftClassName">{{
                    $t('orders.shipping')
                  }}</span>
                  <!-- <ShippingMethods :class="gridCellRightClassName" /> -->

                  <strong v-if="hasFreeShipping" :class="gridCellRightClassName"
                    >Gratuita</strong
                  >
                  <template v-else>
                    <PriceHolder :class="gridCellRightClassName" :price="3" />
                    <span :class="gridCellFullClassName"
                      >Aggiungi <PriceHolder :price="50 - subTotal" /> per avere
                      la spedizione gratuita</span
                    >
                  </template>
                </div>

                <div
                  class="u-pt-half u-pb-half"
                  :class="[gridClassName, rowClassName]"
                >
                  <b :class="[gridCellLeftClassName, totalClassName]">{{
                    $t('common.total')
                  }}</b>
                  <PriceHolder :class="gridCellRightClassName" :price="total" />
                </div>

                <div
                  v-if="!hasMinimumOrderCost"
                  :class="[className, rowClassName]"
                >
                  Ordine Minimo <PriceHolder :price="20" /> di spesa per andare
                  alla cassa!
                </div>
              </template>

              <template #after="{ footerClassName }">
                <div :class="footerClassName">
                  <BaseButton
                    :disabled="sending || !hasMinimumOrderCost"
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
  layout: 'standard',
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
const { isEmpty } = storeToRefs(cart)
const remoteBasket = await cart.load()
const basket = ref(remoteBasket.value)

// Computed
const hasFreeShipping = computed(() => {
  return 50 - subTotal.value <= 0
})
const hasMinimumOrderCost = computed(() => {
  return subTotal.value >= 20
})
const shippingMethod = computed(() => {
  return hasFreeShipping.value ? 0 : 3
})
const { subTotal, granTotal: total } = useTotal(basket, {
  shipping: shippingMethod,
})

// Watcher

// Methods
const { deleteFromCart, clearCart } = cart
const deleteFromBasket = async (product) => {
  const success = await deleteFromCart(product)

  if (!success) {
    return
  }

  basket.value = basket.value.filter(
    (item) => item.variationId !== product.variationId
  )
}

const clearBasket = async () => {
  const success = await clearCart()

  if (!success) {
    return
  }

  basket.value = []
}

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
