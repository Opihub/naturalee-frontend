<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="passwordRecovery">
    <slot name="header">
      <BaseHeading class="u-mb-small" tag="h3">Recupera password</BaseHeading>
    </slot>

    <BaseParagraph class="u-mb-small"
      >Hai perso la password? Inserisci il tuo nome utente o l'indirizzo email.
      Riceverai tramite email un link per generarne una nuova.</BaseParagraph
    >

    <InputField v-model="formData.user" class="u-mb-tiny" type="text" required>
      Nome utente o indirizzo email *</InputField
    >

    <slot name="profileLink" />

    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="sending || disabled"
      >Recupera password</BaseButton
    >
    <BaseMessage v-if="sent">
      <template v-if="success">
        Abbiamo inviato una mail
        {{
          isEmail ? "all'indirizzo email" : "all'indirizzo email dell'utente"
        }}
        <b>{{ user }}</b> con il link per recuperare la password.
      </template>
      <template v-else>
        Ci dispiace, ma non abbiamo trovato alcun utente con
        {{ isEmail ? 'indirizzo email' : "l'username" }}
        <b>{{ user }}</b>
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
    default: false
  }
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
