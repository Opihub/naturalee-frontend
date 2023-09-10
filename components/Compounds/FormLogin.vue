<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="login">
    <slot name="header">
      <BaseHeading class="u-mb-small" tag="h3">Accedi</BaseHeading>
    </slot>

    <InputField v-model="formData.user" class="u-mb-half" type="text" required>
      Nome utente o indirizzo email *</InputField
    >
    <InputField
      v-model="formData.password"
      class="u-mb-tiny"
      type="password"
      required
      >Password *</InputField
    >

    <div class="o-row s-remember-me">
      <ToggleField v-model="formData.remember"> Ricordami </ToggleField>

      <slot name="forgotLink" />
    </div>

    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="sending || disabled"
      >Accedi</BaseButton
    >
  </form>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'
import { useCartStore } from '@/stores/cart'

// Constants
const CSS_NAME = 'c-login-form'

// Define (Props, Emits, Page Meta)
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
const cart = useCartStore()

// Data
const formData = reactive({
  user: '',
  password: '',
  remember: false,
})

// Watcher

// Computed

// Methods
const login = async () => {
  if (sending.value) {
    return
  }

  const response = await send(async () => await store.signUp(formData))

  if (response.value.success) {
    cart.load()
  }
}
</script>

<style lang="scss">
@include scope('remember-me') {
  justify-content: space-between;
  align-items: center;
  @include typography(14px, 18px);
}
</style>
