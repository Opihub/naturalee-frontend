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

import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

const { loading } = storeToRefs(loadingStore)
const { setLoading } = loadingStore

// Define (Props, Emits, Page Meta)
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
const { requestPaymentIntent, clearPaymentIntent, clearCart, removeCoupon } =
  cartStore

const stripe = inject('stripe')
const orderId = ref(null)

// Methods
const submitOrder = async () => {
  if (!props.canSubmit) {
    return
  }

  if (loading.value) {
    return
  }

  setLoading(true)

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
    invoice,
    coupon: props.coupon,
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
    setLoading(false)
    window.scrollTo(0, 0)
    return
  }

  try {
    // Se è Stripe, genero il paymentIntent
    if (props.paymentMethod.id === 'stripe') {
      const paymentIntentData = { ...formData }

      const response = await requestPaymentIntent(email, paymentIntentData)

      if (!response) {
        throw new Error(
          'È avvenuto un errore durante il pagamento. Si prega di riprovare'
        )
      }

      formData.paymentIntentId = response.value.intentId
    }

    formData.products = props.cart.map((item) => ({
      id: item.id,
      variationId: item.variationId,
      quantity: item.quantity,
      title: item.title,
    }))

    formData.email = email
    formData.orderId = orderId.value

    // Registro l'ordine
    const { data: response } = await useApi('shop/checkout/save', {
      method: 'POST',
      body: formData,
      cache: 'no-cache',
    })

    // Se la registrazione dell'ordine non va a buon fine, allora mostro le motivazioni
    if (!response.value.success) {
      throw new Error(
        "È avvenuto un errore durante l'inserimento dell'ordine. Si prega di riprovare",
        {
          cause: response.value.errors,
        }
      )
    }

    orderId.value = response.value.data.id
    formData.shipping.cost = response.value.data.shipping.cost

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
      if (response?.error) {
        clearPaymentIntent()

        console.error(response?.error?.message)
        let message =
          'È avvenuto un errore durante il pagamento. Controlla i dati della carta di credito e riprovare'

        if (
          ['resource_missing', 'invalid_request_error'].includes(
            response.error?.code
          )
        ) {
          message =
            'È avvenuto un errore durante il checkout. Riprova ad effettuare il pagamento'
        }

        throw new Error(message, {
          cause: response.error,
        })
      }
    }

    const extraValue = {}

    if (formData.coupon) {
      extraValue.coupon = formData.coupon
    }

    extraValue.transaction_id = orderId.value

    if (formData.shipping.cost > 0) {
      extraValue.shipping = formData.shipping.cost
    }
    trackEcommerceEvent('purchase', props.cart, extraValue)

    // Una volta che l'ordine è ok, pulisco il carrello e rimuovo i coupon,
    // quindi procedo alla pagina di conferma ordine
    await clearCart(true)

    removeCoupon()

    clearPaymentIntent()

    await navigateTo({
      name: 'order-confirmed',
      query: {
        orderId: orderId.value,
      },
    })
  } catch (error) {
    console.warn(error)

    feedback.errors.push(error.message)
  } finally {
    setLoading(false)
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
