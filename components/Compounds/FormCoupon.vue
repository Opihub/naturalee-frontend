<template>
  <form
    :class="CSS_NAME"
    method="GET"
    v-bind="$attrs"
    @submit.prevent="applyCoupon"
  >
    <InputField
      v-model="coupon"
      :class="`${CSS_NAME}__input`"
      type="text"
      :placeholder="placeholder"
      rounded
      borderless
      required
    />

    <BaseButton
      :class="`${CSS_NAME}__submit`"
      type="submit"
      color="yellow"
      :disabled="!coupon"
      >Applica</BaseButton
    >
  </form>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-search'

// Define (Props, Emits, Page Meta)
defineProps({
  placeholder: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks

// Data
const coupon = ref('')

// Watcher

// Computed

// Methods
const applyCoupon = () => {
  if (!coupon.value) {
    return
  }

  // TODO: aggiungere chiamata al metodo per applicare coupon

  notify({
    message: 'Coupon applicato!',
    status: 'success'
  })
}
</script>

<style lang="scss">
$prefix: 'search';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'button',
    $map: (
      padding: rem(16px) rem(24px),
      font-weight: get-var(weight-extrabold),
      font-size: rem(15px),
      line-height: rem(19px),
      svg-gap: rem(12px),
    )
  );

  @include set-local-vars(
    $prefix: 'input',
    $map: (
      width: 100%,
      padding: rem(16px) rem(20px),
      font-size: get-var(font-size, rem(18px), $prefix: $prefix),
      line-height: get-var(line-height, rem(22px), $prefix: $prefix),
    )
  );

  display: flex;
  background-color: get-var(color-white);
  border-radius: get-var(border-circle);
  border: 1px solid get-var(color-black);
  font-size: get-var(font-size, rem(18px), $prefix: $prefix);
  line-height: get-var(line-height, rem(22px), $prefix: $prefix);
  display: flex;
  align-items: stretch;

  @include element('input') {
    flex: 0 1 100%;
  }

  @include element('submit') {
    flex: 0 0 auto;
  }
}
</style>
