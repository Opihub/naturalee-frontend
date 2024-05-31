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
        :class="[columnClassName, columnFullClassName]"
        type="text"
        required
      >
        {{ $t('form.mailField') }}</InputField
      >
      <InputField
        v-model="formData.phone"
        :class="[columnClassName, columnFullClassName]"
        type="tel"
      >
        {{ $t('form.phone') }}</InputField
      >

      <BaseHeading
        :class="[columnClassName, columnFullClassName]"
        tag="h6"
        class="u-mt-large"
        >{{ $t('form.password.update') }}</BaseHeading
      >

      <InputField
        v-model="formData.oldPassword"
        :class="[columnClassName, columnFullClassName]"
        type="password"
        >{{ $t('form.password.old') }} ({{ $t('form.leaveBlank') }})</InputField
      >

      <InputField
        v-model="formData.newPassword"
        :class="[columnClassName, columnFullClassName]"
        type="password"
        >{{ $t('form.password.new') }} ({{ $t('form.leaveBlank') }})</InputField
      >

      <InputField
        v-model="formData.confirmPassword"
        :class="[columnClassName, columnFullClassName]"
        type="password"
        >{{ $t('form.password.check') }}</InputField
      >

      <div :class="[columnClassName, columnFullClassName]">
        <BaseButton
          color="green"
          type="submit"
          :disabled="loading"
          :text="$t('form.saveChanges')"
        />
      </div>

      <div
        v-if="feedback.message"
        :class="[columnClassName, columnFullClassName, 'u-mt-ten']"
      >
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
import { useLoadingStore } from '@/stores/loading'

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

const update = useAccountStore()
const loadingStore = useLoadingStore()

const { loading } = storeToRefs(loadingStore)
const { setLoading } = loadingStore

const updateAccount = async () => {
  if (loading.value) {
    return
  }

  setLoading(true)

  let status = 'danger'
  let message = 'danger'

  feedback.message = null

  try {
    const response = await update.updateUser(formData)
    console.log(response)

    if (response.value.success) {
      status = 'success'

      formData.firstName = response.value.data.firstName
      formData.lastName = response.value.data.lastName
      formData.email = response.value.data.email
      formData.phone = response.value.data.phone
      formData.oldPassword = ''
      formData.newPassword = ''
      formData.confirmPassword = ''
    }

    message = response.value.message
  } catch (error) {
    console.warn(error)

    message =
      "È avvenuto un errore durante l'aggiornamento dell'utente"
  }

  feedback.status = status
  feedback.message = message

  setLoading(false)
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
