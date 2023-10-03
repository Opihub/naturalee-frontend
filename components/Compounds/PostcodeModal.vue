<template>
  <ModalContainer :class="CSS_NAME" :max-width="1088" @close="resetStatus">
    <template #header>
      <BaseHeading
        tag="span"
        :class="[`${CSS_NAME}__heading`, `${CSS_NAME}__heading--header`]"
        >{{ $t('shipping.checkPostCode') }}</BaseHeading
      >
    </template>

    <Transition name="fade" mode="out-in">
      <form
        v-if="matchedPostcode === null"
        method="POST"
        :class="`${CSS_NAME}__form`"
        @submit.prevent="checkPostcode"
      >
        <InputField
          v-model="formData.postcode"
          name="postcode"
          :error="$t('shipping.invalidPostCode')"
          pattern="\d{5}"
          error-after
          rounded
          required
          >{{ $t('shipping.cap') }}</InputField
        >

        <InputField
          v-model="formData.address"
          :class="`${CSS_NAME}__form__address`"
          name="address"
          :error="$t('shipping.shippingAddressRequired')"
          error-after
          rounded
          required
          >{{ $t('shipping.shippingAddress') }}</InputField
        >

        <BaseButton
          :disabled="sending"
          color="green"
          type="submit"
          :text="$t('shipping.checkAddress')"
        />
      </form>

      <div v-else>
        <div class="u-mb-half u-text-center">
          <BaseHeading
            tag="h4"
            :class="`${CSS_NAME}__heading`"
            :text="feedbackTitle"
          />

          <BaseParagraph
            v-if="feedbackMessage"
            class="u-mb-micro"
            :text="feedbackMessage"
          />
        </div>

        <div v-if="matchedPostcode || savedEmail" :class="`${CSS_NAME}__user`">
          <BaseButton as="link" to="/my-account?login" color="green">{{
            $t('form.login')
          }}</BaseButton>
          oppure
          <BaseButton as="link" to="/my-account?register" color="green">{{
            $t('form.signUp')
          }}</BaseButton>
        </div>
        <form
          v-else
          method="POST"
          :class="[`${CSS_NAME}__form`, `${CSS_NAME}__form--notify`]"
          @submit.prevent="registerEmail"
        >
          <InputField
            v-model="formData.email"
            name="email"
            type="email"
            :error="$t('form.validEmail')"
            rounded
            required
            >{{ $t('form.toMailAddress') }}</InputField
          >

          <BaseButton
            :disabled="sending"
            color="green"
            type="submit"
            :text="$t('form.Notify')"
          />
        </form>
        <Transition name="fade">
          <BaseMessage v-if="savedEmail === false" class="u-mt-half">
            <BaseHeading
              tag="h4"
              :class="`${CSS_NAME}__heading`"
              :text="$t('form.errorMessage1')"
            />

            <BaseParagraph
              v-if="feedbackMessage"
              class="u-mb-micro"
              :text="$t('form.errorMessage2')"
            />
          </BaseMessage>
        </Transition>
      </div>
    </Transition>
  </ModalContainer>
</template>

<script setup>
const CSS_NAME = 'c-postcode-modal'

const formData = reactive({
  postcode: '',
  address: '',
  email: null,
})

const sending = ref(false)
const matchedPostcode = ref(null)
const savedEmail = ref(null)
const feedback = ref(null)

const resetStatus = () => {
  sending.value = false

  savedEmail.value = null
  matchedPostcode.value = null
}

const checkPostcode = async () => {
  sending.value = false
  savedEmail.value = null
  matchedPostcode.value = null
  feedback.value = null

  if (!formData.postcode) {
    return
  }

  if (!formData.address) {
    return
  }

  sending.value = true

  const response = await useApi('postcodes/validate', {
    method: 'POST',
    body: formData,
  })

  feedback.value = response.value.data

  matchedPostcode.value = response.value.success
  sending.value = false
}

const registerEmail = async () => {
  sending.value = false

  if (!formData.email) {
    return
  }

  sending.value = true

  const response = await useApi(
    `postcodes/validate/${feedback.value}`,
    {
      method: 'POST',
      body: formData,
    },
    {
      cache: false,
    }
  )

  savedEmail.value = response.value.success
  sending.value = false
}

const feedbackTitle = computed(() => {
  if (matchedPostcode.value) {
    // Form compilato e CAP presente
    return 'Complimenti, il tuo indirizzo è coperto dal servizio!'
  }

  if (savedEmail.value) {
    // Form per registrazione compilato
    return 'Complimenti, la tua email è stata registrata!'
  }

  return 'Il servizio di consegna non è ancora attivo per questo indirizzo.'
})

const feedbackMessage = computed(() => {
  if (matchedPostcode.value) {
    // Form compilato e CAP presente
    return null
  }

  if (savedEmail.value) {
    // Form per registrazione compilato
    return 'Verrai notificato non appena il tuo CAP verrà aggiunto al servizio di consegna!'
  }

  return 'Vuoi essere aggiornato quando il servizio sarà disponibile? Compila il form sottostante!'
})
</script>

<style lang="scss">
$prefix: 'postcode-modal';
@include component($prefix) {
  @include element('heading') {
    color: get-var(color-green);
    font-weight: inherit;
    @include typography(18px, 23px);

    @include from(tablet) {
      @include typography(22px, 28px);
    }

    @include modifier('header') {
      @include typography(18px, 23px);

      @include from(tablet) {
        @include typography(22px, 28px);
      }
    }
  }

  font-size: rem(18px);
  line-height: rem(24px);
  font-weight: get-var(weight-bold);

  @include element('form') {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    gap: rem(30px);

    @include from(tablet) {
      flex-direction: row;
      flex-wrap: nowrap;
      gap: rem(20px);
      align-items: flex-end;
      justify-content: space-between;
    }

    @include set-local-vars(
      $prefix: 'input',
      $map: (
        font-size: rem(20px),
        line-height: rem(24px),
        font-weight: inherit,
        padding: rem(18px) rem(20px),
      )
    );

    @include set-local-vars(
      $prefix: 'input-field-label',
      $map: (
        padding: 0 rem(20px),
      )
    );

    @include set-local-vars(
      $prefix: 'input-field-error',
      $map: (
        margin: rem(4px) rem(20px) 0,
      )
    );

    @include set-local-vars(
      $prefix: 'button',
      $map: (
        font-size: inherit,
        line-height: inherit,
        padding: rem(20px) rem(44px),
      )
    );

    @include modifier('notify') {
      @include component('input-field') {
        flex: 1 1 auto;
      }
    }

    @include object('button') {
      flex: 0 0 auto;
    }

    @include element('address') {
      flex-grow: 2;
    }
  }

  @include element('user') {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: rem(20px);
  }
}
</style>
