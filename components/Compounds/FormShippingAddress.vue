<template>
  <form method="POST" :class="CSS_NAME" @submit.prevent="updateShippingAddress">
    <CountrySelect
      :model-value="address.country"
      name="state"
      :placeholder="$t('addresses.country')"
      class="u-mb-small"
      error-after
      rounded
      required
      no-label
      :disabled="sending"
      @update:model-value="(value) => updateCountry(value)"
    />

    <ProvincesSelect
      :model-value="address.province"
      name="province"
      :placeholder="$t('addresses.province')"
      class="u-mb-small"
      :provinces="provinces"
      error-after
      rounded
      required
      no-label
      :disabled="sending"
      @update:model-value="(value) => updateProvince(value)"
    />

    <InputField
      :model-value="address.city"
      type="text"
      name="city"
      :placeholder="$t('addresses.city')"
      class="u-mb-small"
      :error="$t('addresses.invalidPostCode')"
      error-after
      rounded
      required
      no-label
      :disabled="sending"
      @update:model-value="(value) => updateAddress(value, 'city')"
    />

    <InputField
      :model-value="address.postcode"
      type="text"
      name="postcode"
      :placeholder="$t('addresses.postcode')"
      class="u-mb-small"
      :error="$t('addresses.invalidPostCode')"
      pattern="\d{5}"
      error-after
      rounded
      required
      no-label
      :disabled="sending"
      @update:model-value="(value) => updateAddress(value, 'postcode')"
    />

    <BaseButton color="green" type="submit" :disabled="sending">{{
      $t('common.update')
    }}</BaseButton>
  </form>
</template>

<script setup>
// Imports
import { useShippingStore } from '@/stores/shipping'

// Constants
const CSS_NAME = 'c-shipping-form'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  address: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:address', 'update', 'not-available', 'api:start', 'api:end'])

// Pinia Stores
const shippingStore = useShippingStore()

// Methods
const { loadProvinces, saveCountry, currentProvince } = shippingStore

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

const updateAddress = (value, field) => {
  const newAddress = { ...props.address }
  newAddress[field] = value

  if (newAddress[field] === props.address[field]) {
    return
  }

  emit('update:address', newAddress)
}

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
          body: props.address,
        },
        {
          cache: false,
        }
      )
  )

  const notification = {
    message: "È avvenuto un errore durante l'aggiornamento dell'indirizzo",
    status: 'danger',
  }

  notification.message = response.value.message

  if (response.value.success) {
    notification.status = 'success'

    emit('update', response.value.data)
  } else {
    emit('not-available', response)
  }

  notify(notification)
}

// Composables
const { sending, send } = useSender(emit)
const { provinces } = storeToRefs(shippingStore)

// Data

// Computed

// Watcher

// Component life-cycle hooks
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
