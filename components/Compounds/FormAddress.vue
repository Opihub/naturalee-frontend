<template>
  <FormWrapper :class="CSS_NAME">
    <template
      #default="{
        columnClassName,
        columnFullClassName,
        columnHalfClassName,
        columnThirdClassName,
      }"
    >
      <slot
        name="before"
        :class="
          (columnClassName,
          columnFullClassName,
          columnHalfClassName,
          columnThirdClassName)
        "
      />
      <InputField
        v-model="value.firstName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.name') }}*</InputField
      >

      <InputField
        v-model="value.lastName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.surname') }}*</InputField
      >
      <CountrySelect
        :class="[columnClassName, columnFullClassName]"
        :model-value="value.country"
        @update:model-value="provinces"
        >Nazione/Regione</CountrySelect
      >
      <InputField
        v-model="value.address"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        placeholder="Via/Piazza e Numero Civico"
      >
        Via e Numero*</InputField
      >
      <InputField
        v-model="value.address2"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        placeholder="Appartamento, suite, unità, piano, ecc. (opzionale)"
      />

      <InputField
        v-model="value.postcode"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        required
      >
        {{ $t('shipping.postcode') }}*</InputField
      >
      <InputField
        v-model="value.city"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        required
      >
        Città*</InputField
      >
      <ProvincesSelect
        v-model="value.province"
        :class="[columnClassName, columnThirdClassName]"
        name="province"
        :provinces="countryData"
        :user-province="value.province"
      >
        Provincia
      </ProvincesSelect>
      <slot name="after" />
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports

//Constant
const CSS_NAME = 'c-addresses-form'
const countryData = ref([])
// Define (Props, Emits, Page Meta)
const props = defineProps({
  address: {
    type: Object,
    required: true,
    // validator(value) {
    //   return 'username' in value && 'email' in value
    // },
  },
})
defineEmits(['update:address'])
//form data
const formDataClone = {}
//Computed
const value = computed({
  get() {
    return props.address
  },
  set(value) {
    emit('update:address', value)
  },
})
//Watcher

//Methods

const provinces = async (v) => {
  if (Object.keys(formDataClone).length === 0) {
    formDataClone.value = { ...value }
  }

  value.country = v
  const province = await useApi(
    `/countries/${v}`,
    {
      method: 'GET',
    },
    {
      cache: false,
    }
  )

  countryData.value = province.value.data.provinces
  if (value.country !== formDataClone.value.country) {
    value.province = ''
  } else {
    value.province = formDataClone.value.province
  }
}

onMounted(() => {
  provinces(value.value.country)
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
