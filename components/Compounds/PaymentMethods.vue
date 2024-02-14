<template>
  <div :class="CSS_NAME">
    <div
      v-if="paymentMethods.length"
      :class="[`${CSS_NAME}__methods`, 'u-mb-half']"
    >
      <ToggleField
        v-for="paymentMethod in paymentMethods"
        :key="paymentMethod.id"
        radio
        class="u-mb-tiny"
        :value="paymentMethod.id"
        :model-value="modelValue?.id"
        @update:model-value="(value) => updatePaymentMethod(value)"
      >
        <span class="u-d-block">
          {{ paymentMethod.title }}
          <PriceHolder
            v-if="paymentMethod.price > 0"
            :price="paymentMethod.price"
          >
            <template #before>(</template>
            <template #after>)</template>
          </PriceHolder>
        </span>
        <small v-if="paymentMethod.description" class="u-d-block">{{
          paymentMethod.description
        }}</small>
      </ToggleField>
    </div>

    <slot />
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-payment'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  modelValue: {
    type: Object,
    default() {
      return {}
    },
  },
})
const emit = defineEmits(['update:modelValue'])

// Composables
const paymentMethods = await useApi(
  'shop/checkout/payments-methods',
  {},
  {
    dataOnly: true,
  }
)

// Data

// Watcher

// Computed

// Methods
const updatePaymentMethod = (methodId) => {
  const method = paymentMethods.value.find(
    (paymentMethod) => paymentMethod.id === methodId
  )

  if (props.modelValue?.id !== methodId) {
    emit('update:modelValue', method)
  }
}

// Component life-cycle hooks
if (!props.modelValue?.id) {
  updatePaymentMethod(paymentMethods.value.find(() => true)?.id)
}
</script>

<style lang="scss">
$prefix: 'payment';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'toggle-field',
    $map: (
      offset-top: rem(4px),
    )
  );
}
</style>
