<template>
  <component
    :is="tag"
    :class="CSS_NAME"
    method="GET"
    @submit.prevent="applyCoupon"
  >
    <template v-if="!isForm">
      <Teleport to="body">
        <form :id="FORM_ID" method="GET" @submit.prevent="applyCoupon"></form>
      </Teleport>
    </template>

    <InputField
      v-model="coupon"
      :form="!isForm ? FORM_ID : null"
      :class="`${CSS_NAME}__input`"
      type="text"
      :placeholder="placeholder"
      rounded
      borderless
      required
      :disabled="sending || hasCoupon"
    />

    <BaseButton
      :form="!isForm ? FORM_ID : null"
      :class="`${CSS_NAME}__submit`"
      type="submit"
      color="yellow"
      :disabled="!coupon || sending"
      >{{
        $t(hasCoupon ? 'coupon.actions.remove' : 'coupon.actions.apply')
      }}</BaseButton
    >
  </component>
</template>

<script setup>
// Constants
const CSS_NAME = 'c-coupon-form'
const FORM_ID = 'coupon-form'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  placeholder: {
    type: String,
    default: null,
  },
  tag: {
    type: String,
    default: 'form',
    validator(value) {
      return ['form', 'div', 'section'].includes(value)
    },
  },
})

// Pinia Store
const cartStore = useCartStore()

// Component life-cycle hooks

// Composables
const { sending, send } = useSender()

// Data
const { coupon: usedCoupon, hasCoupon } = storeToRefs(cartStore)
const coupon = ref(usedCoupon.value?.code || '')

// Watcher

// Computed
const isForm = computed(() => {
  return props.tag === 'form'
})

// Methods
const applyCoupon = async () => {
  if (!coupon.value) {
    return
  }

  if (hasCoupon.value) {
    cartStore.removeCoupon()
    coupon.value = ''
    return
  }

  if (sending.value) {
    return
  }

  await send(async () => await cartStore.applyCoupon(coupon.value))
}
</script>

<style lang="scss">
$prefix: 'coupon-form';
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
