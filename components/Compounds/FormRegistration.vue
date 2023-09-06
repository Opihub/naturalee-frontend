<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="register">
    <slot name="header">
      <BaseHeading class="u-mb-small" tag="h3">Registrati</BaseHeading>
    </slot>

    <InputField v-model="formData.email" class="u-mb-half" type="email" required
      >Indirizzo email *</InputField
    >
    <InputField
      v-model="formData.password"
      class="u-mb-tiny"
      type="password"
      required
      >Password *</InputField
    >

    <CheckboxField v-model="formData.acceptance" required>
      Acconsento al
      <BaseLink to="/term-and-conditions" color="dark" underline target="_blank"
        >trattamento dei miei dati personali</BaseLink
      >
    </CheckboxField>

    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="sending || disabled"
      >Registrati</BaseButton
    >
  </form>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants
const CSS_NAME = 'c-registration-form'

// Props & Emits
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['api:start', 'api:end'])

// Component life-cycle hooks

// Composables
const { sending, send } = useSender(emit)
const store = useAccountStore()

// Data
const formData = reactive({
  email: '',
  password: '',
  acceptance: false,
})

// Watcher

// Computed

// Methods
const register = async () => {
  if (sending.value) {
    return
  }

  const response = await send(async () => await store.signIn(formData))

  if (response.value.success) {
    // TODO: cambiare layout?
  }
}
</script>
