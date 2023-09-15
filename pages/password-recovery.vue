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
          >{{ $t('form.password.new') }}</InputField
        >

        <InputField
          v-model="formData.confirmPassword"
          class="u-mb-tiny"
          type="password"
          name="confirmPassword"
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

    if (!login || !token || token.match(getPasswordRecoveryTokenPattern()).length <= 0) {
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
const { sending, send } = useSender(emit)

// Data
const token = ref(route.query.token)
const login = ref(route.query.login)
const formData = reactive({
  password: '',
  confirmPassword: '',
})

// Watcher

// Computed

// Methods
const randomizePassword = () => {
  const newPassword = generatePassword()

  formData.password = newPassword
  formData.confirmPassword = newPassword
}

const updatePassword = async () => {
  if (sending.value) {
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

  console.debug(response)
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
