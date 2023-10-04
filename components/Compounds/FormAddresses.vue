<template>
  <FormWrapper
    :class="CSS_NAME"
    method="POST"
    @submit.prevent="updateAddresses()"
  >
    <template
      #default="{
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnHalfClassName,
        columnThirdClassName,
      }"
    >
      <InputField
        v-model="formData.firstName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.name') }}*</InputField
      >

      <InputField
        v-model="formData.lastName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.surname') }}*</InputField
      >

      <CountrySelect
        :class="[columnClassName, columnFullClassName]"
        :model-value="formData.country"
        @update:model-value="provinces"
        >Nazione/Regione</CountrySelect
      >
      <InputField
        v-model="formData.address"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        placeholder="Via/Piazza e Numero Civico"
      >
        Via e Numero*</InputField
      >
      <InputField
        v-model="formData.address2"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        placeholder="Appartamento, suite, unità, piano, ecc. (opzionale)"
      />

      <InputField
        v-model="formData.postcode"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        required
      >
        {{ $t('shipping.postcode') }}*</InputField
      >
      <InputField
        v-model="formData.city"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        required
      >
        Città*</InputField
      >
      <ProvincesSelect
        v-model="formData.province"
        :class="[columnClassName, columnThirdClassName]"
        name="province"
        :provinces="countryData"
        :user-province="formData.province"
      >
        Provincia
      </ProvincesSelect>

      <!-- <InputField
        v-model="formData.phone"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.phone') }}*</InputField
      >
      <InputField
        v-model="formData.email"
        :class="[columnClassName, columnHalfClassName]"
        type="email"
        required
      >
        {{ $t('form.mailField') }}</InputField
      > -->
      <fieldset :class="rowClassName">
        <div :class="[columnClassName, columnFullClassName]">
          <BaseHeading class="u-mt-large s-password" tag="h6"
            >Fatturazione</BaseHeading
          >
        </div>
      </fieldset>
      <fieldset :class="rowClassName">
        <ToggleField
          v-for="invoice in invoices"
          :key="invoice.value"
          :value="invoice.value"
          inline
          radio
          :model-value="formData.invoice === invoice.value"
          @update:model-value="formData.invoice = invoice.value"
        >
          {{ invoice.name }}
        </ToggleField>
      </fieldset>
      <InputField
        v-if="formData.invoice == 'company'"
        v-model="formData.company"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        required
      >
        Azienda</InputField
      >
      <InputField
        v-if="formData.invoice == 'company'"
        v-model="formData.cfCompany"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        Codice fiscale</InputField
      >
      <InputField
        v-if="formData.invoice == 'private'"
        v-model="formData.cfPrivate"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        Codice fiscale</InputField
      >
      <InputField
        v-if="formData.invoice == 'company'"
        v-model="formData.vat"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        Partita IVA</InputField
      >
      <InputField
        v-if="formData.invoice == 'company'"
        v-model="formData.sdi"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        Codice univico</InputField
      >
      <InputField
        v-if="formData.invoice == 'company'"
        v-model="formData.pec"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        PEC</InputField
      >
      <fieldset :class="rowClassName">
        <div :class="[columnClassName, columnFullClassName]">
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
  </FormWrapper>
</template>

<script setup>
// Imports

//Constant
const CSS_NAME = 'c-addresses-form'
const invoices = ref([
  {
    name: 'No',
    value: 'false',
  },
  {
    name: 'Si, sono un privato',
    value: 'private',
  },
  {
    name: "Si, sono un'azienda",
    value: 'company',
  },
])
const countryData = ref([])
// Define (Props, Emits, Page Meta)
const props = defineProps({
  userData: {
    type: Object,
    required: true,
    // validator(value) {
    //   return 'username' in value && 'email' in value
    // },
  },
})
const route = useRoute()
//form data
const formData = reactive({
  firstName: props.userData.firstName,
  lastName: props.userData.lastName,
  email: props.userData.email,
  country: props.userData.country,
  address: props.userData.address,
  address2: props.userData.address2,
  province: props.userData.province,
  city: props.userData.city,
  postcode: props.userData.postcode,
  phone: props.userData.phone,
  invoice: props.userData.invoice,
  company: props.userData.company,
  cfPrivate: props.userData.cfPrivate,
  cfCompany: props.userData.cfCompany,
  vat: props.userData.vat,
  sdi: props.userData.sdi,
  pec: props.userData.pec,
})

const formDataClone = {}

const feedback = reactive({
  status: null,
  message: null,
})

const emit = defineEmits(['api:start', 'api:end'])

const { sending, send, sent } = useSender(emit)

const updateAddresses = async () => {
  if (sending.value) {
    return
  }
  if (
    formData.firstName.trim() == '' &&
    formData.lastName.trim() == '' &&
    formData.country.trim() == '' &&
    formData.address.trim() == '' &&
    formData.province.trim() == '' &&
    formData.city.trim() == '' &&
    formData.postcode.trim() == ''
  ) {
    return notify({
      message: 'Compila i campi obbligatori',
      status: 'danger',
    })
  }
  if (formData.invoice === 'private' && formData.cfPrivate == '') {
    return notify({
      message: 'Il codice fiscale è obbligatorio',
      status: 'danger',
    })
  }

  if (
    formData.invoice.trim() === 'company' &&
    formData.cfCompany.trim() === '' &&
    formData.company.trim() === '' &&
    formData.vat.trim() === ''
  ) {
    return notify({
      message: 'Compila i campi obbligatori',
      status: 'danger',
    })
  } else {
    if (formData.sdi.trim() === '' && formData.pec.trim() === '') {
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
const provinces = async (value) => {
  if (Object.keys(formDataClone).length === 0) {
    formDataClone.value = { ...formData }
  }

  formData.country = value
  const province = await useApi(
    `/countries/${value}`,
    {
      method: 'GET',
    },
    {
      cache: false,
    }
  )

  countryData.value = province.value.data.provinces
  if (formData.country !== formDataClone.value.country) {
    formData.province = ''
  } else {
    formData.province = formDataClone.value.province
  }
}

onMounted(() => {
  provinces(formData.country)
})
</script>

<style lang="scss">
$prefix: 'addresses-form';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'form',
    $map: (
      columns: 3,
      fieldset-gap: rem(20px),
      fieldset-border: 2px solid get-var(color-white),
    )
  );
}
@include scope('password') {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );
}
</style>
