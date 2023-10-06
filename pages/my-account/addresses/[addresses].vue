<template>
  <div>
    <FormAddress
      v-model:address="formData.address"
      method="POST"
      @submit.prevent="updateAddresses"
    >
      <template #after="{ rowClassName }">
        <FormInvoice
          v-if="$route.params.addresses == 'billing'"
          v-model:invoice="formData.invoice"
          class="s-invoice"
        />

        <fieldset :class="rowClassName" class="s-button">
          <div>
            <BaseButton
              class="u-mt-large"
              color="green"
              type="submit"
              :disabled="sending"
              >{{ $t('form.saveChanges') }}</BaseButton
            >
          </div>
        </fieldset>

        <BaseMessage v-if="feedback.status" :status="feedback.status">{{
          feedback.message
        }}</BaseMessage>
      </template>
    </FormAddress>
  </div>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'addresses-details',
})
const emit = defineEmits(['api:start', 'api:end'])

// Component life-cycle hooks

// Composables
const { sending, send, sent } = useSender(emit)
const route = useRoute()
const response = await useApi(
  `/shop/addresses/${route.params.addresses}`,
  {
    method: 'GET',
  },
  {
    cache: false,
  }
)

// Data
const formData = reactive({
  address: {
    firstName: response.value.data.firstName,
    lastName: response.value.data.lastName,
    country: response.value.data.country,
    address: response.value.data.address,
    address2: response.value.data.address2,
    province: response.value.data.province,
    city: response.value.data.city,
    postcode: response.value.data.postcode,
  },
  invoice: {
    invoice: response.value.data.invoice,
    company: response.value.data.company,
    cfPrivate: response.value.data.cfPrivate,
    cfCompany: response.value.data.cfCompany,
    vat: response.value.data.vat,
    sdi: response.value.data.sdi,
    pec: response.value.data.pec,
  },
})

// Watcher

// Computed

// Methods
const updateAddresses = async () => {
  if (sending.value) {
    return
  }
  if (
    formData.address.firstName.trim() == '' &&
    formData.address.lastName.trim() == '' &&
    formData.address.country.trim() == '' &&
    formData.address.address.trim() == '' &&
    formData.address.province.trim() == '' &&
    formData.address.city.trim() == '' &&
    formData.address.postcode.trim() == ''
  ) {
    return notify({
      message: 'Compila i campi obbligatori',
      status: 'danger',
    })
  }
  if (
    formData.invoice.invoice === 'private' &&
    formData.invoice.cfPrivate == ''
  ) {
    return notify({
      message: 'Il codice fiscale è obbligatorio',
      status: 'danger',
    })
  }

  if (
    formData.invoice.invoice === 'company' &&
    formData.invoice.cfCompany.trim() === '' &&
    formData.invoice.company.trim() === '' &&
    formData.invoice.vat.trim() === ''
  ) {
    return notify({
      message: 'Compila i campi obbligatori',
      status: 'danger',
    })
  } else {
    if (
      formData.invoice.sdi.trim() === '' &&
      formData.invoice.pec.trim() === ''
    ) {
      return notify({
        message: 'Codice univoco o PEC obbligatoria',
        status: 'danger',
      })
    }
  }
  const response = await send(
    async () =>
      await useApi(
        `/shop/addresses/${route.params.addresses}/update`,
        {
          method: 'POST',
          body: formData,
        },
        {
          cache: false,
        }
      )
  )

  if (sent) {
    if (response.value.success) {
      feedback.status = 'success'
      feedback.message = response.value.message
    } else {
      notify({
        message: response.value.message,
        status: 'danger',
      })
    }
  }
}
const feedback = reactive({
  status: null,
  message: null,
})
</script>

<style lang="scss" scoped>
@include scope('button') {
  @include set-local-vars(
    $prefix: 'form-fieldset',
    $map: (
      border: none,
    )
  );
  border-color: transparent;
  padding: 0;
}
@include scope('invoice') {
  width: 100%;
}
</style>
