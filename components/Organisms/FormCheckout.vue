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
})

// Composables
const { sending, send } = useSender(emit)
const useCart = useCartStore()

// Data
const {
  feedback,
  showFeedback,
  hasErrors,
  resetFeedback,
  validateAddress,
  validateInvoice,
} = useFeedback()

// Methods
const submitOrder = async () => {
  if (sending.value) {
    return
  }

  resetFeedback()

  const { timeSlot, date, note, email, } =
    props.shippingData
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
  validateInvoice(formData.invoice)

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

  if (response.value.success) {
    const { clearCart, removeCoupon } = useCart
    await clearCart(false)
    await removeCoupon()

    await navigateTo({
      name: 'order-confirmed',
      query: {
        orderId: response.value.data.id,
      },
    })

    return
  }

  feedback.errors.value = response.value.errors
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
