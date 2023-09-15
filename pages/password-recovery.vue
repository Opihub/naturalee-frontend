<template>
  <main class="s-password-reset">
    <SiteContainer
      class="u-pt-huge u-pb-huge"
      :max-width="580"
      content-centered
    >
      <form method="POST" @submit.prevent="updatePassword">
        <slot name="header">
          <BaseHeading class="u-mb-small" tag="h3">{{
            $t('form.password.recovery')
          }}</BaseHeading>

          <BaseParagraph class="u-mb-small">{{
            $t('form.password.recoveryInstruction')
          }}</BaseParagraph>
        </slot>

        <InputField
          v-model="formData.password"
          class="u-mb-tiny"
          type="password"
          name="password"
          required
          >{{ $t('form.password.new') }}</InputField
        >

        <InputField
          v-model="formData.confirmPassword"
          class="u-mb-tiny"
          type="password"
          name="confirmPassword"
          required
          >{{ $t('form.password.check') }}</InputField
        >

        <input v-model="token" type="hidden" name="token" />
        <input v-model="login" type="hidden" name="login" />

        <div class="o-row u-mt-large">
          <BaseButton
            type="button"
            color="yellow"
            :disabled="sending"
            @click="randomizePassword"
            >{{ $t('form.password.generate') }}</BaseButton
          >
          <BaseButton type="submit" color="green" :disabled="sending">{{
            $t('form.password.save')
          }}</BaseButton>
        </div>

        <BaseMessage v-if="showMessage" class="u-mt-half" :status="feedback.status">{{
          feedback.message
        }}</BaseMessage>
      </form>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  layout: 'standard',
  validate: async (route) => {
    // http://localhost/wp-login.php?action=rp&key=xxxxxxxxxxxxxxxxxxxx&login=yyyyyyyy

    const { token, login } = route.query

    if (
      !login ||
      !token ||
      token.match(getPasswordRecoveryTokenPattern()).length <= 0
    ) {
      return false
    }

    const response = await useApi(
      `auth/password-recovery/validate-token`,
      {
        method: 'POST',
        body: {
          token,
          login,
        },
      },
      {
        cache: false,
      }
    )

    // TODO: trovare un modo di ritornare gli errori

    return response.value.success
  },
})

const emit = defineEmits(['api:start', 'api:end'])

// Component life-cycle hooks

// Composables
const route = useRoute()
const { sending, sent, send } = useSender(emit)

// Data
const token = ref(route.query.token)
const login = ref(route.query.login)
const formData = reactive({
  password: '',
  confirmPassword: '',
})
const feedback = reactive({
  status: 'danger',
  message:
    'È avvenuto un errore durante il reset delle password. Si prega di riprovare',
})
const showMessage = ref(false)

// Watcher

// Computed

// Methods
const randomizePassword = () => {
  const newPassword = generatePassword()

  formData.password = newPassword
  formData.confirmPassword = newPassword
}

const updatePassword = async () => {
  console.debug('test')

  if (sending.value) {
    return
  }

  showMessage.value = false

  let success = true
  feedback.status = 'danger'
  feedback.message =
    'È avvenuto un errore durante il reset delle password. Si prega di riprovare'

  if (!formData.password) {
    success = false
    feedback.message = 'Password mancante'
  }

  if (!formData.confirmPassword) {
    success = false
    feedback.message = 'Password di conferma mancante'
  }

  if (!formData.password.match(getPasswordPattern())) {
    success = false
    feedback.message =
      'La password inserita non rispetta i canoni standard di sicurezza'
  }

  if (!formData.confirmPassword.match(getPasswordPattern())) {
    success = false
    feedback.message =
      'La password di conferma inserita non rispetta i canoni standard di sicurezza'
  }

  if (formData.password !== formData.confirmPassword) {
    success = false
    feedback.message = 'Le password inserite non combaciano'
  }

  if (!success) {
    showMessage.value = true
    return
  }

  const response = await send(async () => {
    return await useApi(
      `auth/password-recovery/confirm`,
      {
        method: 'POST',
        body: {
          ...formData,
          token,
          login,
        },
      },
      {
        cache: false,
      }
    )
  })

  if (response.value.success) {
    await notify({
      status: 'success',
      message:
        'Password resettata con successo!',
    }, 5000)

    await navigateTo({
      path: '/my-account',
    })
  } else {
    showMessage.value = true
    feedback.message = response.value.message
  }
}
</script>

<style lang="scss" scoped>
@include scope('password-reset') {
  display: flex;
  align-items: center;
  flex: 1 1 auto;

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-green),
    )
  );

  @include object('row') {
    justify-content: space-between;
  }
}
</style>
