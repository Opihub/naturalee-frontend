<template>
  <section class="s-edit-address">
    <BaseHeading
      tag="h1"
      use="h3"
      class="u-mb-large"
      color="black"
      :text="$t(`addresses.${$route.params.address}`)"
    />

    <FormAddress
      v-model:address="data.address"
      method="POST"
      @submit.prevent="updateAddress"
    >
      <template #after="{ columnClassName, columnFullClassName }">
        <template v-if="isBilling">
          <div :class="[columnClassName, columnFullClassName, 'u-mt-half']">
            <BaseHeading tag="h5">{{ $t('orders.billing') }}</BaseHeading>
          </div>

          <FormInvoice v-model:invoice="data.invoice" class="s-invoice" />
        </template>

        <div :class="[columnClassName, columnFullClassName]">
          <BaseButton
            class="u-mt-half"
            color="green"
            type="submit"
            :disabled="sending"
            >{{ $t('form.saveChanges') }}</BaseButton
          >
        </div>

        <div
          v-if="feedback.message || feedback.errors.length > 0"
          :class="[columnClassName, columnFullClassName, 'u-mt-ten']"
        >
          <BaseMessage :status="feedback.status">
            <span>{{ feedback.message }}</span>
            <ul v-if="feedback.errors && feedback.errors.length > 0">
              <li v-for="(error, index) in errors" :key="index">
                {{ error }}
              </li>
            </ul>
          </BaseMessage>
        </div>
      </template>
    </FormAddress>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'address-details',
})

defineI18nRoute({
  paths: {
    it: '/il-mio-account/indirizzi/[address]',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Composables
const { sending, send } = useSender()
const route = useRoute()
const response = await useApi(
  `/shop/addresses/${route.params.address}`,
  {
    method: 'GET',
  },
  {
    cache: false,
    dataOnly: true,
  }
)

// Data
const isBilling = ref(route.params.address === 'billing')
const data = ref({
  address: {
    firstName: response.value.firstName,
    lastName: response.value.lastName,
    country: response.value.country,
    address: response.value.address,
    address2: response.value.address2,
    province: response.value.province,
    city: response.value.city,
    postcode: response.value.postcode,
  },
  invoice: {
    invoice: response.value.invoice,
    company: response.value.company,
    cfPrivate: response.value.cfPrivate,
    cfCompany: response.value.cfCompany,
    vat: response.value.vat,
    sdi: response.value.sdi,
    pec: response.value.pec,
  },
})
const feedback = reactive({
  status: 'danger',
  message: null,
  errors: [],
})

// Watcher

// Computed

// Methods
const updateAddress = async () => {
  if (sending.value) {
    return
  }

  feedback.message = null
  feedback.errors = []
  feedback.status = 'danger'

  const formData = data.value

  if (
    !formData.address.firstName ||
    !formData.address.lastName ||
    !formData.address.country ||
    !formData.address.address ||
    !formData.address.province ||
    !formData.address.city ||
    !formData.address.postcode
  ) {
    feedback.message = 'Compila tutti i campi obbligatori'

    return
  }

  if (isBilling) {
    switch (formData.invoice.invoice) {
      case 'private':
        if (!formData.invoice.cfPrivate) {
          feedback.message = 'Il codice fiscale è obbligatorio'
        }
        break

      case 'company':
        if (!formData.invoice.cfCompany) {
          feedback.errors.push('Il codice fiscale è obbligatorio')
        }
        if (!formData.invoice.company) {
          feedback.errors.push("L'azienda è un campo obbligatorio")
        }
        if (!formData.invoice.vat) {
          feedback.errors.push('La partita IVA è obbligatoria')
        }
        if (!formData.invoice.sdi && formData.invoice.pec) {
          feedback.errors.push('Codice univoco o PEC obbligatoria')
        }
        break

      default:
        break
    }
  }

  if (feedback.errors.length > 0 || feedback.message) {
    return
  }

  const response = await send(
    async () =>
      await useApi(
        `/shop/addresses/${route.params.address}/update`,
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
    feedback.status = 'success'
  }

  feedback.message = response.value.message
}
</script>

<style lang="scss" scoped>
@include scope('s-edit-address') {
  @include scope('invoice') {
    width: 100%;
  }
}
</style>
