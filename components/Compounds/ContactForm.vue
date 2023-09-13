<template>
  <form :class="CSS_NAME" method="POST" @submit.prevent="">
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

    <div class="o-row">
      <InputField
        v-model="formData.email"
        class="o-row__column s-email"
        type="text"
        required
      >
        {{ $t('form.mailField') }}</InputField
      >

      <InputField
        v-model="formData.message"
        class="o-row__column u-mb-tiny"
        type="textarea"
        >{{ $t('form.message') }}</InputField
      >
      <ToggleField v-model="formData.remember">
        {{ $t('form.login') }}
      </ToggleField>
    </div>
    <BaseButton
      class="u-mt-large"
      color="green"
      type="submit"
      :disabled="sending || disabled"
      >{{ $t('form.submitContact') }}</BaseButton
    >
  </form>
</template>

<script setup>
// import { useAccountStore } from '@/stores/account'

// const CSS_NAME = 'c-profile-update-form'
// // Define (Props, Emits, Page Meta)
// const props = defineProps({
//   userData: {
//     type: Object,
//     required: true,
//     validator(value) {
//       return 'username' in value && 'email' in value
//     },
//   },
// })
//form data
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
})

// const emit = defineEmits(['api:start', 'api:end'])

// const { sending, send } = useSender(emit)

// const update = useAccountStore()

// const updateAccount = async () => {
//   if (sending.value) {
//     return
//   }

//   const response = await send(async () => await update.updateUser({ formData }))
// }
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
