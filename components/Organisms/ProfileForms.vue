<template>
  <div class="o-row s-profile">
    <BackgroundHolder
      class="o-row__column u-pt-huge u-pb-huge c-login-block"
      content-center
      color="white"
    >
      <Transition name="fade" mode="out-in">
        <FormLogin
          v-if="!isShowingForgotPasswordForm"
          :disabled="sending"
          @api:start="sending = true"
          @api:end="sending = false"
        >
          <template #forgotLink>
            <BaseLink
              to="/profile?forgot_password"
              color="dark"
              underline
              @click.prevent="toggleLoginForm(true)"
              >Hai dimenticato la password?</BaseLink
            >
          </template>
        </FormLogin>
        <FormPasswordRecovery
          v-else
          :disabled="sending"
          @api:start="sending = true"
          @api:end="sending = false"
        >
          <template #profileLink>
            <BaseLink
              to="/profile?"
              color="dark"
              underline
              @click.prevent="toggleLoginForm(false)"
              >Oppure torna al login</BaseLink
            >
          </template>
        </FormPasswordRecovery>
      </Transition>
    </BackgroundHolder>

    <BackgroundHolder
      class="o-row__column u-pt-huge u-pb-huge c-registration-block"
      content-center
    >
      <FormRegistration
        :disabled="sending"
        @api:start="sending = true"
        @api:end="sending = false"
      />
    </BackgroundHolder>
  </div>
</template>

<script setup>
// Imports

// Constants

// Props & Emits

// Component life-cycle hooks

// Data
const route = useRoute()
const isShowingForgotPasswordForm = ref('forgot_password' in route.query)

const sending = ref(false)

// Watcher

// Computed

// Methods
const toggleLoginForm = (toggle = null) => {
  isShowingForgotPasswordForm.value =
    toggle === null ? !isShowingForgotPasswordForm.value : !!toggle
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

  @include component('checkbox-field') {
    @include typography(13px, 18px);
  }
}
</style>
