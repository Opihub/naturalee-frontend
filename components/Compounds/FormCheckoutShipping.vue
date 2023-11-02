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
      <div :class="[columnClassName, columnFullClassName]">
        {{ $t('addresses.timeSlot') }}
      </div>

      <fieldset :class="rowClassName">
        <div
          v-for="slot in timeSlots"
          :key="slot.id"
          :class="[columnClassName, columnThirdClassName]"
        >
          <ToggleField
            :class="`${CSS_NAME}__time-slot`"
            radio
            boxed
            required
            :value="slot.id"
            :model-value="shipping.timeSlot?.id"
            @update:model-value="
              (value) => updateShippingData(value, 'timeSlot')
            "
          >
            <b class="u-mr-micro">{{ slot.title }}</b>
            <span>
              <time>{{ slot.from }}</time> - <time>{{ slot.to }}</time>
            </span>
          </ToggleField>
        </div>
        <BaseDatePicker
          @update:picke-date="updateDatePicked"
          @update:model-value="updateShippingData(datePicked, 'date')"
        />
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
let datePicked = ref(null)

// Watcher

// Computed

// Methods
const updateDatePicked = (date) => {
  datePicked = date
}

const updateShippingData = (value, field) => {
  const newAddress = { ...props.shipping }

  if (field === 'timeSlot') {
    value = props.timeSlots.find((timeSlot) => timeSlot.id === value)

    console.debug(value)
  }

  newAddress[field] = value

  if (newAddress[field] === props.shipping[field]) {
    return
  }

  emit('update:shipping', newAddress)
}
</script>
