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

    <template v-if="invoice.invoice">
      <i18n-t
        keypath="invoice.answerRequestInvoice"
        tag="b"
        :class="[`${CSS_NAME}__row`, 'u-mt-tiny']"
      >
        <template #answer>
          <u>{{ answerRequestInvoice }}</u>
        </template>
      </i18n-t>

      <template v-if="invoice.invoice === 'company'">
        <span v-if="invoice.company" :class="`${CSS_NAME}__row`">{{
          invoice.company
        }}</span>

        <span
          v-if="invoice.cfCompany || invoice.cf"
          :class="`${CSS_NAME}__row`"
        >
          <b>{{ $t('addresses.cf') }}:</b> {{ invoice.cfCompany || invoice.cf }}
        </span>
        <span v-if="invoice.vat" :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.vat') }}:</b> {{ invoice.vat }}
        </span>
        <span v-if="invoice.sdi" :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.sdi') }}:</b> {{ invoice.sdi }}
        </span>

        <span v-if="invoice.pec" :class="`${CSS_NAME}__row`">
          <b>{{ $t('addresses.pec') }}:</b>&nbsp;
          <BaseLink
            :to="`mailto:${invoice.pec}`"
            color="green"
            :text="invoice.pec"
          />
        </span>
      </template>
      <template v-else-if="invoice.invoice === 'private'">
        <span
          v-if="invoice.cfPrivate || invoice.cf"
          :class="`${CSS_NAME}__row`"
        >
          <b>{{ $t('addresses.cf') }}:</b> {{ invoice.cfPrivate || invoice.cf }}
        </span>
      </template>
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

    <slot :class-name="`${CSS_NAME}__row`" />
  </address>
</template>

<script setup>
// Constants
const CSS_NAME = 'o-address'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  address: {
    type: Object,
    required: true,
  },
  invoice: {
    type: Object,
    default: null,
  },
})

// Component life-cycle hooks

// Composables
const { t } = useI18n()

// Data

// Watcher

// Computed
const invoice = computed(() => {
  if (props.invoice) {
    return props.invoice
  }

  const { invoice, company, cfCompany, vat, sdi, pec, cfPrivate, cf } =
    props.address

  return {
    invoice: invoice || false,
    company: company || null,
    cfCompany: cfCompany || null,
    vat: vat || null,
    sdi: sdi || null,
    pec: pec || null,
    cfPrivate: cfPrivate || null,
    cf: cf || null,
  }
})

const fullName = computed(() => {
  return [props.address.firstName, props.address.lastName]
    .filter((part) => part)
    .join(' ')
})

const answerRequestInvoice = computed(() => {
  if (['private', 'company'].includes(invoice.value.invoice)) {
    return t(`invoice.is${capitalize(invoice.value.invoice)}`)
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
