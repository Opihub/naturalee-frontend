<template>
  <main class="s-checkout">
    <Transition name="fade">
      <LoadingOverlay v-if="sending" />
    </Transition>

    <SiteContainer>
      <BaseMessage v-if="isEmpty" :message="$t('cart.empty')" />

      <template v-else>
        <BaseMessage
          v-if="errors.length > 0"
          status="danger"
          class="u-mb-medium"
        >
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </BaseMessage>

        <BaseMessage
          v-if="!hasFreeShipping"
          status="warning"
          class="u-mb-medium"
          >Ti mancano <PriceHolder :price="50 - subTotal" /> per avere la
          spedizione gratuita!
          <BaseLink :to="{ name: 'cart' }" underline color="dark"
            >Vuoi aggiungere altri prodotti al carrello?</BaseLink
          >
        </BaseMessage>

        <FormWrapper
          method="POST"
          class="o-form--checkout"
          @submit.prevent="submitOrder"
        >
          <template
            #default="{
              columnClassName,
              columnHalfClassName,
              columnFullClassName,
              rowClassName: fieldSetClassName,
            }"
          >
            <div :class="[fieldSetClassName, 'o-form__resume']">
              <div :class="fieldSetClassName">
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

                    <ShopAddress :address="billingAddress" />
                  </BaseBox>
                </div>
              </div>

              <CartTable
                readonly
                :products="basket"
                :class="[columnClassName, columnFullClassName]"
              />
            </div>

            <div :class="[fieldSetClassName, 'o-form__action']">
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
                      gridCellFullClassName,
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
                        :price="total || subTotal"
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
            </div>
          </template>
        </FormWrapper>
      </template>
    </SiteContainer>

    <Teleport to="body">
      <ModalContainer
        v-show="isShippingModalOpen"
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
        />
      </ModalContainer>

      <ModalContainer
        v-show="isBillingModalOpen"
        :max-width="1088"
        @close="toggleBillingModal(false)"
      >
        <template #header>
          <BaseHeading tag="h5">{{ $t('orders.billing') }}</BaseHeading>
        </template>

        <FormAddress v-model:address="billingAddress" class="u-mb-half">
          <template #after="{ columnClassName, columnFullClassName }">
            <div :class="[columnClassName, columnFullClassName, 'u-mt-half']">
              <BaseParagraph>{{
                $t('invoice.requestInvoice')
              }}</BaseParagraph>
            </div>

            <FormInvoice v-model:invoice="billingData" />

            <div :class="[columnClassName, columnFullClassName]">
              <BaseButton
                class="u-mt-half"
                color="green"
                type="submit"
                >{{ $t('form.saveChanges') }}</BaseButton
              >
            </div>
          </template>
        </FormAddress>
      </ModalContainer>
    </Teleport>
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

// Component life-cycle hooks
onMounted(async () => {
  if (!isLoggedIn.value) {
    return
  }

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

  billingAddress.value = { ...userBillingAddress.value }

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
})

// Composables
const { sending, send } = useSender()
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
const errors = ref([])

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
  timeSlot: timeSlots.value.find(() => true),
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

const order = useState('order', () => {})

// Watcher

// Computed

// Methods
const toggleShippingModal = (status = null) => {
  isShippingModalOpen.value =
    status !== null ? !!status : !isShippingModalOpen.value
}

const toggleBillingModal = (status = null) => {
  isBillingModalOpen.value =
    status !== null ? !!status : !isBillingModalOpen.value
}

const updateAddress = (address) => {
  shippingAddress.value = address
}

const updateShippingMethod = (method) => {
  shippingMethod.value = method
}

const submitOrder = async () => {
  if (sending.value) {
    return
  }

  errors.value = []
  const { timeSlot, note, email, phone } = shippingData.value
  const { invoice } = billingData.value

  if (!timeSlot) {
    errors.value.push(
      'È obbligatorio riportare la fascia oraria per la consegna'
    )
  }

  if (!email) {
    errors.value.push('È obbligatorio indicare una mail')
  }

  if (!phone) {
    errors.value.push('È obbligatorio indicare un numero di telefono valido')
  }

  if (!shippingMethod.value) {
    errors.value.push('Nessun metodo di spedizione indicato')
  }

  if (cart.checkout.length <= 0) {
    errors.value.push('Nessun prodotto presente nel carrello')
  }

  errors.value = [
    ...errors.value,
    ...validateAddress(shippingAddress, ' per la spedizione'),
  ]

  const formData = {
    shipping: shippingAddress.value,
    timeSlot,
    note,
    email,
    phone,
    invoice,
    products: cart.checkout,
    shippingMethod: shippingMethod.value.id,
    paymentMethod: paymentMethod.value.id,
  }

  if (invoice === 'private') {
    formData.cf = billingData.value.cfPrivate

    if (!billingData.value.cfPrivate) {
      errors.value.push(
        'Il Codice fiscale è obbligatorio per richiedere la fattura'
      )
    }
  } else if (invoice === 'company') {
    formData.vat = billingData.value.vat
    formData.cf = billingData.value.cfCompany
    formData.pec = billingData.value.pec
    formData.sdi = billingData.value.sdi
    formData.company = billingData.value.company

    if (!billingData.value.pec && !billingData.value.sdi) {
      errors.value.push(
        'È necessario specificare almeno un campo tra la PEC ed il Codice univoco'
      )
    }

    if (!billingData.value.company) {
      errors.value.push(
        'La ragione sociale è obbligatoria per richiedere la fattura'
      )
    }

    if (!billingData.value.vat) {
      errors.value.push(
        'La partita IVA è obbligatoria per richiedere la fattura'
      )
    }

    if (!billingData.value.cfCompany) {
      errors.value.push(
        'Il Codice fiscale è obbligatorio per richiedere la fattura'
      )
    }
  }

  if (useDifferentAddress.value) {
    formData.billing = billingAddress.value

    errors.value = [
      ...errors.value,
      ...validateAddress(billingAddress, ' per la fatturazione'),
    ]
  }

  if (errors.value.length > 0) {
    window.scrollTo(0, 0)
    return
  }

  const response = await send(
    async () =>
      await useApi(
        'shop/checkout/save',
        {
          method: 'POST',
          body: formData,
        },
        {
          cache: false,
        }
      )
  )
  console.debug({ ...response.value })

  if (response.value.success) {
    order.value = response.value.data

    await navigateTo({
      path: '/order-confirmed',
      query: {
        orderId: order.value.id,
      },
    })
  } else {
    errors.value = response.value.errors
  }
}

const validateAddress = (address, after = '') => {
  const errors = []

  if (!address.value.firstName) {
    errors.push(`Il nome è un campo obbligatorio${after}`)
  }

  if (!address.value.lastName) {
    errors.push(`Il cognome è un campo obbligatorio${after}`)
  }

  if (!address.value.country) {
    errors.push(`La nazione è un campo obbligatorio${after}`)
  }

  if (!address.value.address) {
    errors.push(`L'indirizzo è un campo obbligatorio${after}`)
  }

  if (!address.value.postcode) {
    errors.push(`IL CAP è un campo obbligatorio${after}`)
  }

  if (!address.value.city) {
    errors.push(`La città è un campo obbligatorio${after}`)
  }

  if (!address.value.province) {
    errors.push(`La provincia è un campo obbligatorio${after}`)
  }

  return errors
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
@include object('form') {
  @include set-local-vars(
    $prefix: 'form',
    $map: (
      row-gap: rem(20px),
    )
  );

  @include modifier('checkout') {
    @include element('resume') {
      width: 100%;
      max-width: rem(1060px);
    }

    @include element('action') {
      width: 100%;
      max-width: rem(520px);
    }
  }
}

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
