<template>
  <section class="s-checkout">
    <SiteContainer>
      <BaseMessage v-if="isEmpty" :message="$t('cart.empty')" />

      <template v-else>
        <FormCheckout
          :use-different-address="useDifferentAddress"
          :shipping-address="shippingAddress"
          :billing-address="billingAddress"
          :shipping-data="shippingData"
          :billing-data="billingData"
          :payment-method="paymentMethod"
          :shipping-method="shippingMethod"
          :coupon="coupon.code"
          :cart="basket"
          :stripe-card="card"
          :can-submit="canSubmit"
        >
          <template
            #resume="{
              columnClassName,
              columnHalfClassName,
              columnFullClassName,
              rowClassName,
            }"
          >
            <BaseMessage
              v-if="!hasFreeShipping"
              status="warning"
              :class="[columnClassName, columnFullClassName]"
            >
              <i18n-t keypath="freeShipping" class="u-mt-tiny">
                <template #price>
                  <PriceHolder :price="costBeforeFreeShipping" />
                </template>
                <template #backToCart>
                  <BaseLink
                    :to="{ name: 'featured' }"
                    underline
                    color="dark"
                    :text="t('addMoreProducts')"
                  />
                </template>
              </i18n-t>
            </BaseMessage>

            <div :class="rowClassName">
              <div :class="[columnClassName, columnHalfClassName]">
                <BaseBox>
                  <template #head>
                    <BaseHeading tag="span" use="custom">{{
                      $t('addresses.shipping')
                    }}</BaseHeading>
                  </template>

                  <template v-if="isAddressFilled(shippingAddress)">
                    <BaseParagraph>
                      <strong>{{ $t('checkout.yourShippingAddress') }}</strong>
                    </BaseParagraph>
                    <ShopAddress :address="shippingAddress" />
                    <BaseMessage
                      v-if="!isAddressComplete(shippingAddress)"
                      status="warning"
                      class="u-mt-tiny"
                      :message="$t('addresses.incomplete')"
                    />
                  </template>

                  <BaseParagraph
                    v-else
                    :text="
                      $t('addresses.checkouNotSet', {
                        type: $t('orders.shipping'),
                      })
                    "
                  />

                  <BaseButton
                    color="green"
                    class="u-mt-small"
                    :text="
                      $t(isAddressFilled(shippingAddress) ? 'edit' : 'create')
                    "
                    @click="toggleShippingModal(true)"
                  />
                </BaseBox>
              </div>

              <div :class="[columnClassName, columnHalfClassName]">
                <BaseBox>
                  <template #head>
                    <BaseHeading tag="span" use="custom">{{
                      $t('orders.billing')
                    }}</BaseHeading>
                  </template>

                  <FormInvoice
                    v-model:invoice="billingData"
                    class="u-mb-medium"
                  />

                  <ToggleField
                    v-if="billingData.invoice !== false"
                    v-model="useDifferentAddress"
                    class="u-mb-tiny u-white-pre-line"
                    >{{ $t('checkout.useDifferentAddress') }}</ToggleField
                  >

                  <template
                    v-if="useDifferentAddress && billingData.invoice !== false"
                  >
                    <template v-if="isAddressFilled(billingAddress)">
                      <BaseParagraph>
                        <strong>{{ $t('checkout.yourBillingAddress') }}</strong>
                      </BaseParagraph>
                      <ShopAddress :address="billingAddress" />
                      <BaseMessage
                        v-if="!isAddressComplete(billingAddress)"
                        status="warning"
                        class="u-mt-tiny"
                        :message="$t('addresses.incomplete')"
                      />
                    </template>

                    <BaseParagraph
                      v-else
                      :text="
                        $t('addresses.checkouNotSet', {
                          type: $t('orders.billing'),
                        })
                      "
                    />

                    <BaseButton
                      color="green"
                      class="u-mt-small"
                      :text="
                        $t(isAddressFilled(billingAddress) ? 'edit' : 'create')
                      "
                      @click="toggleBillingModal(true)"
                    />
                  </template>
                </BaseBox>
              </div>
            </div>

            <CartTable
              readonly
              :products="basket"
              :class="[columnClassName, columnFullClassName]"
            />
          </template>

          <template #action="{ columnClassName, columnFullClassName }">
            <div
              :class="[columnClassName, columnFullClassName]"
              class="s-checkout-delivery"
            >
              <OrderResume
                :heading="$t('orders.deliveryInfos')"
                container-class="u-mb-large"
              >
                <template #default="{ className, rowClassName }">
                  <div :class="[className, rowClassName]">
                    <BaseDatePicker v-model:date="date" />

                    <div
                      v-for="slot in timeSlots"
                      :key="slot.id"
                      class="u-mt-tiny"
                    >
                      <ToggleField
                        v-model="timeSlot"
                        class="u-mb-tiny"
                        radio
                        boxed
                        required
                        :value="slot.id"
                      >
                        <b class="u-mr-micro">{{ slot.title }}</b>
                        <span>
                          <time>{{ slot.from }}</time> -
                          <time>{{ slot.to }}</time>
                        </span>
                      </ToggleField>
                    </div>
                  </div>
                </template>
              </OrderResume>

              <OrderResume :heading="$t('checkout.payment')">
                <template
                  #default="{
                    className,
                    rowClassName,
                    totalClassName,
                    gridClassName,
                    gridCellLeftClassName,
                    gridCellRightClassName,
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
                      $t('orders.subTotal')
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

                    <span :class="gridCellLeftClassName">
                      {{ $t('orders.delivery') }}<br />

                      <b>{{ getFormattedDate(date) }}</b
                      >,
                      <span>
                        <b
                          ><time>{{ currentTimeSlot.from }}</time> -
                          <time>{{ currentTimeSlot.to }}</time></b
                        >
                      </span></span
                    >

                    <strong
                      v-if="hasFreeShipping"
                      :class="gridCellRightClassName"
                      >{{ $t('common.free') }}</strong
                    >
                    <PriceHolder
                      v-else
                      :class="gridCellRightClassName"
                      :price="3"
                    />
                  </div>

                  <div
                    class="u-pt-half u-pb-half"
                    :class="[gridClassName, rowClassName]"
                  >
                    <b :class="[gridCellLeftClassName, totalClassName]">{{
                      $t('common.total')
                    }}</b>
                    <PriceHolder
                      :class="[gridCellRightClassName, totalClassName]"
                      :price="total"
                    />
                  </div>

                  <div :class="[className, rowClassName]">
                    <InputField
                      v-model="note"
                      type="textarea"
                      name="note"
                      :placeholder="$t('checkout.notesPlaceholder')"
                    >
                      {{ $t('orders.notes') }}
                    </InputField>
                  </div>
                </template>

                <template #after="{ footerClassName }">
                  <div :class="footerClassName">
                    <PaymentMethods
                      :model-value="paymentMethod"
                      @update:model-value="setPaymentMethod"
                    >
                      <div
                        v-show="paymentMethod.id === 'stripe'"
                        id="card-element"
                        class="u-mb-half"
                      ></div>

                      <BaseButton
                        type="submit"
                        color="green"
                        :disabled="
                          loading ||
                          (paymentMethod.id === 'stripe' && !isStripeComplete)
                        "
                        >Paga ora</BaseButton
                      >
                    </PaymentMethods>
                  </div>
                </template>
              </OrderResume>
            </div>
          </template>
        </FormCheckout>
      </template>
    </SiteContainer>

    <Transition name="fade">
      <ModalContainer
        v-if="isShippingModalOpen"
        :max-width="1088"
        @close="toggleShippingModal(false)"
      >
        <template #header>
          <BaseHeading tag="h5">{{ $t('orders.shipping') }}</BaseHeading>
        </template>

        <FormUpdateAddress
          v-model:address="shippingAddress"
          @completed="closeShippingModal"
        />
      </ModalContainer>
    </Transition>

    <Transition name="fade">
      <ModalContainer
        v-if="isBillingModalOpen"
        :max-width="1088"
        @close="toggleBillingModal(false)"
      >
        <template #header>
          <BaseHeading tag="h5">{{ $t('orders.billing') }}</BaseHeading>
        </template>
        <FormUpdateAddress
          v-model:address="billingAddress"
          v-model:invoice="billingData"
          is-billing
          @completed="closeBillingModal"
        >
          <template #billingHeading>
            <BaseParagraph>{{ $t('invoice.requestInvoice') }}</BaseParagraph>
          </template>
        </FormUpdateAddress>
      </ModalContainer>
    </Transition>
  </section>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import { useAccountStore } from '@/stores/account'

import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();

const {loading} = storeToRefs(loadingStore);

// Constants
const STRIPE_OPTIONS = {
  disableLink: true,
  hidePostalCode: true,
  style: {
    base: {
      padding: '16px',
      fontFamily: 'Mulish, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      color: '#3d4852',
      '::placeholder': {
        color: '#8795a1',
      },
    },
  },
}

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'green',
  name: 'checkout',
  middleware: 'auth',
})

defineI18nRoute({
  paths: {
    it: '/checkout',
  },
  locales: ['it'],
})

provide('holiday', [
  new Date(`${new Date().getFullYear()}-1-1`),
  new Date(`${new Date().getFullYear()}-1-6`),
  new Date(`${new Date().getFullYear()}-4-25`),
  new Date(`${new Date().getFullYear()}-5-1`),
  new Date(`${new Date().getFullYear()}-6-2`),
  new Date(`${new Date().getFullYear()}-8-15`),
  new Date(`${new Date().getFullYear()}-8-16`),
  new Date(`${new Date().getFullYear()}-8-17`),
  new Date(`${new Date().getFullYear()}-11-1`),
  new Date(`${new Date().getFullYear()}-12-25`),
  new Date(`${new Date().getFullYear()}-12-26`),
  new Date(`${new Date().getFullYear() + 1}-1-1`),
  new Date(`${new Date().getFullYear() + 1}-1-6`),
  new Date(`${new Date().getFullYear() + 1}-4-25`),
  new Date(`${new Date().getFullYear() + 1}-5-1`),
  new Date(`${new Date().getFullYear() + 1}-6-2`),
  new Date(`${new Date().getFullYear() + 1}-8-15`),
  new Date(`${new Date().getFullYear() + 1}-8-16`),
  new Date(`${new Date().getFullYear() + 1}-8-17`),
  new Date(`${new Date().getFullYear() + 1}-11-1`),
  new Date(`${new Date().getFullYear() + 1}-12-25`),
  new Date(`${new Date().getFullYear() + 1}-12-26`),
])

// Component life-cycle hooks
onUnmounted(() => {
  unsubscribe()
})

// Composables
const { page } = await usePage()
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

const config = useRuntimeConfig()
const cartStore = useCartStore()
const basket = await cartStore.load()

if (basket.value.length <= 0) {
  await navigateTo({
    name: 'cart',
    query: {
      redirectBecause: 'noProducts',
    },
  })
} else if (cartStore.subTotal < 20) {
  await navigateTo({
    name: 'cart',
    query: {
      redirectBecause: 'orderMinimumMissing',
    },
  })
}

const { t } = useI18n({
  useScope: 'local',
})

const user = useAccountStore()
const { data: timeSlots } = await useApi('time-slots', {
  dataOnly: true,
})

// Data
const sending = ref(false)
const {
  isEmpty,
  subTotal,
  total,
  paymentMethod,
  shippingMethod,
  hasFreeShipping,
  coupon,
  discount,
  costBeforeFreeShipping,
} = storeToRefs(cartStore)

const isShippingModalOpen = ref(false)
const isBillingModalOpen = ref(false)

const useDifferentAddress = ref(false)

const stripe = ref(null)
const card = ref(null)
const isStripeComplete = ref(false)

provide('stripe', stripe)

const { data: shippingAddress } = await useApi('shop/addresses/shipping', {
  method: 'GET',
  dataOnly: true,
  cache: 'no-cache'
})

const { data: userBillingAddress } = await useApi('shop/addresses/billing', {
  method: 'GET',
  dataOnly: true,
  cache: 'no-cache'
})

const { address, invoice } = useBillingAddress(userBillingAddress)
const billingAddress = ref({ ...address.value })
const billingData = ref({ ...invoice.value })

const account = await user.load()

const note = ref('')
const date = ref(getToday())
const email = ref(account.value?.email || null)

if (!shippingAddress.value.phone) {
  shippingAddress.value.phone = account.value?.phone || null
}
if (!billingAddress.value.phone) {
  billingAddress.value.phone = account.value?.phone || null
}

const timeSlot = ref(timeSlots.value.find(() => true)?.id)

const extraValue = {}
if(coupon.value.code){
  extraValue.coupon = coupon.value.code;
}

trackEcommerceEvent('begin_checkout', basket.value, extraValue);

// Computed
const shippingData = computed(() => ({
  note,
  date,
  timeSlot: currentTimeSlot,
  email,
}))
const elements = computed(() => stripe.value?.elements())

const currentTimeSlot = computed(() => {
  return timeSlots.value.find((slot) => slot.id === timeSlot.value)
})

const canSubmit = computed(() => {
  return (
    (paymentMethod.value?.id && paymentMethod.value.id !== 'stripe') ||
    isStripeComplete.value
  )
})

// Watcher
const unsubscribe = cartStore.$onAction(
  ({
    name, // name of the action
    after, // hook after the action returns or resolves
  }) => {
    if (name !== 'setPaymentMethod') {
      return
    }

    after((result) => {
      if (result.id !== 'stripe') {
        return
      }

      const data = {
        shippingAddress: shippingAddress.value,
        shippingData: shippingData.value,
        billingAddress: useDifferentAddress.value
          ? billingAddress.value
          : shippingAddress.value,
        billingData: billingData.value,
        shippingMethod: shippingMethod.value,
        coupon: coupon.value,
      }

      requestPaymentIntent(email, data)
    })
  }
)

// Methods
const { setPaymentMethod, requestPaymentIntent } = cartStore

const toggleShippingModal = (status = null) => {
  isShippingModalOpen.value =
    status !== null ? !!status : !isShippingModalOpen.value
}

const closeShippingModal = () => {
  trackEcommerceEvent('add_shipping_info', basket.value, extraValue);
  notify({
    status: 'success',
    message: 'Indirizzo di spedizione aggiornato',
  })

  toggleShippingModal(false)
}

const toggleBillingModal = (status = null) => {
  isBillingModalOpen.value =
    status !== null ? !!status : !isBillingModalOpen.value
}

const closeBillingModal = () => {
  notify({
    status: 'success',
    message: 'Indirizzo di fatturazione aggiornato',
  })

  toggleBillingModal(false)
}

function setupStripe() {
  stripe.value = Stripe(config.public.stripeKey)

  if (!card.value && elements.value) {
    card.value = elements.value.create('card', STRIPE_OPTIONS)
    card.value.mount('#card-element')

    card.value.on('change', function (event) {
      isStripeComplete.value = event.complete
    })
  }
}

useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3/',
      onload: setupStripe,
    },
  ],
})
</script>

<style lang="scss" scoped>
@include scope('checkout') {
  font-family: get-var(family-text);

  @include set-local-vars(
    $prefix: 'box',
    $map: (
      background-color: get-var(color-light),
      head-display: flex,
      head-justify: space-between,
      head-align: center,
    )
  );

  @include set-local-vars(
    $prefix: 'order-resume',
    $map: (
      border-bottom: 2px,
    )
  );
  @include until(tablet) {
    @include set-local-vars(
      $prefix: 'cart-table',
      $map: (
        after-bottom: -20px,
      )
    );
  }

  @include typography(18px, 22px);

  @include component('box') {
    height: 100%;
  }

  @include scope('checkout-delivery') {
    @media screen and (max-width:991px) and (min-width:767px){
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      gap: rem(10px);
      align-items: flex-start;
    }
    @include component('toggle-field') {
      @include set-local-vars(
        $prefix: 'toggle-field',
        $map: (
          label-padding-y: rem(10px),
        )
      );
    }
  }
}
</style>

<i18n lang="json" locale="it">
{
  "freeShipping": "Ti mancano {price} per avere la spedizione gratuita!",
  "addMoreProducts": "Vuoi aggiungere altri prodotti al carrello?"
}
</i18n>
