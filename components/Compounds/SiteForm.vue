<template>
  <form :method="method" :action="action">
    <legend><slot /></legend>

    <fieldset>
      <InputField v-model="user.firstName" type="text" name="firstName">{{
        $t('form.name')
      }}</InputField>
      <InputField v-model="user.lastName" type="text" name="lastName">{{
        $t('form.surname')
      }}</InputField>
      <InputField v-model="user.age" type="number" :min="0">{{
        $t('form.age')
      }}</InputField>
    </fieldset>

    <BaseButton type="submit">{{ $t('form.submit') }}</BaseButton>
  </form>
</template>

<script setup>
defineProps({
  method: {
    type: String,
    default: 'POST',
  },
  action: {
    type: String,
    default: null,
  },
})

defineEmits(['update:modelValue'])

const user = reactive({
  firstName: '',
  lastName: '',
  age: 18,
})
</script>
