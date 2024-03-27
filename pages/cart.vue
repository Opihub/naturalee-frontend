<template>
  <section class="s-cart">
    <Transition name="fade">
      <LoadingOverlay v-if="sending" />
    </Transition>

    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <SiteContainer v-if="isEmpty" class="u-pt-huge">
      <BaseHeading
        text="Non hai ancora nessun prodotto nel carrello"
        tag="h4"
        color="black"
      />
    </SiteContainer>

    <SiteContainer v-else class="u-pt-huge">
      <FormWrapper class="o-form--cart" @submit.prevent="goToCheckout">
        <template #default="{ columnClassName }">
          <div :class="[columnClassName, 'o-form__basket']">
            <CartTable
              :products="basket"
              :on-delete="deleteFromBasket"
              :on-clear="clearBasket"
              :on-save="saveCart"
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

                  <template v-if="coupon.code && discount">
                    <span :class="gridCellLeftClassName"
                      >Codice promozionale: {{ coupon.code }}</span
                    >
                    <PriceHolder
                      :class="gridCellRightClassName"
                      :price="discount"
                    >
                      <template #before>-</template>
                    </PriceHolder>
                  </template>

                  <span :class="gridCellLeftClassName">{{
                    $t('orders.shipping')
                  }}</span>

                  <strong v-if="hasFreeShipping" :class="gridCellRightClassName"
                    >Gratuita</strong
                  >
                  <template v-else>
                    <PriceHolder :class="gridCellRightClassName" :price="3" />
                    <span :class="gridCellFullClassName"
                      >Aggiungi
                      <PriceHolder :price="costBeforeFreeShipping" /> per avere
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
                  Ordine Minimo <PriceHolder :price="20" />
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

    <BackgroundHolder class="u-pt-huge u-pb-huge" tag="section">
      <SiteContainer>
        <BaseHeading
          class="u-mb-medium u-text-center u-text-left@tablet"
          tag="h5"
          >Guarda tra i nostri prodotti consigliati</BaseHeading
        >

        <ProductCards :products="products.homepage" />
      </SiteContainer>
    </BackgroundHolder>
  </section>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import { useAccountStore } from '@/stores/account'
import { useConfigurationStore } from '@/stores/configuration'

// Constants
const userStore = useAccountStore()
const cartStore = useCartStore()
const configurationStore = useConfigurationStore()

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/carrello',
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
onMounted(() => {
  nextTick(async () => {
    const syncProduct = await cartStore.load()
    basket.value = syncProduct.value

    validateCoupon()
  })
})

// Composables
const { page } = await usePage()
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

const { products } = storeToRefs(configurationStore)
const sending = ref(false)

// Data
const { isEmpty, coupon } = storeToRefs(cartStore)
const basket = ref([])

// Computed
const {
  hasFreeShipping,
  hasMinimumOrderCost,
  subTotal,
  total,
  discount,
  costBeforeFreeShipping,
} = useCart(basket, coupon)
const { isLoggedIn } = storeToRefs(userStore)

// Watcher

// Methods
const { deleteFromCart, clearCart, validateCoupon } = cartStore
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
  try {
    const feedback = await clearCart()

    if (!feedback.success) {
      return
    }
  } catch (error) {
    return
  }

  basket.value = []
}

const saveCart = async (direct = true) => {
  if (sending.value) {
    return false
  }

  sending.value = true
  let success = false
  try {
    await cartStore.save(basket)

    success = true
  } catch (error) {
    success = false

    notify({
      status: 'danger',
      message: error,
    })
  } finally {
    sending.value = !direct
  }

  return success
}

const goToCheckout = async () => {
  if (!isLoggedIn.value) {
    await navigateTo({
      name: 'login',
      query: {
        redirectBecause: 'needAccount',
      },
    })

    return false
  }

  const success = await saveCart(false)

  if (!success) {
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
