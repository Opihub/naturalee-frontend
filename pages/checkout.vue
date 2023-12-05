<template>
  <main class="s-checkout">
    <Transition name="fade">
      <LoadingOverlay v-if="sending" />
    </Transition>

    <SiteContainer>
      <BaseMessage v-if="isEmpty" :message="$t('cart.empty')" />

      <template v-else>
        <FormCheckout
          :use-different-address="useDifferentAddress"
          :shipping-address="shippingAddress"
          :billing-address="billingAddress"
          :shipping-data="{
            note,
            date,
            timeSlot: currentTimeSlot,
            email,
          }"
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
            >
              <i18n-t keypath="freeShipping" class="u-mt-tiny">
                <template #price>
                  <PriceHolder :price="50 - subTotal" />
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

                      <b>{{ getFormattedDate(date) }}</b
                      >,
                      <span>
                        <time>{{ currentTimeSlot.from }}</time> -
                        <time>{{ currentTimeSlot.to }}</time>
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
                    <span>{{ $t('coupon.formTitle') }}</span>

                    <FormCoupon
                      tag="div"
                      class="u-mt-mini"
                      :placeholder="$t('coupon.formPlaceholder')"
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
const basket = await cart.load()

if (cart.subTotal < 20) {
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

const isShippingModalOpen = ref(false)
const isBillingModalOpen = ref(false)

const useDifferentAddress = ref(false)

const shippingAddress = await useApi(
  'shop/addresses/shipping',
  {
    method: 'GET',
  },
  {
    cache: false,
    dataOnly: true,
  }
)

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

// Watcher

// Computed
const currentTimeSlot = computed(() => {
  return timeSlots.value.find((slot) => slot.id === timeSlot.value)
})

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
