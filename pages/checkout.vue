<template>
  <main class="s-checkout">
    <Transition name="fade">
      <LoadingOverlay v-if="sending" />
    </Transition>

    <SiteContainer>
      <BaseMessage v-if="isEmpty" :message="$t('cart.empty')" />

      <template v-else>
        <FormCheckout
          :shipping-address="shippingAddress"
          :billing-address="billingAddress"
          :shipping-data="shippingData"
          :billing-data="billingData"
          :payment-method="paymentMethod"
          :shipping-method="shippingMethod"
          :cart="cart.checkout"
          @api:start="sending = true"
          @api:end="sending = false"
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
              >Ti mancano <PriceHolder :price="50 - subTotal" /> per avere la
              spedizione gratuita!
              <BaseLink :to="{ name: 'featured' }" underline color="dark"
                >Vuoi aggiungere altri prodotti al carrello?</BaseLink
              >
            </BaseMessage>

            <div :class="rowClassName">
              <div :class="[columnClassName, columnHalfClassName]">
                <BaseBox class="u-mb-large">
                  <template #head>
                    <BaseHeading tag="span" use="custom">{{
                      $t('orders.shipping')
                    }}</BaseHeading>

                    <InlineButton
                      color="green"
                      underline
                      :text="$t('edit')"
                      @click="toggleShippingModal(true)"
                    />
                  </template>

                  <ShopAddress :address="shippingAddress">
                    <template #default="{ className }">
                      <template v-if="shippingData.timeSlot">
                        <b :class="[className, 'u-mt-tiny']">Consegna:</b>
                        <span :class="className">
                          <b class="u-mr-micro">{{
                            shippingData.timeSlot.title
                          }}</b>
                          <span>
                            <time>{{ shippingData.timeSlot.from }}</time> -
                            <time>{{ shippingData.timeSlot.to }}</time>
                          </span>
                        </span>
                      </template>
                    </template>
                  </ShopAddress>
                </BaseBox>
              </div>

              <div :class="[columnClassName, columnHalfClassName]">
                <BaseBox>
                  <template #head>
                    <BaseHeading tag="span" use="custom">{{
                      $t('orders.billing')
                    }}</BaseHeading>

                    <InlineButton
                      color="green"
                      underline
                      :text="$t('edit')"
                      @click="toggleBillingModal(true)"
                    />
                  </template>

                  <ShopAddress
                    :address="billingAddress"
                    :invoice="billingData"
                  />
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
            <div :class="[columnClassName, columnFullClassName]">
              <OrderResume
                v-model:address="shippingAddress"
                :heading="$t('checkout.payment')"
              >
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

                    <span :class="gridCellLeftClassName">
                      {{ $t('orders.delivery') }}<br />
                      <b class="u-mr-micro">{{
                        shippingData.timeSlot.title
                      }}</b>
                      <span>
                        <time>{{ shippingData.timeSlot.from }}</time> -
                        <time>{{ shippingData.timeSlot.to }}</time>
                      </span></span
                    >
                    <!-- <ShippingMethods :class="gridCellRightClassName" /> -->

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
                    <PaymentMethods v-model="paymentMethod">
                      <BaseButton
                        type="submit"
                        color="yellow"
                        :disabled="sending"
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

        <FormCheckoutShipping
          v-model:address="shippingAddress"
          v-model:shipping="shippingData"
          :time-slots="timeSlots"
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
  name: 'checkout',
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
  new Date(`${new Date().getFullYear()}-11-1`),
  new Date(`${new Date().getFullYear()}-12-25`),
  new Date(`${new Date().getFullYear()}-12-26`),
  new Date(`${new Date().getFullYear() + 1}-1-1`),
  new Date(`${new Date().getFullYear() + 1}-1-6`),
  new Date(`${new Date().getFullYear() + 1}-4-25`),
  new Date(`${new Date().getFullYear() + 1}-5-1`),
  new Date(`${new Date().getFullYear() + 1}-6-2`),
  new Date(`${new Date().getFullYear() + 1}-8-15`),
  new Date(`${new Date().getFullYear() + 1}-11-1`),
  new Date(`${new Date().getFullYear() + 1}-12-25`),
  new Date(`${new Date().getFullYear() + 1}-12-26`),
])

// Component life-cycle hooks

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
const sending = ref(false)
const {
  isEmpty,
  subTotal,
  total,
  paymentMethod,
  shippingMethod,
  hasFreeShipping,
} = storeToRefs(cart)
const { isLoggedIn } = storeToRefs(user)

const isShippingModalOpen = ref(false)
const isBillingModalOpen = ref(false)

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

const account = await user.load()

const shippingData = ref({
  note: null,
  email: account.value?.email || null,
  phone: account.value?.phone || null,
  timeSlot: timeSlots.value.find(() => true),
  date: null,
})

const billingData = ref({
  invoice: false,
  company: null,
  cfCompany: null,
  vat: null,
  sdi: null,
  pec: null,
  cfPrivate: null,
})

if (isLoggedIn.value) {
  const userBillingAddress = await useApi(
    'shop/addresses/billing',
    {
      method: 'GET',
    },
    {
      cache: false,
      dataOnly: true,
    }
  )

  const { address, invoice } = useBillingAddress(userBillingAddress)

  billingAddress.value = address.value
  billingData.value = invoice.value

  const userShippingAddress = await useApi(
    'shop/addresses/shipping',
    {
      method: 'GET',
    },
    {
      cache: false,
      dataOnly: true,
    }
  )

  shippingAddress.value = { ...userShippingAddress.value }
}

// Watcher

// Computed

// Methods
const toggleShippingModal = (status = null) => {
  isShippingModalOpen.value =
    status !== null ? !!status : !isShippingModalOpen.value
}

const closeShippingModal = () => {
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

const updateAddress = (address) => {
  shippingAddress.value = address
}

const updateShippingMethod = (method) => {
  shippingMethod.value = method
}

// Provide
provide('shipping', {
  address: shippingAddress,
  updateAddress,
  method: shippingMethod,
  updateMethod: updateShippingMethod,
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

  @include typography(18px, 22px);

  @include component('box') {
    height: 100%;
  }

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
