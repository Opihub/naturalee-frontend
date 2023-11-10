<template>
  <FeedbackMessage v-if="showFeedback" class="u-mb-medium" />

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
  timeSlots: {
    type: Array,
    default() {
      return []
    },
  },
  cart: {
    type: Array,
    required: true,
  },
})

// Composables
const { sending, send } = useSender(emit)

// Data
const { feedback, showFeedback, hasErrors, resetFeedback, validateAddress } =
  useFeedback()

// Methods
const submitOrder = async () => {
  if (sending.value) {
    return
  }

  resetFeedback()

  const { timeSlot: timeSlotId, note, email, phone } = props.shippingData
  const { invoice } = props.billingData

  if (!timeSlotId) {
    feedback.value.errors.push(
      'È obbligatorio riportare la fascia oraria per la consegna'
    )
  } else {
    const timeSlot = props.timeSlots.find(
      (timeSlot) => timeSlot.id === timeSlotId
    )

    if (!timeSlot) {
      feedback.value.errors.push('La fascia oraria indicata non è valida')
    }
  }

  if (!email) {
    feedback.value.errors.push('È obbligatorio indicare una mail')
  }

  if (!phone) {
    feedback.value.errors.push(
      'È obbligatorio indicare un numero di telefono valido'
    )
  }

  if (!props.shippingMethod.value) {
    feedback.value.errors.push('Nessun metodo di spedizione indicato')
  }

  if (!props.paymentMethod.value) {
    feedback.value.errors.push('Nessun metodo di spedizione indicato')
  }

  if (props.cart.length <= 0) {
    feedback.value.errors.push('Nessun prodotto presente nel carrello')
  }

  validateAddress(props.shippingAddress, ' per la spedizione')

  const formData = {
    shipping: props.shippingAddress.value,
    timeSlot,
    note,
    email,
    phone,
    invoice,
    products: props.cart,
    shippingMethod: props.shippingMethod.id,
    paymentMethod: props.paymentMethod.id,
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
  //   formData.billing = props.billingAddress.value

  //   validateAddress(props.billingAddress, ' per la fatturazione')
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
