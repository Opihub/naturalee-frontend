<template>
  <div class="o-row c-profile-forms">
    <BackgroundHolder
      ref="loginElement"
      class="o-row__column u-pt-huge u-pb-huge c-login-block"
      content-center
      color="white"
    >
      <ClientOnly>
        <FloatingIcon
          :style="{ transform: `rotate(${svgs.arancia.rotate}deg)` }"
          :svg-size="svgs.arancia.sizes"
          :coordinates="svgs.arancia.coordinates"
          :z-index="0"
        >
          <AranciaSVG />
        </FloatingIcon>
        <FloatingIcon
          :style="{ transform: `rotate(${svgs.ravanello.rotate}deg)` }"
          :svg-size="svgs.ravanello.sizes"
          :coordinates="svgs.ravanello.coordinates"
          :z-index="0"
        >
          <RavanelloSVG />
        </FloatingIcon>
        <FloatingIcon
          :style="{ transform: `rotate(${svgs.lime.rotate}deg)` }"
          :svg-size="svgs.lime.sizes"
          :coordinates="svgs.lime.coordinates"
          :z-index="0"
        >
          <LimeSVG />
        </FloatingIcon>
      </ClientOnly>

      <Transition name="fade" mode="out-in">
        <FormLogin
          v-if="!isShowingForgotPasswordForm"
          ref="loginFormElement"
          :disabled="sending"
          @api:start="sending = true"
          @api:end="sending = false"
        >
          <template #forgotLink>
            <BaseLink
              :to="{ name: 'login', query: { forgot_password: true } }"
              color="dark"
              underline
              @click.prevent="toggleLoginForm(true)"
              >{{ $t('form.password.forget') }}</BaseLink
            >
          </template>
        </FormLogin>

        <FormPasswordRecovery
          v-else
          ref="passwordFormElement"
          :disabled="sending"
          @api:start="sending = true"
          @api:end="sending = false"
        >
          <template #profileLink>
            <BaseLink
              :to="{ name: 'login' }"
              color="dark"
              underline
              @click.prevent="toggleLoginForm(false)"
              >{{ $t('form.returnToLogin') }}</BaseLink
            >
          </template>
        </FormPasswordRecovery>
      </Transition>
    </BackgroundHolder>

    <BackgroundHolder
      ref="registrationElement"
      class="o-row__column u-pt-huge u-pb-huge c-registration-block"
      content-center
    >
      <ClientOnly>
        <FloatingIcon
          :style="{ transform: `rotate(${svgs.banana.rotate}deg)` }"
          :svg-size="svgs.banana.sizes"
          :coordinates="svgs.banana.coordinates"
          :z-index="0"
        >
          <BananaSVG />
        </FloatingIcon>
        <FloatingIcon
          :style="{ transform: `rotate(${svgs.mango.rotate}deg)` }"
          :svg-size="svgs.mango.sizes"
          :coordinates="svgs.mango.coordinates"
          :z-index="0"
        >
          <MangoSVG />
        </FloatingIcon>
        <FloatingIcon
          :style="{ transform: `rotate(${svgs.mora.rotate}deg)` }"
          :svg-size="svgs.mora.sizes"
          :coordinates="svgs.mora.coordinates"
          :z-index="0"
        >
          <MoraSVG />
        </FloatingIcon>
      </ClientOnly>

      <FormRegistration
        ref="registrationFormElement"
        :disabled="sending"
        @api:start="sending = true"
        @api:end="sending = false"
      />
    </BackgroundHolder>
  </div>
</template>

<script setup>
// Imports
import AranciaSVG from '@/assets/svg/decorations/arancia.svg'
import RavanelloSVG from '@/assets/svg/decorations/ravanello.svg'
import LimeSVG from '@/assets/svg/decorations/lime.svg'
import BananaSVG from '@/assets/svg/decorations/banana.svg'
import MangoSVG from '@/assets/svg/decorations/mango.svg'
import MoraSVG from '@/assets/svg/decorations/mora.svg'
import { useElementBounding } from '@vueuse/core'

// Constants

// Define (Props, Emits, Page Meta)

// Data
const route = useRoute()
const isShowingForgotPasswordForm = ref('forgot_password' in route.query)

const sending = ref(false)
const loginElement = ref(null)
const loginBounding = useElementBounding(loginElement)
const registrationElement = ref(null)
const registrationBounding = useElementBounding(registrationElement)

const loginFormElement = ref(null)
const loginFormBounding = useElementBounding(loginFormElement)
const passwordFormElement = ref(null)
const passwordFormBounding = useElementBounding(passwordFormElement)
const registrationFormElement = ref(null)
const registrationFormBounding = useElementBounding(registrationFormElement)

const svgs = ref({
  arancia: {
    rotate: 0,
    sizes: { width: 50.86, height: 54.59 },
    coordinates: { left: 0, top: 0 },
  },
  ravanello: {
    rotate: 0,
    sizes: { width: 111.01, height: 157.07 },
    coordinates: { left: 0, top: 0 },
  },
  lime: {
    rotate: 0,
    sizes: { width: 75.13, height: 45.87 },
    coordinates: { left: 0, top: 0 },
  },
  banana: {
    rotate: 0,
    sizes: { width: 63.81, height: 57.06 },
    coordinates: { left: 0, top: 0 },
  },
  mango: {
    rotate: 0,
    sizes: { width: 72.51, height: 61.43 },
    coordinates: { left: 0, top: 0 },
  },
  mora: {
    rotate: 0,
    sizes: { width: 50.16, height: 56.39 },
    coordinates: { left: 0, top: 0 },
  },
})

// Watcher

// Computed

// Methods
const toggleLoginForm = (toggle = null) => {
  isShowingForgotPasswordForm.value =
    toggle === null ? !isShowingForgotPasswordForm.value : !!toggle
}

// Component life-cycle hooks
onMounted(() => {
  const rotationRange = 15
  const loginX = loginBounding.width.value
  const loginY = loginBounding.height.value

  // Determina l'area del login da non includere durante il posizionamento delle icone
  const loginLeft =
    (loginX -
      (loginFormBounding.width.value || passwordFormBounding.width.value)) /
    2
  const loginRight =
    loginLeft +
    (loginFormBounding.width.value || passwordFormBounding.width.value)

  const loginTop =
    (loginY -
      Math.max(
        loginFormBounding.height.value,
        passwordFormBounding.height.value
      )) /
    2
  const loginBottom =
    loginTop +
    Math.max(loginFormBounding.height.value, passwordFormBounding.height.value)

  const registrationX = registrationBounding.width.value
  const registrationY = registrationBounding.height.value

  // Determina l'area della registrazione da non includere durante il posizionamento delle icone
  const registrationLeft =
    (registrationX - registrationFormBounding.width.value) / 2
  const registrationRight =
    registrationLeft + registrationFormBounding.width.value
  const registrationTop =
    (registrationY - registrationFormBounding.height.value) / 2
  const registrationBottom =
    registrationTop + registrationFormBounding.height.value

  const data = svgs.value

  data.arancia.rotate = random(-rotationRange, rotationRange)
  data.arancia.coordinates = {
    left: random(
      0 - data.arancia.sizes.width / 2,
      loginLeft - data.arancia.sizes.width
    ),
    top: random(
      0 - data.arancia.sizes.height / 2,
      loginY - data.arancia.sizes.height / 2
    ),
  }

  data.ravanello.rotate = random(-rotationRange, rotationRange)
  data.ravanello.coordinates = {
    left: random(loginRight, loginX - data.ravanello.sizes.width / 2),
    top: random(
      0 - data.ravanello.sizes.height / 2,
      loginY - data.ravanello.sizes.height
    ),
  }

  data.lime.rotate = random(-rotationRange, rotationRange)
  data.lime.coordinates = {
    left: random(loginLeft, loginRight),
    top: random(loginBottom, loginY - data.lime.sizes.height / 2),
  }

  data.banana.rotate = random(-rotationRange, rotationRange)
  data.banana.coordinates = {
    left: random(
      0 - data.banana.sizes.width / 2,
      registrationLeft - data.banana.sizes.width
    ),
    top: random(
      0 - data.banana.sizes.height / 2,
      registrationY - data.banana.sizes.height / 2
    ),
  }

  data.mango.rotate = random(-rotationRange, rotationRange)
  data.mango.coordinates = {
    left: random(registrationRight, registrationX - data.mango.sizes.width / 2),
    top: random(
      0 - data.mango.sizes.height / 2,
      registrationY - data.mango.sizes.height / 2
    ),
  }

  data.mora.rotate = random(-rotationRange, rotationRange)
  data.mora.coordinates = {
    left: random(registrationLeft, registrationRight),
    top: random(
      0 - data.mora.sizes.height / 2,
      registrationTop - data.mora.sizes.height
    ),
  }


  svgs.value = data
})
</script>

<style lang="scss">
$prefix: 'profile-forms';
@include component($prefix) {
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
    position: relative;
    padding: 0 get-var(padding, $prefix: 'container');
    min-height: get-var(height, auto, $prefix: $prefix);
  }

  @include component('registration-block') {
    position: relative;
    padding: 0 get-var(padding, $prefix: 'container');
    min-height: get-var(height, auto, $prefix: $prefix);
  }

  form {
    max-width: 100%;
    width: rem(385px);
    position: relative;
    z-index: 2;
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

  @include component('toggle-field') {
    @include typography(13px, 18px);
    width: auto;
  }
}
</style>
