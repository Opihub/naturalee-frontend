<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="passwordRecovery">
    <slot name="header">
      <BaseHeading class="u-mb-small" tag="h3">{{
        $t('form.password.recovery')
      }}</BaseHeading>

      <BaseParagraph class="u-mb-small">
        {{ $t('form.password.recoveryDisclaimer') }}
      </BaseParagraph>
    </slot>

    <InputField
      v-model="formData.username"
      class="u-mb-tiny"
      type="email"
      required
    >
      {{ $t('form.mailField') }}</InputField
    >

    <slot name="profileLink" />

    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="loading || disabled"
      >{{ $t('form.password.recovery') }}</BaseButton
    >
    <BaseMessage v-if="sent" class="u-mt-half">
      <template v-if="success === 'password_recovery'">
        {{
          $t('form.password.recoverySent', {
            userParam: user,
          })
        }}
      </template>
      <template v-else-if="success === 'errors_sending_emails'">
        {{ $t('form.sendError') }}
      </template>
      <template v-else>
        {{
          $t('form.noUserFound', {
            userParam: user,
          })
        }}
      </template>
    </BaseMessage>
  </form>
</template>

<script setup>
// Imports
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();

const {loading} = storeToRefs(loadingStore);
const {setLoading} = loadingStore;


// Constants
const CSS_NAME = 'c-password-recovery-form'

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
const { sent, send } = useSender(emit)

// Data
const user = ref(null)
const success = ref(false)
const formData = reactive({
  username: '',
})

const { recaptcha } = useCaptcha()

// Watcher

// Computed

// Methods
const passwordRecovery = async () => {
  if (loading.value) {
    return
  }

  setLoading(true);

  user.value = formData.username

  const token = await recaptcha()

  const response = await send(async () => {
    return await useApi(`auth/password-recovery/request`, {
      method: 'POST',
      body: { ...formData, recaptcha_token: token },
      cache: 'no-cache'
    })
  })

  setLoading(false);

  success.value = response.value.code
}
</script>
