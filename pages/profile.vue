<template>
  <main class="s-profile">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <div class="o-row">
      <BackgroundHolder
        class="o-row__column u-pt-huge u-pb-huge c-login-block"
        content-center
        color="white"
      >
        <Transition name="fade" mode="out-in">
          <form
            v-if="!isShowingForgotPasswordForm"
            method="POST"
            @submit.prevent="login"
          >
            <BaseHeading class="u-mb-small" tag="h3">Accedi</BaseHeading>

            <InputField
              v-model="loginData.user"
              class="u-mb-half"
              type="text"
              required
            >
              Nome utente o indirizzo email *</InputField
            >
            <InputField
              v-model="loginData.password"
              class="u-mb-tiny"
              type="password"
              required
              >Password *</InputField
            >

            <div class="o-row s-remember-me">
              <CheckboxField v-model="loginData.remember">
                Ricordami
              </CheckboxField>

              <BaseLink
                to="/profile?forgot_password"
                color="dark"
                underline
                @click.prevent="toggleLoginForm(true)"
                >Hai dimenticato la password?</BaseLink
              >
            </div>

            <BaseButton class="u-mt-large" color="green" type="submit"
              >Accedi</BaseButton
            >
          </form>
          <form v-else method="POST" @submit.prevent="passwordRecovery">
            <BaseHeading class="u-mb-small" tag="h3"
              >Recupera password</BaseHeading
            >

            <BaseParagraph class="u-mb-small"
              >Hai perso la password? Inserisci il tuo nome utente o l'indirizzo
              email. Riceverai tramite email un link per generarne una
              nuova.</BaseParagraph
            >

            <InputField
              v-model="forgotPasswordData.user"
              class="u-mb-tiny"
              type="text"
              required
            >
              Nome utente o indirizzo email *</InputField
            >

            <BaseLink
              to="/profile?"
              color="dark"
              underline
              @click.prevent="toggleLoginForm(false)"
              >Oppure torna al login</BaseLink
            >

            <BaseButton class="u-mt-large" color="green" type="submit"
              >Recupera password</BaseButton
            >
          </form>
        </Transition>
      </BackgroundHolder>

      <BackgroundHolder
        class="o-row__column u-pt-huge u-pb-huge c-registration-block"
        content-center
      >
        <form method="POST" @submit.prevent="register">
          <BaseHeading class="u-mb-small" tag="h3">Registrati</BaseHeading>

          <InputField
            v-model="registerData.email"
            class="u-mb-half"
            type="email"
            required
            >Indirizzo email *</InputField
          >
          <InputField
            v-model="registerData.password"
            class="u-mb-tiny"
            type="password"
            required
            >Password *</InputField
          >

          <CheckboxField v-model="registerData.acceptance" required>
            Acconsento al
            <BaseLink
              to="/term-and-conditions"
              color="dark"
              underline
              target="_blank"
              >trattamento dei miei dati personali</BaseLink
            >
          </CheckboxField>

          <BaseButton
            class="u-mt-large"
            color="green"
            type="submit"
            >Registrati</BaseButton
          >
        </form>
      </BackgroundHolder>
    </div>
  </main>
</template>

<script setup>
// Imports

// Constants

// Props & Emits

// Component life-cycle hooks

// Data
const route = useRoute()
const isShowingForgotPasswordForm = ref('forgot_password' in route.query)

const { page } = await usePage('profile')

const loginData = reactive({
  user: '',
  password: '',
  remember: false,
})
const registerData = reactive({
  email: '',
  password: '',
  acceptance: false,
})
const forgotPasswordData = reactive({
  user: '',
})

// Watcher

// Computed

// Methods
const toggleLoginForm = (toggle = null) => {
  isShowingForgotPasswordForm.value =
    toggle === null ? !isShowingForgotPasswordForm.value : !!toggle
}

const login = () => {
  // TODO
  console.debug({ ...loginData })
}

const register = () => {
  // TODO
  console.debug({ ...registerData })
}

const passwordRecovery = () => {
  // TODO
  console.debug({ ...forgotPasswordData })
}
</script>

<style lang="scss">
$prefix: 'profile';
@include scope($prefix) {
  @include from(tablet) {
    @include set-vars(
      $prefix: $prefix,
      $map: (
        height: rem(720px),
      )
    );

    @include set-local-vars(
      $prefix: 'row',
      $map: (
        gap: 0px,
        columns: 2,
      )
    );
  }

  @include component('login-block') {
    padding: 0 get-var(padding, $prefix: 'container');
    height: get-var(height, auto, $prefix: $prefix);
  }

  @include component('registration-block') {
    padding: 0 get-var(padding, $prefix: 'container');
    height: get-var(height, auto, $prefix: $prefix);
  }

  form {
    max-width: 100%;
    width: rem(385px);
  }

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-green),
    )
  );

  @include set-local-vars(
    $prefix: 'button',
    $map: (
      font-size: rem(20px),
      line-height: ratio(28px, 20px),
    )
  );

  @include scope('remember-me') {
    justify-content: space-between;
    align-items: center;
    @include typography(14px, 18px);
  }

  @include component('checkbox-field') {
    @include typography(13px, 18px);
  }
}
</style>
