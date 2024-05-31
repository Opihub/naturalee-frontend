<template>
  <FormAddress
    v-model:address="data.address"
    method="POST"
    @submit.prevent="updateAddress"
  >
    <template
      #before="{
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnThirdClassName,
        columnHalfClassName,
      }"
    >
      <slot
        name="before"
        v-bind="{
          rowClassName,
          columnClassName,
          columnFullClassName,
          columnThirdClassName,
          columnHalfClassName,
        }"
      />
    </template>

    <template
      #after="{
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnThirdClassName,
        columnHalfClassName,
      }"
    >
      <slot
        name="after"
        v-bind="{
          rowClassName,
          columnClassName,
          columnFullClassName,
          columnThirdClassName,
          columnHalfClassName,
        }"
      />

      <template v-if="isBilling && editableInvoice">
        <div :class="[columnClassName, columnFullClassName, 'u-mt-half']">
          <slot name="billingHeading">
            <BaseHeading tag="h5">{{ $t('orders.billing') }}</BaseHeading>
          </slot>
        </div>

        <FormInvoice v-model:invoice="data.invoice" />
      </template>

      <div :class="[columnClassName, columnFullClassName]">
        <BaseButton
          class="u-mt-half"
          color="green"
          type="submit"
          :disabled="loading"
          >{{ $t('form.saveChanges') }}</BaseButton
        >
      </div>

      <div
        v-if="showFeedback"
        :class="[columnClassName, columnFullClassName, 'u-mt-ten']"
      >
        <FeedbackMessage :feedback="feedback" />
      </div>
    </template>
  </FormAddress>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'
import { useLoadingStore } from '@/stores/loading'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  isBilling: {
    type: Boolean,
    default: false,
  },
  address: {
    type: Object,
    required: true,
  },
  invoice: {
    type: Object,
    default: null,
  },
  editableInvoice: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:address', 'update:invoice', 'completed'])

// Composables
const user = useAccountStore()
const loadingStore = useLoadingStore()

// Data
const { loading } = storeToRefs(loadingStore)
const { setLoading } = loadingStore

const data = ref({
  address: props.address,
  invoice: props.invoice,
})

const {
  feedback,
  showFeedback,
  hasErrors,
  resetFeedback,
  setSuccess,
  validateAddress,
  validateInvoice,
} = useFeedback()

const { isLoggedIn } = storeToRefs(user)

const { t } = useI18n({
  useScope: 'local',
})
// Watcher
// Methods
const updateAddress = async () => {
  if (loading.value) {
    return
  }

  setLoading(true)

  resetFeedback()

  const formData = data.value

  if (!validateAddress(formData.address)) {
    return
  }

  if (props.isBilling) {
    if (!validateInvoice(formData.invoice)) {
      return
    }

    if (formData.invoice.invoice === 'false') {
      formData.invoice.invoice = false
    }
  }

  if (hasErrors.value) {
    return
  }

  let success = false
  let message = t('addresses.updated', {
    type: props.isBilling ? t('orders.billing') : t('orders.shipping'),
  })

  if (isLoggedIn.value) {
    try {
      const { data: response } = await useApi(
        `/shop/addresses/${props.isBilling ? 'billing' : 'shipping'}/update`,
        {
          method: 'POST',
          body: formData,
          cache: 'no-cache',
        }
      )

      success = response.value.success
      message = response.value.message
    } catch (error) {
      console.warn(error)

      success = false
      message = "È avvenuto un errore durante la modifica dell'indirizzo"
    }
  } else {
    success = true
  }

  if (success) {
    setSuccess()

    emit('update:address', formData.address)

    if (props.isBilling) {
      emit('update:invoice', formData.invoice)
    }

    emit('completed')
  }

  feedback.message = message

  setLoading(false)
}
</script>
