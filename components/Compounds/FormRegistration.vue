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

    <ToggleField v-model="formData.marketing">
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
      :disabled="loading || disabled"
      >{{ $t('form.signUp') }}</BaseButton
    >
  </form>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();

const {loading} = storeToRefs(loadingStore);
const {setLoading} = loadingStore;

// Constants
const CSS_NAME = 'c-registration-form'

// Define (Props, Emits, Page Meta)
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

// Component life-cycle hooks

// Composables
const store = useAccountStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const route = useRoute()

const { feedback, resetFeedback } = useFeedback()

// Data
const formData = reactive({
  email: '',
  password: '',
  acceptance: false,
  marketing: false,
})

const { recaptcha } = useCaptcha()

// Watcher

// Computed

// Methods
const register = async () => {
  if (loading.value) {
    return
  }

  setLoading(true)

  resetFeedback()

  const token = await recaptcha()

  const response = await store.signIn({ ...formData, recaptcha_token: token })

  if (response.value.success && response.value.data.token) {
    feedback.status = 'success'
    feedback.message = 'Registrazione avvenuta con successo'

    await Promise.all([cart.load(true), wishlist.load()])
  } else {
    feedback.message = response.value.message
    setLoading(false)
  }
  notify(feedback)

  let routeParam = {
    name: 'dashboard',
  }
  if (route.query?.redirectBecause) {
    routeParam = {
      name: route.query?.redirectTo || 'checkout',
    }
  }

  await navigateTo(routeParam)
}
</script>
