<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="updateAccount()">
    <div class="o-row s-name">
      <InputField
        v-model="formData.firstName"
        class="o-row__column u-mb-half"
        type="text"
        required
      >
        {{ $t('form.name') }}*</InputField
      >

      <InputField
        v-model="formData.lastName"
        class="o-row__column u-mb-half"
        type="text"
        required
      >
        {{ $t('form.surname') }}*</InputField
      >
    </div>
    <div class="o-row row-update-user">
      <InputField
        v-model="formData.username"
        class="o-row__column u-mb-half"
        type="text"
        required
      >
        {{ $t('form.displayName') }}</InputField
      >
    </div>
    <base-heading tag="span" class="u-mb-half">{{
      $t('form.displayNameMsg')
    }}</base-heading>
    <div class="o-row">
      <InputField
        v-model="formData.email"
        class="o-row__column s-email"
        type="text"
        required
      >
        {{ $t('form.mailField') }}</InputField
      >
      <slot name="header">
        <BaseHeading class="u-mt-large s-password" tag="h6">{{
          $t('form.updatePassw')
        }}</BaseHeading>
      </slot>
      <InputField
        v-model="formData.oldPassword"
        class="o-row__column u-mb-tiny"
        type="password"
        >{{ $t('form.oldPassw') }}</InputField
      >
      <InputField
        v-model="formData.newPassword"
        class="o-row__column u-mb-tiny"
        type="password"
        >{{ $t('form.newPassw') }}</InputField
      >
      <InputField
        v-model="formData.newPasswordCheck"
        class="o-row__column u-mb-tiny"
        type="password"
        >{{ $t('form.newPasswCheck') }}</InputField
      >
    </div>
    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="sending || disabled"
      >{{ $t('form.saveChanges') }}</BaseButton
    >
  </form>
</template>

<script setup>
import { useAccountStore } from '@/stores/account'

const CSS_NAME = 'c-profile-update-form'
// Define (Props, Emits, Page Meta)
const { userData } = defineProps(['userData'])

//form data
const formData = reactive({
  firstName: userData.firstName,
  lastName: userData.lastName,
  username: userData.username,
  email: userData.email,
  oldPassword: '',
  newPassword: '',
  newPasswordCheck: '',
})

const emit = defineEmits(['api:start', 'api:end'])

const { sending, send } = useSender(emit)

const update = useAccountStore()

const updateAccount = async () => {
  if (sending.value) {
    return
  }
  const { oldPassword, newPassword, newPasswordCheck } = formData

  const response = await send(async () => await update.updateUser(formData))

  if (
    oldPassword !== '' &&
    oldPassword &&
    newPassword !== '' &&
    newPassword &&
    newPasswordCheck !== '' &&
    newPasswordCheck
  ) {
    if (newPassword === newPasswordCheck) {
      console.log('match')
    }
  }
}
</script>

<style lang="scss">
@include from(tablet) {
  @include scope('name') {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 2,
      )
    );
  }
  @include scope('password') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        text-color: get-var(color-black),
      )
    );
  }
  .o-row.row-update-user {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 1,
      )
    );
  }
}
</style>
