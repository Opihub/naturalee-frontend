<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="register">
    <slot name="header">
      <BaseHeading class="u-mb-small" tag="h3">{{
        $t('form.signUpTitle')
      }}</BaseHeading>
      <BaseHeading class="u-mb-small" tag="h5" color="dark">{{
        $t('form.signUpSubtitle')
      }}</BaseHeading>
    </slot>

    <InputField
      v-model="formData.email"
      class="u-mb-half"
      type="email"
      required
      >{{ $t('form.mailField') }}</InputField
    >

    <InputField
      v-model="formData.password"
      class="u-mb-tiny"
      type="password"
      required
      >{{ $t('form.password.field') }}</InputField
    >

    <ToggleField v-model="formData.acceptance" required class="u-mb-tiny">
      {{ $t('form.consentTo') }}
      <BaseLink
        :to="{ name: 'privacy-policy' }"
        color="dark"
        underline
        target="_blank"
        >{{ $t('form.acceptance') }}</BaseLink
      >
    </ToggleField>

    <ToggleField v-model="formData.acceptance">
      {{ $t('form.registerToNewsletter') }}
      <BaseLink
        :to="{ name: 'privacy-policy' }"
        color="dark"
        underline
        target="_blank"
        >{{ $t('form.acceptNewsletter') }}</BaseLink
      >
    </ToggleField>

    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="sending || disabled"
      >{{ $t('form.signUp') }}</BaseButton
    >
  </form>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants
const CSS_NAME = 'c-registration-form'

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

const {
  feedback,
  resetFeedback,
} = useFeedback()

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

  resetFeedback()

  const response = await send(async () => await store.signIn(formData))

  if (response.value.success && response.value.data.token) {
    feedback.status = 'success'
    feedback.message = 'Registrazione avvenuta con successo'
  } else {
    feedback.message = response.value.message
  }

  notify(feedback)

  await navigateTo({
    name: 'dashboard'
  })
}
</script>
