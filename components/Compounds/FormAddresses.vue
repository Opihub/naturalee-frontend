<template>
  <FormWrapper
    :class="CSS_NAME"
    method="POST"
    @submit.prevent="updateAddresses()"
  >
    <template
      #default="{
        columnFullClassName,
        columnHalfClassName,
        columnClassName,
        columnOneThirdClassName,
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

      <InputField
        v-model="formData.country"
        :class="[columnClassName, columnFullClassName]"
        type="text"
      >
        Paese/Regione</InputField
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
        v-model="formData.zip"
        :class="[columnClassName, columnOneThirdClassName]"
        type="text"
        required
      >
        {{ $t('shipping.postcode') }}*</InputField
      >
      <InputField
        v-model="formData.city"
        :class="[columnClassName, columnOneThirdClassName]"
        type="text"
        required
      >
        Città*</InputField
      >
      <InputField
        v-model="formData.province"
        :class="[columnClassName, columnOneThirdClassName]"
        type="select"
        :data="provinces"
        required
      >
        Provincia*</InputField
      >

      <InputField
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
      >

      <BaseHeading class="u-mt-large s-password" tag="h6"
        >Fatturazione</BaseHeading
      >
      <ToggleField
        v-for="invoice in invoices"
        :key="invoice.value"
        :value="invoice.value"
        inline
        :model-value="selectedInvoice === invoice.value"
        @update:model-value="selectedInvoice = invoice.value"
      >
        {{ invoice.name }}
      </ToggleField>
      <InputField
        v-if="formData.invoice == 'company'"
        v-model="formData.company"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        Azienda</InputField
      >
      <InputField
        v-if="formData.invoice == 'company' || formData.invoice == 'private'"
        v-model="formData.cf"
        :class="[columnClassName, columnFullClassName]"
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
        required
      >
        Codice univico</InputField
      >
      <InputField
        v-if="formData.invoice == 'company'"
        v-model="formData.pec"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        required
      >
        PEC</InputField
      >
      <BaseButton
        class="u-mt-large"
        color="green"
        type="submit"
        :disabled="sending"
        >{{ $t('form.saveChanges') }}</BaseButton
      >
      <BaseMessage v-if="feedback.status" :status="feedback.status">{{
        feedback.message
      }}</BaseMessage>
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports

const CSS_NAME = 'c-profile-update-form'
const provinces = ref({
  AG: 'Agrigento',
  AL: 'Alessandria',
  AN: 'Ancona',
  AO: 'Aosta',
  AR: 'Arezzo',
  AP: 'Ascoli Piceno',
  AT: 'Asti',
  AV: 'Avellino',
  BA: 'Bari',
  BT: 'Barletta-Andria-Trani',
  BL: 'Belluno',
  BN: 'Benevento',
  BG: 'Bergamo',
  BI: 'Biella',
  BO: 'Bologna',
  BZ: 'Bolzano',
  BS: 'Brescia',
  BR: 'Brindisi',
  CA: 'Cagliari',
  CL: 'Caltanissetta',
  CB: 'Campobasso',
  CE: 'Caserta',
  CT: 'Catania',
  CZ: 'Catanzaro',
  CH: 'Chieti',
  CO: 'Como',
  CS: 'Cosenza',
  CR: 'Cremona',
  KR: 'Crotone',
  CN: 'Cuneo',
  EN: 'Enna',
  FM: 'Fermo',
  FE: 'Ferrara',
  FI: 'Firenze',
  FG: 'Foggia',
  FC: 'Forlì-Cesena',
  FR: 'Frosinone',
  GE: 'Genova',
  GO: 'Gorizia',
  GR: 'Grosseto',
  IM: 'Imperia',
  IS: 'Isernia',
  SP: 'La Spezia',
  AQ: "L'Aquila",
  LT: 'Latina',
  LE: 'Lecce',
  LC: 'Lecco',
  LI: 'Livorno',
  LO: 'Lodi',
  LU: 'Lucca',
  MC: 'Macerata',
  MN: 'Mantova',
  MS: 'Massa-Carrara',
  MT: 'Matera',
  ME: 'Messina',
  MI: 'Milano',
  MO: 'Modena',
  MB: 'Monza e della Brianza',
  NA: 'Napoli',
  NO: 'Novara',
  NU: 'Nuoro',
  OR: 'Oristano',
  PD: 'Padova',
  PA: 'Palermo',
  PR: 'Parma',
  PV: 'Pavia',
  PG: 'Perugia',
  PU: 'Pesaro e Urbino',
  PE: 'Pescara',
  PC: 'Piacenza',
  PI: 'Pisa',
  PT: 'Pistoia',
  PN: 'Pordenone',
  PZ: 'Potenza',
  PO: 'Prato',
  RG: 'Ragusa',
  RA: 'Ravenna',
  RC: 'Reggio Calabria',
  RE: 'Reggio Emilia',
  RI: 'Rieti',
  RN: 'Rimini',
  RM: 'Roma',
  RO: 'Rovigo',
  SA: 'Salerno',
  SS: 'Sassari',
  SV: 'Savona',
  SI: 'Siena',
  SR: 'Siracusa',
  SO: 'Sondrio',
  SU: 'Sud Sardegna',
  TA: 'Taranto',
  TE: 'Teramo',
  TR: 'Terni',
  TO: 'Torino',
  TP: 'Trapani',
  TN: 'Trento',
  TV: 'Treviso',
  TS: 'Trieste',
  UD: 'Udine',
  VA: 'Varese',
  VE: 'Venezia',
  VB: 'Verbano-Cusio-Ossola',
  VC: 'Vercelli',
  VR: 'Verona',
  VV: 'Vibo Valentia',
  VI: 'Vicenza',
  VT: 'Viterbo',
})
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
  zip: props.userData.zip,
  phone: props.userData.phone,
  invoice: props.userData.invoice,
  company: props.userData.company,
  cf: props.userData.cf,
  vat: props.userData.vat,
  sdi: props.userData.sdi,
  pec: props.userData.pec,
})

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
    formData.email.trim() == '' &&
    formData.country.trim() == '' &&
    formData.address.trim() == '' &&
    formData.province.trim() == '' &&
    formData.city.trim() == '' &&
    formData.zip.trim() == '' &&
    formData.phone.trim() == ''
  ) {
    return notify({
      message: 'compila i campi obbligatori',
      status: 'danger',
    })
  }
  if (formData.invoice === 'private' && formData.cf == '') {
    return notify({
      message: 'il codice fiscale è obbligatorio',
      status: 'danger',
    })
  }

  if (
    formData.invoice.trim() === 'company' &&
    formData.cf.trim() == '' &&
    formData.company.trim() == '' &&
    formData.sdi.trim() == '' &&
    formData.vat.trim() == '' &&
    formData.pec.trim() == ''
  ) {
    return notify({
      message: 'compila i campi obbligatori',
      status: 'danger',
    })
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
</script>

<style lang="scss">
@include scope('password') {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );
}
</style>
