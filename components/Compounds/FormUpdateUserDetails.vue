<template>
  <FormWrapper
    :class="CSS_NAME"
    method="POST"
    @submit.prevent="updateAccount()"
  >
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
        class="o-row__column s-email"
        type="text"
        required
      >
        {{ $t('form.mailField') }}</InputField
      >
      <InputField
        v-model="formData.phone"
        :class="[columnClassName, columnFullClassName]"
        type="text"
      >
        {{ $t('form.phone') }}*</InputField
      >
      <slot name="header">
        <BaseHeading class="u-mt-large s-password" tag="h6">{{
          $t('form.password.update')
        }}</BaseHeading>
      </slot>
      <InputField
        v-model="formData.oldPassword"
        class="o-row__column u-mb-tiny"
        type="password"
        >{{ $t('form.password.old') }} ({{ $t('form.leaveBlank') }})</InputField
      >
      <InputField
        v-model="formData.newPassword"
        class="o-row__column u-mb-tiny"
        type="password"
        >{{ $t('form.password.new') }} ({{ $t('form.leaveBlank') }})</InputField
      >
      <InputField
        v-model="formData.confirmPassword"
        class="o-row__column u-mb-tiny"
        type="password"
        >{{ $t('form.password.check') }}</InputField
      >
      <BaseButton
        class="u-mt-large"
        color="green"
        type="submit"
        :disabled="sending"
        >{{ $t('form.saveChanges') }}</BaseButton
      >
      <BaseMessage v-if="feedback.status" :status="feedback.status">{{
        feedback.message
      }}</BaseMessage>
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

const CSS_NAME = 'c-profile-update-form'
// Define (Props, Emits, Page Meta)
const props = defineProps({
  userData: {
    type: Object,
    required: true,
    validator(value) {
      return 'username' in value && 'email' in value
    },
  },
})
//form data
const formData = reactive({
  firstName: props.userData.firstName,
  lastName: props.userData.lastName,
  phone: props.userData.phone,
  email: props.userData.email,
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const feedback = reactive({
  status: null,
  message: null,
})

const emit = defineEmits(['api:start', 'api:end'])

const { sending, send, sent } = useSender(emit)

const update = useAccountStore()

const updateAccount = async () => {
  if (sending.value) {
    return
  }

  const response = await send(async () => await update.updateUser(formData))

  if (sent) {
    if (response.value.success) {
      feedback.status = 'success'
      feedback.message = response.value.message

      formData.firstName = response.value.data.firstName
      formData.lastName = response.value.data.lastName
      formData.email = response.value.data.email
      formData.phone = response.value.data.phone
      formData.oldPassword = ''
      formData.newPassword = ''
      formData.confirmPassword = ''
    } else {
      notify({
        message: response.value.message,
        status: 'danger',
      })
    }
  }
}
</script>

<style lang="scss">
@include scope('password') {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );
}
</style>
