<template>
  <FormWrapper :class="CSS_NAME" tag="div">
    <template
      #default="{
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnHalfClassName,
      }"
    >
      <fieldset
        :class="[rowClassName, columnFullClassName, `${CSS_NAME}__invoice`]"
      >
        <ToggleField
          v-for="invoiceValue in invoices"
          :key="invoiceValue.value"
          :value="invoiceValue.value"
          name="invoice"
          inline
          radio
          :model-value="value.invoice === invoiceValue.value"
          @update:model-value="value.invoice = invoiceValue.value"
        >
          {{ invoiceValue.name }}
        </ToggleField>
      </fieldset>

      <template v-if="value.invoice === 'company'">
        <InputField
          v-model="value.company"
          :class="[columnClassName, columnFullClassName]"
          name="company"
          type="text"
          required
        >
          {{ $t('addresses.company') }}</InputField
        >
        <InputField
          v-model="value.cfCompany"
          :class="[columnClassName, columnHalfClassName]"
          name="cf"
          type="text"
          required
        >
          {{ $t('addresses.cfFull') }}</InputField
        >
        <InputField
          v-model="value.vat"
          :class="[columnClassName, columnHalfClassName]"
          name="vat"
          type="text"
          required
        >
          {{ $t('addresses.vatFull') }}</InputField
        >
        <InputField
          v-model="value.sdi"
          :class="[columnClassName, columnHalfClassName]"
          name="sdi"
          type="text"
          required
        >
          {{ $t('addresses.sdiFull') }}</InputField
        >
        <InputField
          v-model="value.pec"
          :class="[columnClassName, columnHalfClassName]"
          name="pec"
          type="text"
          required
        >
          {{ $t('addresses.pec') }}</InputField
        >
      </template>
      <InputField
        v-else-if="value.invoice === 'private'"
        v-model="value.cfPrivate"
        :class="[columnClassName, columnFullClassName]"
        name="cf"
        type="text"
        required
      >
        {{ $t('addresses.cfFull') }}</InputField
      >
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports
import { useI18n } from 'vue-i18n';

// Constants
const CSS_NAME = 'c-form-invoice'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  invoice: {
    type: Object,
    required: true,
    // validator(value) {
    //   return 'username' in value && 'email' in value
    // },
  },
})
defineEmits(['update:invoice'])

// Component life-cycle hooks

// Composables
const { t } = useI18n()

// Data
const invoices = ref([
  {
    name: t('common.no'),
    value: false,
  },
  {
    name: t('invoice.isPrivate'),
    value: 'private',
  },
  {
    name: t('invoice.isCompany'),
    value: 'company',
  },
])

// Watcher

// Computed
const value = computed({
  get() {
    return props.invoice
  },
  set(value) {
    emit('update:invoice', value)
  },
})

// Methods
</script>

<style lang="scss">
@include component('form-invoice') {
  @include set-local-vars(
    $prefix: 'form',
    $map: (
      fieldset-gap: rem(20px),
      fieldset-border: 2px solid get-var(color-white),
    )
  );

  @include element('invoice') {
    font-weight: get-var(weight-bold);
  }
}
</style>
