<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="passwordRecovery">
    <slot name="header">
      <BaseHeading class="u-mb-small" tag="h3">{{
        $t('form.passwordRecovery')
      }}</BaseHeading>
    </slot>

    <BaseParagraph class="u-mb-small">{{
      $t('form.passwordRecoveryMsg')
    }}</BaseParagraph>

    <InputField v-model="formData.user" class="u-mb-tiny" type="text" required>
      {{ $t('form.userField') }}</InputField
    >

    <slot name="profileLink" />

    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="sending || disabled"
      >{{ $t('form.passwordRecovery') }}</BaseButton
    >
    <BaseMessage v-if="sent">
      <template v-if="success">
        <!-- Abbiamo inviato una mail
        {{
          isEmail ? "all'indirizzo email" : "all'indirizzo email dell'utente"
        }}
        <b>{{ user }}</b> con il link per recuperare la password. -->
        {{
          //TODO: fare check se funzionare
          $t('form.passwordRecoveryMsgSent', {
            is_Email: isEmail ? $t('form.toEmail') : $t('form.toUserEmail'),
            userParam: user,
          })
        }}
      </template>
      <template v-else>
        <!-- Ci dispiace, ma non abbiamo trovato alcun utente con
        {{ isEmail ? 'indirizzo email' : "l'username" }}
        <b>{{ user }}</b> -->
        {{
          $t('form.noUserFound', {
            is_Email: isEmail ? $t('form.toMailAddress') : $t('form.toUser'),
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
  user: '',
})

// Watcher

// Computed
const isEmail = computed(() => {
  return user.value.match(getEmailPattern())
})

// Methods
const passwordRecovery = async () => {
  if (sending.value) {
    return
  }

  user.value = formData.user

  const response = await send(async () => {
    return await useApi(
      `auth/password-recovery`,
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
