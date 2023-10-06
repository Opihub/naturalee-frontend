<template>
  <FormWrapper tag="div">
    <template
      #default="{
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnHalfClassName,
      }"
    >
      <fieldset :class="rowClassName">
        <div :class="[columnClassName, columnFullClassName]">
          <BaseHeading class="u-mt-large s-password" tag="h6"
            >Fatturazione</BaseHeading
          >
        </div>
      </fieldset>

      <fieldset :class="[rowClassName, columnFullClassName]">
        <ToggleField
          v-for="invoiceValue in invoices"
          :key="invoiceValue.value"
          :value="invoiceValue.value"
          inline
          radio
          :model-value="value.invoice === invoiceValue.value"
          @update:model-value="value.invoice = invoiceValue.value"
        >
          {{ invoiceValue.name }}
        </ToggleField>
      </fieldset>
      <InputField
        v-if="value.invoice == 'company'"
        v-model="value.company"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        required
      >
        Azienda</InputField
      >
      <InputField
        v-if="value.invoice == 'company'"
        v-model="value.cfCompany"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        Codice fiscale</InputField
      >
      <InputField
        v-if="value.invoice == 'private'"
        v-model="value.cfPrivate"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        Codice fiscale</InputField
      >
      <InputField
        v-if="value.invoice == 'company'"
        v-model="value.vat"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        Partita IVA</InputField
      >
      <InputField
        v-if="value.invoice == 'company'"
        v-model="value.sdi"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        Codice univico</InputField
      >
      <InputField
        v-if="value.invoice == 'company'"
        v-model="value.pec"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
      >
        PEC</InputField
      >
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports

//Constant
const invoices = ref([
  {
    name: 'No',
    value: false,
  },
  {
    name: 'Si, sono un privato',
    value: 'private',
  },
  {
    name: "Si, sono un'azienda",
    value: 'company',
  },
])

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
//computed
const value = computed({
  get() {
    return props.invoice
  },
  set(value) {
    emit('update:invoice', value)
  },
})
//data
</script>

<style lang="scss"></style>
