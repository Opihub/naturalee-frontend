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
        <span>{{ $t('invoice.iAm') }}</span>

        <ToggleField
          v-model="is"
          :value="IS_PRIVATE"
          name="invoice-is"
          inline
          radio
          @update:model-value="(value) => updateInvoice(value, 'invoice-is')"
        >
          {{ $t('invoice.private') }}
        </ToggleField>
        <ToggleField
          v-model="is"
          :value="IS_COMPANY"
          name="invoice-is"
          inline
          radio
          @update:model-value="(value) => updateInvoice(value, 'invoice-is')"
        >
          {{ $t('invoice.company') }}
        </ToggleField>
      </fieldset>

      <fieldset
        v-if="is === IS_PRIVATE"
        :class="[rowClassName, columnFullClassName, `${CSS_NAME}__invoice`]"
      >
        <span>{{ $t('invoice.iWant') }}</span>

        <ToggleField
          v-model="want"
          :value="WANT_RECEIPT"
          name="invoice-want"
          inline
          radio
          @update:model-value="(value) => updateInvoice(value, 'invoice-want')"
        >
          {{ $t('invoice.receipt') }}
        </ToggleField>
        <ToggleField
          v-model="want"
          :value="WANT_INVOICE"
          name="invoice-want"
          inline
          radio
          @update:model-value="(value) => updateInvoice(value, 'invoice-want')"
        >
          {{ $t('invoice.invoice') }}
        </ToggleField>
      </fieldset>

      <template v-if="is === IS_COMPANY">
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
        v-else-if="is === IS_PRIVATE && want === WANT_INVOICE"
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

// Constants
const CSS_NAME = 'c-form-invoice'
const IS_PRIVATE = 'private'
const IS_COMPANY = 'company'
const WANT_RECEIPT = 'receipt'
const WANT_INVOICE = 'invoice'

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

// Data
const is = ref(IS_PRIVATE)
const want = ref(WANT_RECEIPT)
switch (props.invoice.invoice) {
  case IS_COMPANY:
    is.value = IS_COMPANY
    // want.value = WANT_INVOICE
    break
  case IS_PRIVATE:
    is.value = IS_PRIVATE
    want.value = WANT_INVOICE
    break
}

// Watcher

// Computed
const updateInvoice = (value, field) => {
  if (field === 'invoice-is') {
    field = 'invoice'
    switch (value) {
      // Se sono un'azienda la fatturazione è obbligatoria
      case IS_COMPANY:
        value = IS_COMPANY
        break

      // Se sono un privato, controllo se ho richiesto la ricevuta o la fattura
      case IS_PRIVATE:
        value = want.value === WANT_INVOICE ? IS_PRIVATE : false
        break
    }
  } else if (field === 'invoice-want') {
    field = 'invoice'
    switch (value) {
      // Se voglio la ricevuta, allora mando 'false'
      case WANT_RECEIPT:
        value = false
        break

      // Se voglio la fattura, allora mando 'private'
      case WANT_INVOICE:
        value = IS_PRIVATE
        break
    }
  }

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
