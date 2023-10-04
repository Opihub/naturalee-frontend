<template>
  <form method="POST" :class="CSS_NAME" @submit.prevent="updateShippingAddress">
    <input v-model="formData.country" type="hidden" name="country" />

    <InputField
      v-model="formData.state"
      type="select"
      name="state"
      :placeholder="$t('shipping.city')"
      class="u-mb-small"
      :data="provinces"
      error-after
      rounded
      required
    />

    <InputField
      v-model="formData.city"
      type="text"
      name="city"
      :placeholder="$t('shipping.city')"
      class="u-mb-small"
      error-after
      rounded
      required
    />

    <InputField
      v-model="formData.postcode"
      type="text"
      name="postcode"
      :placeholder="$t('shipping.postcode')"
      class="u-mb-small"
      error="CAP non valido"
      pattern="\d{5}"
      error-after
      rounded
      required
    />

    <BaseButton color="green" type="submit">Aggiorna</BaseButton>
  </form>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-shipping-form'

// Define (Props, Emits, Page Meta)
const emit = defineEmits(['update', 'api:start', 'api:end'])

// Component life-cycle hooks

// Composables
const { sending, send } = useSender(emit)

// Data
const formData = reactive({
  country: 'it',
  state: '',
  city: '',
  postcode: '',
})

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

// Watcher

// Computed

// Methods
const updateShippingAddress = async () => {
  if (sending.value) {
    return
  }

  const response = await send(
    async () =>
      await useApi(
        'shop/checkout/validate/shipping',
        {
          method: 'POST',
          body: formData,
        },
        {
          cache: false,
        }
      )
  )

  const notification = {
    message: "È avvenuto un errore durante l'aggiornamento dell'indirizzo",
    status: 'danger'
  }

  notification.message = response.value.message

  if (response.value.success) {
    notification.status = 'success'

    emit('update', {
      data: formData,
      methods: response.value.data
    })
  }

  notify(notification)
}
</script>

<style lang="scss">
$prefix: 'shipping-form';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'input-field-error',
    $map: (
      margin: 0 rem(20px),
    )
  );
}
</style>
