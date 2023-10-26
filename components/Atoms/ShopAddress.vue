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

    <template v-if="'invoice' in address">
      <i18n-t
        keypath="invoice.answerRequestInvoice"
        tag="b"
        :class="[`${CSS_NAME}__row`, 'u-mt-tiny']"
      >
        <template #answer>
          <u>{{ answerRequestInvoice }}</u>
        </template>
      </i18n-t>

      <template v-if="address.invoice === 'company'">
        <span v-if="address.company" :class="`${CSS_NAME}__row`">{{
          address.company
        }}</span>

        <span v-if="address.cf" :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.cf') }}:</b> {{ address.cf }}
        </span>
        <span v-if="address.vat" :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.vat') }}:</b> {{ address.vat }}
        </span>
        <span v-if="address.sdi" :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.sdi') }}:</b> {{ address.sdi }}
        </span>

        <span :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.pec') }}:</b>&nbsp;
          <BaseLink
            v-if="address.pec"
            :to="`mailto:${address.pec}`"
            color="green"
            :text="address.pec"
          />
        </span>
      </template>
      <template v-else-if="address.invoice === 'private'">
        <span v-if="address.cf" :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.cf') }}:</b> {{ address.cf }}
        </span>
      </template>

      <span :class="`${CSS_NAME}__row`">
        <BaseLink
          v-if="address.phone"
          :to="`tel:${address.phone}`"
          color="green"
          underline
          >{{ address.phone }}</BaseLink
        >
      </span>

      <span :class="`${CSS_NAME}__row`">
        <BaseLink
          v-if="address.email"
          :to="`mailto:${address.email}`"
          color="green"
          underline
          >{{ address.email }}</BaseLink
        >
      </span>
    </template>
  </address>
</template>

<script setup>
// Imports
import { useI18n } from 'vue-i18n'

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
const { t } = useI18n()

// Data

// Watcher

// Computed
const fullName = computed(() => {
  return [props.address.firstName, props.address.lastName]
    .filter((part) => part)
    .join(' ')
})

const answerRequestInvoice = computed(() => {
  if (['private', 'company'].includes(props.address.invoice)) {
    return t(`invoice.is${capitalize(props.address.invoice)}`)
  }

  return t('common.no')
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
  font-style: normal;

  @include element('row') {
    display: block;
  }

  @include set-local-vars(
    $prefix: 'link',
    $map: (
      gap: 0,
      label-disposition: flex-start,
    )
  );
}
</style>
