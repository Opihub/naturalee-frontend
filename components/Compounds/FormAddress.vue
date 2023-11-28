<template>
  <FormWrapper :class="CSS_NAME">
    <template
      #default="{
        className,
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnHalfClassName,
        columnThirdClassName,
        columnQuarterClassName,
      }"
    >
      <slot
        name="before"
        v-bind="{
          className,
          rowClassName,
          columnClassName,
          columnFullClassName,
          columnHalfClassName,
          columnThirdClassName,
          columnQuarterClassName,
        }"
      />

      <InputField
        :model-value="address.firstName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        name="firstName"
        required
        @update:model-value="(value) => updateAddress(value, 'firstName')"
      >
        {{ $t('form.name') }}</InputField
      >

      <InputField
        :model-value="address.lastName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        name="lastName"
        required
        @update:model-value="(value) => updateAddress(value, 'lastName')"
      >
        {{ $t('form.surname') }}</InputField
      >

      <input type="hidden" :value="address.country" />

      <InputField
        :model-value="address.address"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        name="address"
        required
        :placeholder="$t('addresses.addressPlaceholder')"
        @update:model-value="(value) => updateAddress(value, 'address')"
      >
        {{ $t('addresses.address') }}</InputField
      >

      <InputField
        :model-value="address.address2"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        name="address2"
        :placeholder="$t('addresses.address2')"
        @update:model-value="(value) => updateAddress(value, 'address2')"
      />

      <InputField
        :model-value="address.province"
        :class="[columnClassName, columnThirdClassName]"
        type="select"
        name="province"
        :data="provinces"
        required
        @update:model-value="(value) => updateAddress(value, 'province')"
      >
        {{ $t('addresses.province') }}
      </InputField>

      <InputField
        :model-value="address.city"
        :class="[columnClassName, columnThirdClassName]"
        type="select"
        name="city"
        :data="cities()"
        required
        :disabled="!address.province"
        @update:model-value="(value) => updateAddress(value, 'city')"
      >
        {{ $t('addresses.city') }}</InputField
      >

      <InputField
        :model-value="address.postcode"
        :class="[columnClassName, columnThirdClassName]"
        type="select"
        name="postcode"
        :data="postcodes()"
        required
        :readonly="postcodes().length === 1"
        :disabled="!address.city"
        @update:model-value="(value) => updateAddress(value, 'postcode')"
      >
        {{ $t('addresses.postcode') }}</InputField
      >

      <slot
        name="after"
        v-bind="{
          className,
          rowClassName,
          columnClassName,
          columnFullClassName,
          columnHalfClassName,
          columnThirdClassName,
          columnQuarterClassName,
        }"
      />
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports

// Constant
const CSS_NAME = 'c-addresses-form'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  address: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:address'])

// Methods
const updateAddress = (value, field) => {
  const newAddress = { ...props.address }
  if (!newAddress.country) {
    newAddress.country = 'IT'
  }

  newAddress[field] = value.trim()

  if (newAddress[field] === props.address[field]) {
    return
  }

  switch (field) {
    case 'province':
      newAddress.city = cities.value(value).find(() => true).id
      newAddress.postcode = postcodes
        .value(newAddress.city, value)
        .find(() => true).id
      break
    case 'city':
      newAddress.postcode = postcodes.value(value).find(() => true).id
      break
    default:
      break
  }

  emit('update:address', newAddress)
}

// Composables

// Data
const locations = ref([
  {
    id: 'MI',
    name: 'Milano',
    cities: [
      { name: 'Abbiategrasso', postcodes: [20081] },
      { name: 'Albairate', postcodes: [20080] },
      { name: 'Arconate', postcodes: [20020] },
      { name: 'Arese', postcodes: [20044] },
      { name: 'Arluno', postcodes: [20004] },
      { name: 'Assago', postcodes: [20057] },
      { name: 'Baranzate', postcodes: [20021] },
      { name: 'Bareggio', postcodes: [20008] },
      { name: 'Basiano', postcodes: [20060] },
      { name: 'Basiglio', postcodes: [20079] },
      { name: 'Bellinzago Lombardo', postcodes: [20060] },
      { name: 'Bernate Ticino', postcodes: [20010] },
      { name: 'Besate', postcodes: [20080] },
      { name: 'Binasco', postcodes: [20082] },
      { name: 'Boffalora sopra Ticino', postcodes: [20010] },
      { name: 'Bollate', postcodes: [20021] },
      { name: 'Bresso', postcodes: [20091] },
      { name: 'Bubbiano', postcodes: [20080] },
      { name: 'Buccinasco', postcodes: [20090] },
      { name: 'Buscate', postcodes: [20010] },
      { name: 'Bussero', postcodes: [20041] },
      { name: 'Busto Garolfo', postcodes: [20038] },
      { name: 'Calvignasco', postcodes: [20080] },
      { name: 'Cambiago', postcodes: [20040] },
      { name: 'Canegrate', postcodes: [20039] },
      { name: 'Carpiano', postcodes: [20074] },
      { name: 'Carugate', postcodes: [20061] },
      { name: 'Casarile', postcodes: [20059] },
      { name: 'Casorezzo', postcodes: [20003] },
      { name: "Cassano d'Adda", postcodes: [20062] },
      { name: "Cassina de' Pecchi", postcodes: [20051] },
      { name: 'Cassinetta di Lugagnano', postcodes: [20081] },
      { name: 'Castano Primo', postcodes: [20022] },
      { name: 'Cernusco sul Naviglio', postcodes: [20063] },
      { name: 'Cerro al Lambro', postcodes: [20070] },
      { name: 'Cerro Maggiore', postcodes: [20023] },
      { name: 'Cesano Boscone', postcodes: [20090] },
      { name: 'Cesate', postcodes: [20031] },
      { name: 'Cinisello Balsamo', postcodes: [20092] },
      { name: 'Cisliano', postcodes: [20046] },
      { name: 'Cologno Monzese', postcodes: [20093] },
      { name: 'Colturano', postcodes: [20075] },
      { name: 'Corbetta', postcodes: [20011] },
      { name: 'Cormano', postcodes: [20032] },
      { name: 'Cornaredo', postcodes: [20007] },
      { name: 'Corsico', postcodes: [20094] },
      { name: 'Cuggiono', postcodes: [20012] },
      { name: 'Cusago', postcodes: [20047] },
      { name: 'Cusano Milanino', postcodes: [20095] },
      { name: 'Dairago', postcodes: [20036] },
      { name: 'Dresano', postcodes: [20070] },
      { name: 'Gaggiano', postcodes: [20083] },
      { name: 'Garbagnate Milanese', postcodes: [20024] },
      { name: 'Gessate', postcodes: [20060] },
      { name: 'Gorgonzola', postcodes: [20064] },
      { name: 'Grezzago', postcodes: [20056] },
      { name: 'Gudo Visconti', postcodes: [20088] },
      { name: 'Inveruno', postcodes: [20001] },
      { name: 'Inzago', postcodes: [20065] },
      { name: 'Lacchiarella', postcodes: [20084] },
      { name: 'Lainate', postcodes: [20045] },
      { name: 'Legnano', postcodes: [20025] },
      { name: 'Liscate', postcodes: [20050] },
      { name: 'Locate di Triulzi', postcodes: [20085] },
      { name: 'Magenta', postcodes: [20013] },
      { name: 'Magnago', postcodes: [20020] },
      { name: 'Marcallo con Casone', postcodes: [20010] },
      { name: 'Masate', postcodes: [20060] },
      { name: 'Mediglia', postcodes: [20076] },
      { name: 'Melegnano', postcodes: [20077] },
      { name: 'Melzo', postcodes: [20066] },
      { name: 'Mesero', postcodes: [20010] },
      {
        name: 'Milano',
        postcodes: [
          20121, 20122, 20123, 20124, 20125, 20126, 20127, 20128, 20129, 20130,
          20131, 20132, 20133, 20134, 20135, 20136, 20137, 20138, 20139, 20140,
          20141, 20142, 20143, 20144, 20145, 20146, 20147, 20148, 20149, 20150,
          20151, 20152, 20153, 20154, 20155, 20156, 20157, 20158, 20159, 20160,
          20161, 20162,
        ],
      },
      { name: 'Morimondo', postcodes: [20081] },
      { name: 'Motta Visconti', postcodes: [20086] },
      { name: 'Nerviano', postcodes: [20014] },
      { name: 'Nosate', postcodes: [20020] },
      { name: 'Novate Milanese', postcodes: [20026] },
      { name: 'Noviglio', postcodes: [20082] },
      { name: 'Opera', postcodes: [20073] },
      { name: 'Ossona', postcodes: [20002] },
      { name: 'Ozzero', postcodes: [20080] },
      { name: 'Paderno Dugnano', postcodes: [20037] },
      { name: 'Pantigliate', postcodes: [20048] },
      { name: 'Parabiago', postcodes: [20015] },
      { name: 'Paullo', postcodes: [20067] },
      { name: 'Pero', postcodes: [20016] },
      { name: 'Peschiera Borromeo', postcodes: [20068] },
      { name: 'Pessano con Bornago', postcodes: [20042] },
      { name: 'Pieve Emanuele', postcodes: [20072] },
      { name: 'Pioltello', postcodes: [20096] },
      { name: 'Pogliano Milanese', postcodes: [20005] },
      { name: "Pozzo d'Adda", postcodes: [20060] },
      { name: 'Pozzuolo Martesana', postcodes: [20060] },
      { name: 'Pregnana Milanese', postcodes: [20006] },
      { name: 'Rescaldina', postcodes: [20027] },
      { name: 'Rho', postcodes: [20017] },
      { name: 'Robecchetto con Induno', postcodes: [20020] },
      { name: 'Robecco sul Naviglio', postcodes: [20087] },
      { name: 'Rodano', postcodes: [20053] },
      { name: 'Rosate', postcodes: [20088] },
      { name: 'Rozzano', postcodes: [20089] },
      { name: 'San Colombano al Lambro', postcodes: [20078] },
      { name: 'San Donato Milanese', postcodes: [20097] },
      { name: 'San Giorgio su Legnano', postcodes: [20034] },
      { name: 'San Giuliano Milanese', postcodes: [20098] },
      { name: 'San Vittore Olona', postcodes: [20028] },
      { name: 'San Zenone al Lambro', postcodes: [20070] },
      { name: 'Santo Stefano Ticino', postcodes: [20010] },
      { name: 'Sedriano', postcodes: [20018] },
      { name: 'Segrate', postcodes: [20054] },
      { name: 'Senago', postcodes: [20030] },
      { name: 'Sesto San Giovanni', postcodes: [20099] },
      { name: 'Settala', postcodes: [20049] },
      { name: 'Settimo Milanese', postcodes: [20019] },
      { name: 'Solaro', postcodes: [20033] },
      { name: 'Trezzano Rosa', postcodes: [20060] },
      { name: 'Trezzano sul Naviglio', postcodes: [20090] },
      { name: "Trezzo sull'Adda", postcodes: [20056] },
      { name: 'Tribiano', postcodes: [20067] },
      { name: 'Truccazzano', postcodes: [20060] },
      { name: 'Turbigo', postcodes: [20029] },
      { name: 'Vanzaghello', postcodes: [20020] },
      { name: 'Vanzago', postcodes: [20043] },
      { name: "Vaprio d'Adda", postcodes: [20069] },
      { name: 'Vermezzo con Zelo', postcodes: [20071] },
      { name: 'Vernate', postcodes: [20080] },
      { name: 'Vignate', postcodes: [20052] },
      { name: 'Villa Cortese', postcodes: [20035] },
      { name: 'Vimodrone', postcodes: [20055] },
      { name: 'Vittuone', postcodes: [20009] },
      { name: 'Vizzolo Predabissi', postcodes: [20070] },
      { name: 'Zibido San Giacomo', postcodes: [20058] },
    ],
  },
  {
    id: 'MB',
    name: 'Monza e della Brianza',
    cities: [{ name: 'Monza', postcodes: [20900] }],
  },
])

// Computed
const provinces = computed(() => {
  return locations.value.reduce((provinces, province) => {
    provinces.push({
      id: province.id,
      text: province.name,
    })

    return provinces
  }, [])
})

const cities = computed(() => (province = null) => {
  const currentProvince = locations.value.find(
    (currentProvince) =>
      currentProvince.id === (province || props.address.province)
  )
  if (!currentProvince) {
    return []
  }

  return currentProvince.cities.reduce((cities, city) => {
    cities.push({
      id: city.name,
      text: city.name,
    })

    return cities
  }, [])
})

const postcodes = computed(() => (city = null, province = null) => {
  const currentProvince = locations.value.find(
    (currentProvince) =>
      currentProvince.id === (province || props.address.province)
  )
  if (!currentProvince) {
    return []
  }

  const currentCity = currentProvince.cities.find(
    (currentCity) => currentCity.name === (city || props.address.city)
  )
  if (!currentCity) {
    return []
  }

  return currentCity.postcodes.reduce((postcodes, postcode) => {
    postcodes.push({
      id: postcode,
      text: postcode,
    })

    return postcodes
  }, [])
})

// Watcher

// Component life-cycle hooks
</script>

<style lang="scss">
$prefix: 'addresses-form';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'form',
    $map: (
      columns: 1,
      fieldset-gap: rem(20px),
      fieldset-border: 2px solid get-var(color-white),
    )
  );
  @include from(tablet) {
    @include set-local-vars(
      $prefix: 'form',
      $map: (
        columns: 3,
        fieldset-gap: rem(20px),
        fieldset-border: 2px solid get-var(color-white),
      )
    );
  }
}
</style>
