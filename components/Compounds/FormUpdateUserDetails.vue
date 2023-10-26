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
        class="u-mb-ten"
        type="text"
        required
      >
        {{ $t('form.name') }}</InputField
      >

      <InputField
        v-model="formData.lastName"
        :class="[columnClassName, columnHalfClassName]"
        class="u-mb-ten"
        type="text"
        required
      >
        {{ $t('form.surname') }}</InputField
      >

      <InputField
        v-model="formData.email"
        :class="[columnClassName, columnFullClassName]"
        class="u-mb-ten"
        type="text"
        required
      >
        {{ $t('form.mailField') }}</InputField
      >
      <InputField
        v-model="formData.phone"
        :class="[columnClassName, columnFullClassName]"
        class="u-mb-ten"
        type="text"
        required
      >
        {{ $t('form.phone') }}</InputField
      >

      <BaseHeading
        :class="[columnClassName, columnFullClassName]"
        class="u-mt-large"
        tag="h6"
        >{{ $t('form.password.update') }}</BaseHeading
      >

      <InputField
        v-model="formData.oldPassword"
        :class="[columnClassName, columnFullClassName]"
        class="u-mb-ten"
        type="password"
        >{{ $t('form.password.old') }} ({{ $t('form.leaveBlank') }})</InputField
      >

      <InputField
        v-model="formData.newPassword"
        :class="[columnClassName, columnFullClassName]"
        class="u-mb-ten"
        type="password"
        >{{ $t('form.password.new') }} ({{ $t('form.leaveBlank') }})</InputField
      >

      <InputField
        v-model="formData.confirmPassword"
        :class="[columnClassName, columnFullClassName]"
        class="u-mb-ten"
        type="password"
        >{{ $t('form.password.check') }}</InputField
      >

      <div :class="[columnClassName, columnFullClassName]">
        <BaseButton
          color="green"
          type="submit"
          :disabled="sending"
          :text="$t('form.saveChanges')"
        />
      </div>

      <div v-if="feedback.message" :class="[columnClassName, columnFullClassName, 'u-mt-ten']">
        <BaseMessage :status="feedback.status">
          <span>{{ feedback.message }}</span>
        </BaseMessage>
      </div>
    </template>
  </FormWrapper>
</template>

<script setup>
// Imports
import { useAccountStore } from '@/stores/account'

// Constants
const CSS_NAME = 'c-profile-update-form'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  userData: {
    type: Object,
    required: true,
    validator(value) {
      return 'email' in value
    },
  },
})

// Data
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

const { sending, send, sent } = useSender()

const update = useAccountStore()

const updateAccount = async () => {
  if (sending.value) {
    return
  }

  feedback.message = null

  const response = await send(async () => await update.updateUser(formData))

  feedback.status = 'danger'

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
  }

  feedback.message = response.value.message
}
</script>

<style lang="scss">
$prefix: 'profile-update-form';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );

  @include set-local-vars(
    $prefix: 'form',
    $map: (
      row-gap: rem(20px),
      column-gap: rem(20px),
    )
  );
}
</style>
