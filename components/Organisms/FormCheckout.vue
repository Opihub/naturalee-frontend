<template>
  <FeedbackMessage
    v-if="showFeedback"
    :feedback="feedback"
    class="u-mb-medium"
  />
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
        rowClassName,
      }"
    >
      <div :class="[rowClassName, 'o-form__resume']">
        <slot
          name="resume"
          v-bind="{
            columnClassName,
            columnHalfClassName,
            columnFullClassName,
            rowClassName,
          }"
        />
      </div>

      <div :class="[rowClassName, 'o-form__action']">
        <slot
          name="action"
          v-bind="{
            columnClassName,
            columnHalfClassName,
            columnFullClassName,
            rowClassName,
          }"
        />
      </div>
    </template>
  </FormWrapper>
</template>

<script setup>
//Imports
import { useCartStore } from '@/stores/cart'
// Define (Props, Emits, Page Meta)
const emit = defineEmits(['api:start', 'api:end'])
const props = defineProps({
  shippingAddress: {
    type: Object,
    required: true,
  },
  billingAddress: {
    type: Object,
    required: true,
  },
  shippingData: {
    type: Object,
    required: true,
  },
  billingData: {
    type: Object,
    required: true,
  },
  shippingMethod: {
    type: Object,
    default: null,
  },
  paymentMethod: {
    type: Object,
    default: null,
  },
  stripeCard: {
    type: Object,
    default: null,
  },
  coupon: {
    type: String,
    default: null,
  },
  cart: {
    type: Array,
    required: true,
  },
  useDifferentAddress: {
    type: Boolean,
    required: true,
  },
  canSubmit: {
    type: Boolean,
    default: true,
  },
})

// Composables
const cartStore = useCartStore()

// Data
const {
  feedback,
  showFeedback,
  hasErrors,
  resetFeedback,
  validateAddress,
  validateInvoice,
} = useFeedback()

const { stripePaymentIntent } = storeToRefs(cartStore)
const { requestPaymentIntent, clearCart, removeCoupon } = cartStore

const stripe = inject('stripe')

const sending = ref(false)

// Methods
const submitOrder = async () => {
  if (!props.canSubmit) {
    return
  }

  if (sending.value) {
    return
  }

  sending.value = true

  resetFeedback()

  const { timeSlot, date, note, email } = props.shippingData
  const { invoice } = props.billingData

  if (!date) {
    feedback.errors.push('È obbligatorio indicare una data per la consegna')
  }

  if (!timeSlot) {
    feedback.errors.push(
      'È obbligatorio riportare la fascia oraria per la consegna'
    )
  }

  if (!email) {
    feedback.errors.push('È obbligatorio indicare una mail')
  }

  if (!props.shippingMethod?.value) {
    feedback.errors.push('Nessun metodo di spedizione indicato')
  }

  if (!props.paymentMethod?.value) {
    feedback.errors.push('Nessun metodo di spedizione indicato')
  }

  if (props.cart.length <= 0) {
    feedback.errors.push('Nessun prodotto presente nel carrello')
  }

  validateAddress(props.shippingAddress, ' per la spedizione')

  const formData = {
    shipping: { ...props.shippingAddress },
    date,
    timeSlot,
    note,
    email,
    invoice,
    coupon: props.coupon,
    products: props.cart,
    shippingMethod: props.shippingMethod.id,
    paymentMethod: props.paymentMethod.id,
  }

  // Valido i campi della fatturazione indifferentemente da quelli dell'indirizzo
  validateInvoice(invoice)

  // Se devo usare un
  if (props.useDifferentAddress) {
    validateAddress(props.billingAddress, ' per la fatturazione')

    formData.billing = { ...props.billingAddress }
  } else {
    formData.billing = { ...props.shippingAddress }
  }

  if (invoice === 'private') {
    formData.cf = props.billingData.cfPrivate
  } else if (invoice === 'company') {
    formData.vat = props.billingData.vat
    formData.cf = props.billingData.cfCompany
    formData.pec = props.billingData.pec
    formData.sdi = props.billingData.sdi
    formData.company = props.billingData.company
  }

  if (hasErrors.value) {
    sending.value = false
    window.scrollTo(0, 0)
    return
  }

  try {
    emit('api:start')

    // Se è Stripe, genero il paymentIntent
    if (props.paymentMethod.id === 'stripe') {
      const paymentIntentData = { ...formData }
      delete paymentIntentData.products
      delete paymentIntentData.email

      const response = await requestPaymentIntent(email, paymentIntentData)

      if (!response) {
        throw new Error(
          'È avvenuto un errore durante il pagamento. Si prega di riprovare'
        )
      }

      formData.paymentIntentId = response.value.intentId
    }

    // Registro l'ordine
    const response = await useApi(
      'shop/checkout/save',
      {
        method: 'POST',
        body: formData,
      },
      {
        cache: false,
      }
    )

    // Se la registrazione dell'ordine non va a buon fine, allora mostro le motivazioni
    if (!response.value.success) {
      throw new Error(
        "È avvenuto un errore durante l'inserimento dell'ordine. Si prega di riprovare",
        {
          cause: response.value.errors,
        }
      )
    }

    const orderId = response.value.data.id

    // Se si paga tramite Stripe, allora aspetto la creazione dell'ordine
    // prima di mandare il pagamento a Stripe
    if (props.paymentMethod.id === 'stripe') {
      const response = await stripe.value.confirmCardPayment(
        stripePaymentIntent.value.clientSecret,
        {
          payment_method: {
            card: props.stripeCard,
          },
          receipt_email: email.value,
        }
      )

      // Se il pagamento via Stripe fallisce, allora
      if (
        !('status' in response.paymentIntent) ||
        response.paymentIntent?.status !== 'succeeded'
      ) {
        throw new Error(
          'È avvenuto un errore durante il pagamento. Si prega di riprovare',
          {
            cause: response.error,
          }
        )
      }
    }

    // Una volta che l'ordine è ok, pulisco il carrello e rimuovo i coupon,
    // quindi procedo alla pagina di conferma ordine
    await clearCart()

    removeCoupon()

    stripePaymentIntent.value = null

    await navigateTo({
      name: 'order-confirmed',
      query: {
        orderId: orderId,
      },
    })
  } catch (error) {
    console.log(error)
    console.log(error.cause)

    feedback.errors.push(error.message)
  } finally {
    sending.value = false
    emit('api:end')
  }
}
</script>

<style lang="scss" scoped>
@include object('form') {
  @include set-local-vars(
    $prefix: 'form',
    $map: (
      row-gap: rem(20px),
    )
  );

  align-items: flex-start;

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
</style>
