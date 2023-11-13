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
  cart: {
    type: Array,
    required: true,
  },
})

// Composables
const { sending, send } = useSender(emit)

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

  const { timeSlot, date, note, email, phone, password, newAccount } =
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

  if (!phone) {
    feedback.errors.push('È obbligatorio indicare un numero di telefono valido')
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
    timeSlot,
    note,
    email,
    phone,
    invoice,
    products: props.cart,
    shippingMethod: props.shippingMethod.id,
    paymentMethod: props.paymentMethod.id,
  }

  if (newAccount) {
    if (!password) {
      feedback.errors.push(
        'È obbligatorio inserire una password se si vuole creare un account'
      )
    } else {
      formData.newAccount = true
      formData.password = password
    }
  }

  if (props.isBilling && !validateInvoice(formData.invoice)) {
    return
  }

  validateInvoice(props.billingData)

  if (invoice === 'private') {
    formData.cf = props.billingData.cfPrivate
  } else if (invoice === 'company') {
    formData.vat = props.billingData.vat
    formData.cf = props.billingData.cfCompany
    formData.pec = props.billingData.pec
    formData.sdi = props.billingData.sdi
    formData.company = props.billingData.company
  }

  // if (useDifferentAddress.value) {
  formData.billing = { ...props.billingAddress }

  validateAddress(props.billingAddress, ' per la fatturazione')
  // }

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
  console.debug({ ...response.value })

  if (response.value.success) {
    await navigateTo({
      path: '/order-confirmed',
      query: {
        orderId: response.value.data.id,
      },
    })
  } else {
    errors.value = response.value.errors
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
