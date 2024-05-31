<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="login">
    <slot name="header">
      <BaseHeading class="u-mb-small" tag="h3">{{
        $t('form.loginTitle')
      }}</BaseHeading>
      <BaseHeading class="u-mb-small" tag="h5" color="dark">{{
        $t('form.loginSubtitle')
      }}</BaseHeading>
    </slot>

    <InputField
      v-model="formData.username"
      class="u-mb-half"
      type="email"
      required
    >
      {{ $t('form.mailField') }}</InputField
    >
    <InputField
      v-model="formData.password"
      class="u-mb-tiny"
      type="password"
      required
      >{{ $t('form.password.field') }}</InputField
    >

    <div class="o-row s-remember-me">
      <ToggleField v-model="formData.remember">
        {{ $t('form.remember') }}
      </ToggleField>

      <slot name="forgotLink" />
    </div>

    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="loading || disabled"
      >{{ $t('form.login') }}</BaseButton
    >
  </form>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

const { loading } = storeToRefs(loadingStore)
const { setLoading } = loadingStore

// Constants
const CSS_NAME = 'c-login-form'

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

// Data
const formData = reactive({
  username: '',
  password: '',
  remember: false,
})

const { recaptcha } = useCaptcha()

// Watcher

// Computed

// Methods
const login = async () => {
  if (loading.value) {
    return
  }

  setLoading(true)

  const token = await recaptcha()

  const response = await store.signUp({ ...formData, recaptcha_token: token })

  const message = {
    status: 'danger',
    message: 'È avvenuto un errore durante il login',
  }

  if (response?.value?.success && response?.value?.data.token) {
    message.status = 'success'
    message.message = 'Login avvenuto con successo'

    await Promise.all([cart.load(true), wishlist.load()])
  } else {
    message.message = response?.value?.message || 'Errore generico'
    setLoading(false)
  }

  notify(message)

  await navigateTo({
    name: 'dashboard',
  })
}
</script>

<style lang="scss">
@include scope('remember-me') {
  justify-content: space-between;
  align-items: center;
  @include typography(14px, 18px);
}
</style>
