<template>
  <FormAddress :class="CSS_NAME">
    <template
      #before="{
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnThirdClassName,
      }"
    >
      <fieldset :class="rowClassName">
        <div :class="[columnClassName, columnFullClassName]">
          {{ $t('coupon.asking') }}
          <InlineButton
            underline
            @click="isCouponFormOpen = !isCouponFormOpen"
            >{{ $t('coupon.insertHere') }}</InlineButton
          >

          <FormCoupon
            v-show="isCouponFormOpen"
            tag="div"
            class="u-mt-mini"
            :placeholder="$t('coupon.formPlaceholder')"
          />
        </div>
      </fieldset>

      <div :class="[columnClassName, columnFullClassName]">
        {{ $t('addresses.timeSlot') }}
      </div>

      <fieldset :class="rowClassName">
        <div
          style="background-color: #fff"
          :class="[columnClassName, columnThirdClassName]"
        >
          <ToggleField
            v-for="slot in timeSlots"
            :key="slot.id"
            :class="`${CSS_NAME}__time-slot`"
            radio
            boxed
            :model-value="shipping.timeSlot === slot.id"
            @update:model-value="() => updateShippingData(slot.id, 'timeSlot')"
          >
            <b class="u-mr-micro">{{ slot.title }}</b>
            <span>
              <time>{{ slot.from }}</time> - <time>{{ slot.to }}</time>
            </span>
          </ToggleField>
        </div>
      </fieldset>
    </template>

    <template
      #after="{ columnClassName, columnFullClassName, columnHalfClassName }"
    >
      <InputField
        :model-value="shipping.phone"
        :class="[columnClassName, columnHalfClassName]"
        type="tel"
        name="phone"
        required
        @update:model-value="(value) => updateShippingData(value, 'phone')"
      >
        {{ $t('form.phone') }}
      </InputField>

      <InputField
        :model-value="shipping.email"
        :class="[columnClassName, columnHalfClassName]"
        type="email"
        name="email"
        required
        @update:model-value="(value) => updateShippingData(value, 'email')"
      >
        {{ $t('form.mailField') }}
      </InputField>

      <InputField
        :model-value="shipping.note"
        :class="[columnClassName, columnFullClassName]"
        type="textarea"
        name="note"
        :placeholder="$t('checkout.notesPlaceholder')"
        @update:model-value="(value) => updateShippingData(value, 'note')"
      >
        {{ $t('orders.notes') }}
      </InputField>
    </template>
  </FormAddress>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-shipping-form'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  timeSlots: {
    type: Array,
    default() {
      return []
    },
  },
  shipping: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:shipping'])

// Component life-cycle hooks

// Composables

// Data
const isCouponFormOpen = ref(false)

// Watcher

// Computed

// Methods
const updateShippingData = (value, field) => {
  const newAddress = { ...props.shipping }
  newAddress[field] = value

  if (newAddress[field] === props.shipping[field]) {
    return
  }

  emit('update:shipping', newAddress)
}
</script>

<style lang="scss">
$prefix: 'shipping-form';
@include component($prefix) {}
</style>
