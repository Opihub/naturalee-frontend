<template>
  <FormWrapper ref="form" method="POST" @submit.prevent="submitForm()">
    <template
      #default="{ columnFullClassName, columnHalfClassName, columnClassName }"
    >
      <InputField
        v-model="formData.firstName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.name') }}</InputField
      >

      <InputField
        v-model="formData.lastName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.surname') }}</InputField
      >
      <InputField
        v-model="formData.email"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.mailField') }}</InputField
      >

      <InputField
        v-model="formData.phone"
        :class="[columnClassName, columnHalfClassName]"
        type="tel"
      >
        {{ $t('form.phone') }}</InputField
      >

      <InputField
        v-model="formData.message"
        :class="[columnClassName, columnFullClassName]"
        type="textarea"
        rows="4"
        >{{ $t('form.message') }}</InputField
      >

      <ToggleField v-model="formData.acceptance" required>
        {{ $t('form.privacyPolicy.term1') }}
        <BaseLink
          :to="{ name: 'privacy-policy' }"
          color="dark"
          underline
          target="_blank"
        >
          privacy policy</BaseLink
        >
        {{ $t('form.privacyPolicy.term2') }}
      </ToggleField>

      <BaseButton color="green" type="submit" :disabled="sending">{{
        $t('form.submitContact')
      }}</BaseButton>
      <BaseMessage v-if="feedback.status" :status="feedback.status">{{
        feedback.message
      }}</BaseMessage>
    </template>
  </FormWrapper>
</template>

<script setup>
const DEFAULT_STATUS = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  acceptance: false,
}

//form data
const formData = ref({ ...DEFAULT_STATUS })
const form = ref(null)

const feedback = reactive({
  status: null,
  message: null,
})

const sending = ref(false)

const { recaptcha } = useCaptcha()

const submitForm = async () => {
  if (sending.value) {
    return
  }

  sending.value = true
  const token = await recaptcha()

  try {
    const { data: response } = await useApi(`form/contacts`, {
      method: 'POST',
      clientSide: true,
      body: { ...formData.value, _wpcf7_recaptcha_response: token },
    })

    feedback.status =
      response.value.data.status === 'mail_sent' ? 'success' : 'danger'
    feedback.message = response.value.data.message
  } catch (error) {
    feedback.status = 'danger'
    feedback.message =
      "È avvenuto un errore imprevisto durante l'invio della form..."
  }

  const inputs = document.querySelectorAll('.o-input.is-valid')
  Array.from(inputs).forEach((input) => {
    input.classList.remove('is-valid', 'is-init')
  })

  if (feedback.status === 'success') {
    formData.value = DEFAULT_STATUS
    getElement(form.value).reset()
  }

  sending.value = false
}
</script>

<style lang="scss"></style>
