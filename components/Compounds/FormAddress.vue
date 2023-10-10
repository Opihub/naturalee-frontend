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

      <CountrySelect
        :class="[columnClassName, columnFullClassName]"
        :model-value="address.country"
        required
        @update:model-value="(value) => updateCountry(value)"
        >{{ $t('addresses.country') }}</CountrySelect
      >
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
        :model-value="address.postcode"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        name="postcode"
        :error="$t('addresses.invalidPostCode')"
        pattern="\d{5}"
        required
        @update:model-value="(value) => updateAddress(value, 'postcode')"
      >
        {{ $t('addresses.postcode') }}</InputField
      >
      <InputField
        :model-value="address.city"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        name="city"
        required
        @update:model-value="(value) => updateAddress(value, 'city')"
      >
        {{ $t('addresses.city') }}</InputField
      >
      <ProvincesSelect
        :model-value="address.province"
        :class="[columnClassName, columnThirdClassName]"
        name="province"
        :provinces="provinces"
        @update:model-value="(value) => updateProvince(value)"
      >
        {{ $t('addresses.province') }}
      </ProvincesSelect>

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
import { useShippingStore } from '@/stores/shipping'

// Constant
const CSS_NAME = 'c-addresses-form'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  address: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:address', 'api:start', 'api:end'])

// Pinia Stores
const shippingStore = useShippingStore()

// Methods
const { loadProvinces, saveCountry, currentProvince } = shippingStore

const updateAddress = (value, field) => {
  const newAddress = { ...props.address }
  newAddress[field] = value

  if (newAddress[field] === props.address[field]) {
    return
  }

  emit('update:address', newAddress)
}

const updateCountry = async (value) => {
  if (sending.value) {
    return
  }

  saveCountry(props.address.country, props.address.province)

  updateAddress(value, 'country')

  await send(async () => await loadProvinces(value))

  updateAddress(currentProvince(value), 'province')
}

const updateProvince = (value) => {
  saveCountry(props.address.country, value)

  updateAddress(value, 'province')
}

// Composables
const { provinces } = storeToRefs(shippingStore)
const { sending, send } = useSender(emit)

// Data

// Computed

// Watcher

// Component life-cycle hooks
onMounted(async () => {
  await loadProvinces(props.address.country)
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

  @include set-local-vars(
    $prefix: 'input-field-label',
    $map: (
      margin: 0 0 rem(8px),
    )
  );
}
</style>
