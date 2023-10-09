<template>
  <main class="s-checkout">
    <SiteContainer>
      <div class="o-row">
        <!-- <template v-if="!isEmpty"> -->
        <SiteContainer :max-width="1060" padless>
          <BaseBox class="u-mb-large">
            <template #head>
              <BaseHeading tag="span" use="custom">{{
                $t('orders.shipping')
              }}</BaseHeading>
            </template>

            <FormCheckoutShipping
              v-model:address="shippingAddress"
              v-model:shipping="shippingData"
              tag="div"
              :time-slots="timeSlots"
            />
          </BaseBox>

          <BaseBox>
            <template #head>
              <BaseHeading tag="span" use="custom">{{
                $t('orders.billing')
              }}</BaseHeading>
            </template>

            <BaseParagraph class="u-mb-tiny">{{
              $t('invoice.requestInvoice')
            }}</BaseParagraph>

            <FormInvoice
              v-model:invoice="billingData"
              class="u-mb-half"
              tag="div"
            />

            <ToggleField
              v-model="useDifferentAddress"
              class="s-different-billing"
              ><BaseHeading tag="h5">{{
                $t('addresses.differentBilling')
              }}</BaseHeading></ToggleField
            >

            <FormAddress
              v-show="useDifferentAddress"
              v-model:address="billingAddress"
              class="u-mt-half"
              tag="div"
            />
          </BaseBox>
        </SiteContainer>

        <SiteContainer :max-width="520" padless>
          <CheckoutCart :products="basket || []" :sub-total="subTotal" />

          <OrderResume
            container-class="u-mt-huge"
            :sub-total="subTotal"
            :heading="$t('checkout.payment')"
            without-sub-total
          >
            <template #after="{ className }">
              <div :class="className">metodi di pagamento</div>
            </template>
          </OrderResume>
        </SiteContainer>
        <!-- </template> -->

        <!-- <BaseMessage v-else :message="$t('cart.empty')" /> -->
      </div>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import { useAccountStore } from '@/stores/account'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'green',
})

// Component life-cycle hooks
onMounted(async () => {
  if (!isLoggedIn.value) {
    return
  }

  const userShippingAddress = await useApi(
    '/shop/addresses/shipping',
    {
      method: 'GET',
    },
    {
      cache: false,
      dataOnly: true,
    }
  )

  shippingAddress.value = { ...userShippingAddress.value }

  const userBillingAddress = await useApi(
    '/shop/addresses/billing',
    {
      method: 'GET',
    },
    {
      cache: false,
      dataOnly: true,
    }
  )

  billingAddress.value = { ...userBillingAddress.value }
})

// Composables
const cart = useCartStore()
const user = useAccountStore()
const timeSlots = await useApi(
  'time-slots',
  {},
  {
    dataOnly: true,
  }
)

// Data
const { isEmpty, subTotal } = storeToRefs(cart)
const { isLoggedIn } = storeToRefs(user)
const basket = await cart.load()

const useDifferentAddress = ref(false)

const shippingAddress = ref({
  firstName: null,
  lastName: null,
  country: null,
  address: null,
  address2: null,
  province: null,
  city: null,
  postcode: null,
})

const billingAddress = ref({
  firstName: null,
  lastName: null,
  country: null,
  address: null,
  address2: null,
  province: null,
  city: null,
  postcode: null,
})

const shippingData = ref({
  note: null,
  email: null,
  phone: null,
  timeSlot: timeSlots.length > 0 ? timeSlots[0].id : null,
})

const billingData = ref({
  invoice: null,
  company: null,
  cfCompany: null,
  vat: null,
  sdi: null,
  pec: null,
  cfPrivate: null,
})

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include scope('checkout') {
  font-family: get-var(family-text);

  @include set-local-vars(
    $prefix: 'box',
    $map: (
      body-background: get-var(color-light),
    )
  );

  @include typography(18px, 22px);

  @include scope('different-billing') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        text-color: get-var(color-black),
      )
    );

    @include set-local-vars(
      $prefix: 'toggle-field',
      $map: (
        offset-top: rem(4px),
      )
    );
  }
}
</style>
