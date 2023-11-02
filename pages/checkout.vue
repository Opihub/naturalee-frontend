<template>
  <main class="s-checkout">
    <Transition name="fade">
      <LoadingOverlay v-if="sending" />
    </Transition>

    <SiteContainer>
      <BaseMessage v-if="errors.length > 0" status="danger" class="u-mb-medium">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </BaseMessage>

      <form method="POST" class="o-row" @submit.prevent="submitOrder">
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
              v-if="useDifferentAddress"
              v-model:address="billingAddress"
              class="u-mt-half"
              tag="div"
            />
          </BaseBox>
        </SiteContainer>

        <SiteContainer :max-width="520" padless>
          <CheckoutCart :products="basket || []" :sub-total="subTotal" />

          <OrderResume
            v-model:address="shippingAddress"
            container-class="u-mt-huge"
            :sub-total="total"
            :heading="$t('checkout.payment')"
            without-sub-total
          >
            <template #after="{ footerClassName }">
              <div :class="footerClassName">
                <PaymentMethods v-model="paymentMethod">
                  <BaseButton type="submit" color="yellow" :disabled="sending"
                    >Paga ora</BaseButton
                  >
                </PaymentMethods>
              </div>
            </template>
          </OrderResume>
        </SiteContainer>
        <!-- </template> -->

        <!-- <BaseMessage v-else :message="$t('cart.empty')" /> -->
      </form>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import { useAccountStore } from '@/stores/account'
import { useShippingStore } from '@/stores/shipping'

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
})

// Composables
const { sending, send } = useSender()
const cart = useCartStore()
const user = useAccountStore()
const shippingStore = useShippingStore()
const timeSlots = await useApi(
  'time-slots',
  {},
  {
    dataOnly: true,
  }
)

// Data
const { isEmpty, subTotal, total, paymentMethod, shippingMethod } =
  storeToRefs(cart)
const { isLoggedIn } = storeToRefs(user)

const basket = await cart.load()
const shippingAddress = await shippingStore.load()

const useDifferentAddress = ref(false)
const errors = ref([])

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

const order = useState('order', () => {})

// Watcher

// Computed

// Methods
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
  const { timeSlot, note, email, phone, date } = shippingData.value
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

  if (!date) {
    errors.value.push('È obbligatorio indicare una data di spedizione')
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
    date,
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
@include scope('checkout') {
  font-family: get-var(family-text);

  @include set-local-vars(
    $prefix: 'box',
    $map: (
      body-background: get-var(color-light),
    )
  );

  @include set-local-vars(
    $prefix: 'order-resume',
    $map: (
      border-bottom: 2px,
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
