<template>
  <div :class="CSS_NAME">
    <div
      v-if="shippingMethods.length"
      :class="[`${CSS_NAME}__methods`, 'u-mb-half']"
    >
      <ToggleField
        v-for="method in shippingMethods"
        :key="method.id"
        radio
        class="u-mb-tiny"
        :value="method.id"
        :model-value="selectedShippingMethods === method.id"
        @update:model-value="selectedShippingMethods = method.id"
        >{{ method.title }}</ToggleField
      >
    </div>

    <div :class="`${CSS_NAME}__form`">
      <span v-if="shippingData.city"
        >Spedizione a <b>{{ shippingData.city }}</b></span
      >
      <span v-else>
        Inserisci il tuo indirizzo per visualizzare le opzioni di spedizione.
      </span>
      <button
        :class="[`${CSS_NAME}__form__toggle`, 'u-mt-micro']"
        type="button"
        @click.prevent="isShippingFormOpen = !isShippingFormOpen"
      >
        Modifica indirizzo
      </button>

      <FormShipping
        v-show="isShippingFormOpen"
        class="u-mt-half"
        @update="updateShippingAddress"
      />
    </div>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-shipping'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data
const shippingData = ref({
  country: 'it',
  state: '',
  city: '',
  postcode: '',
})
const shippingMethods = ref([])
const selectedShippingMethods = ref(null)
const isShippingFormOpen = ref(false)

// Watcher

// Computed

// Methods
const updateShippingAddress = (shipping) => {
  shippingData.value = {...shipping.data}
  shippingMethods.value = shipping.methods

  selectedShippingMethods.value = shippingMethods.value[0].id

  isShippingFormOpen.value = false
}
</script>

<style lang="scss">
$prefix: 'shipping';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'toggle-field',
    $map: (
      offset-top: rem(4px),
    )
  );

  @include element('form') {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    @include element('toggle') {
      border: 0;
      border-radius: 0;
      padding: 0;
      background-color: transparent;
      font-weight: get-var(weight-regular);
      text-decoration: underline;
      color: get-var(color-black);
      text-decoration-color: get-var(color-green);
      text-underline-offset: rem(4px);
      text-decoration-thickness: 1px;
      cursor: pointer;
      @include typography(15px, 18px);
      @include transition(color, text-decoration-color);
      outline-offset: 3px;

      &:hover {
        color: get-var(color-green);
        text-decoration-color: get-var(color-yellow);
      }

      &:disabled {
        cursor: not-allowed;
        color: get-var(color-light);
        text-decoration-color: get-var(color-light);
      }
    }
  }
}
</style>
