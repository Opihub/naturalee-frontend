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
          v-for="single in invoices"
          :key="single.value"
          :value="single.value"
          name="invoice"
          inline
          radio
          :model-value="invoice.invoice"
          @update:model-value="(value) => updateInvoice(value, 'invoice')"
        >
          {{ single.name }}
        </ToggleField>
      </fieldset>

      <template v-if="invoice.invoice === 'company'">
        <InputField
          :model-value="invoice.company"
          :class="[columnClassName, columnFullClassName]"
          name="company"
          type="text"
          required
          @update:model-value="(value) => updateInvoice(value, 'company')"
        >
          {{ $t('addresses.company') }}</InputField
        >
        <InputField
          :model-value="invoice.cfCompany"
          :class="[columnClassName, columnHalfClassName]"
          name="cf"
          type="text"
          required
          @update:model-value="(value) => updateInvoice(value, 'cfCompany')"
        >
          {{ $t('addresses.cfFull') }}</InputField
        >
        <InputField
          :model-value="invoice.vat"
          :class="[columnClassName, columnHalfClassName]"
          name="vat"
          type="text"
          required
          @update:model-value="(value) => updateInvoice(value, 'vat')"
        >
          {{ $t('addresses.vatFull') }}</InputField
        >
        <InputField
          :model-value="invoice.sdi"
          :class="[columnClassName, columnHalfClassName]"
          name="sdi"
          type="text"
          pattern="[a-zA-Z0-9]{7}"
          :required="!invoice.pec"
          @update:model-value="(value) => updateInvoice(value, 'sdi')"
        >
          {{ $t('addresses.sdiFull') }}</InputField
        >
        <InputField
          :model-value="invoice.pec"
          :class="[columnClassName, columnHalfClassName]"
          name="pec"
          type="email"
          :required="!invoice.sdi"
          @update:model-value="(value) => updateInvoice(value, 'pec')"
        >
          {{ $t('addresses.pec') }}</InputField
        >
      </template>
      <InputField
        v-else-if="invoice.invoice === 'private'"
        :model-value="invoice.cfPrivate"
        :class="[columnClassName, columnFullClassName]"
        name="cf"
        type="text"
        required
        @update:model-value="(value) => updateInvoice(value, 'cfPrivate')"
      >
        {{ $t('addresses.cfFull') }}</InputField
      >
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports
import { useI18n } from 'vue-i18n'

// Constants
const CSS_NAME = 'c-form-invoice'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:invoice'])

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
const updateInvoice = (value, field) => {
  const newInvoice = { ...props.invoice }

  if (newInvoice[field] === value) {
    return
  }

  newInvoice[field] = value

  emit('update:invoice', newInvoice)
}

// Methods
</script>

<style lang="scss">
@include component('form-invoice') {
  width: 100%;

  @include set-local-vars(
    $prefix: 'form',
    $map: (
      fieldset-gap: rem(20px),
      fieldset-border: 2px solid get-var(color-white),
    )
  );

  @include set-local-vars(
    $prefix: 'toggle-field',
    $map: (
      offset-top: rem(6px),
    )
  );

  @include element('invoice') {
    font-weight: get-var(weight-bold);
  }
}
</style>
