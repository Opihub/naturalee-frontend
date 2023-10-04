<template>
  <address :class="CSS_NAME">
    <span v-if="fullName" :class="`${CSS_NAME}__row`">{{ fullName }}</span>
    <span v-if="address.address" :class="`${CSS_NAME}__row`">{{
      address.address
    }}</span>
    <span v-if="address.address2" :class="`${CSS_NAME}__row`">{{
      address.address2
    }}</span>
    <span v-if="fullAddress" :class="`${CSS_NAME}__row`">{{
      fullAddress
    }}</span>
    <span v-if="address.company" :class="`${CSS_NAME}__row`">{{
      address.company
    }}</span>

    <span v-if="address.cf" :class="`${CSS_NAME}__row`">{{
      $t('addresses.cf', { cf: address.cf })
    }}</span>
    <span v-if="address.vat" :class="`${CSS_NAME}__row`">{{
      $t('addresses.vat', { vat: address.vat })
    }}</span>
    <span v-if="address.sdi" :class="`${CSS_NAME}__row`">{{
      $t('addresses.sdi', { sdi: address.sdi })
    }}</span>
    <BaseLink
      v-if="address.pec"
      :to="`mailto:${address.pec}`"
      :class="`${CSS_NAME}__row`"
      >{{ $t('addresses.pec', { pec: address.pec }) }}</BaseLink
    >

    <BaseLink
      v-if="address.phone"
      :to="`tel:${address.phone}`"
      :class="`${CSS_NAME}__row`"
      color="green"
      underline
      >{{ address.phone }}</BaseLink
    >

    <BaseLink
      v-if="address.email"
      :to="`mailto:${address.email}`"
      :class="`${CSS_NAME}__row`"
      color="green"
      underline
      >{{ address.email }}</BaseLink
    >
  </address>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-address'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  address: {
    type: Object,
    required: true,
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed
const fullName = computed(() => {
  return [props.address.firstName, props.address.lastName]
    .filter((part) => part)
    .join(' ')
})

const fullAddress = computed(() => {
  return [
    props.address.postcode,
    props.address.city,
    props.address.province ? `(${props.address.province})` : '',
    props.address.country ? `, ${props.address.country}` : '',
  ]
    .filter((part) => part)
    .join(' ')
})

// Methods
</script>

<style lang="scss">
$prefix: 'address';
@include object($prefix) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;

  @include element('row') {
    display: block;
  }
}
</style>
