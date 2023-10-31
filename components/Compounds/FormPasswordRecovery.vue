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
      :disabled="sending || disabled"
      >{{ $t('form.password.recovery') }}</BaseButton
    >
    <BaseMessage v-if="sent" class="u-mt-half">
      <template v-if="success">
        {{
          $t('form.password.recoverySent', {
            userParam: user,
          })
        }}
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
const { sending, sent, send } = useSender(emit)

// Data
const user = ref(null)
const success = ref(false)
const formData = reactive({
  username: '',
})

// Watcher

// Computed

// Methods
const passwordRecovery = async () => {
  if (sending.value) {
    return
  }

  user.value = formData.username

  const response = await send(async () => {
    return await useApi(
      `auth/password-recovery/request`,
      {
        method: 'POST',
        body: formData,
      },
      {
        cache: false,
      }
    )
  })

  console.debug(response.value)
  success.value = response.value.success

  if (response.value.success) {
    // TODO: cambiare layout
  }
}
</script>
