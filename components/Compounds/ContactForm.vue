<template>
  <FormWrapper method="POST" @submit.prevent="submitForm()">
    <template
      #default="{ columnFullClassName, columnHalfClassName, columnClassName }"
    >
      <InputField
        v-model="formData.firstName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.name') }}*</InputField
      >

      <InputField
        v-model="formData.lastName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        required
      >
        {{ $t('form.surname') }}*</InputField
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
        {{ $t('form.phone') }}*</InputField
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
          to="/term-and-conditions"
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
    </template>
    <!-- <div class="o-form__column">test</div> -->
  </FormWrapper>
</template>

<script setup>
import { useApi } from '@/composables/api'

//form data
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  acceptance: false,
})

const emit = defineEmits(['api:start', 'api:end'])

const { sending, send } = useSender(emit)

const submitForm = async () => {
  if (sending.value) {
    return
  }

  const response = await send(
    async () =>
      await useApi(
        `form/contacts`,
        {
          method: 'POST',
          body: formData,
        },
        {
          cache: false,
        }
      )
  )
  console.log(response)
}
</script>

<style lang="scss"></style>
