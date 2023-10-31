<template>
  <div :class="CSS_NAME">
    <div
      v-if="shippingMethods.length"
      :class="[`${CSS_NAME}__methods`, 'u-mb-half']"
    >
      <ToggleField
        v-for="shippingMethod in shippingMethods"
        :key="shippingMethod.id"
        radio
        class="u-mb-tiny"
        :value="shippingMethod.id"
        :model-value="method?.id"
        @update:model-value="(value) => updateShippingMethod(value)"
      >
        {{ shippingMethod.title }}
        <PriceHolder
          v-if="shippingMethod.price > 0"
          :price="shippingMethod.price"
        >
          <template #before>(</template>
          <template #after>)</template>
        </PriceHolder>
      </ToggleField>
    </div>

    <div :class="`${CSS_NAME}__form`">
      <span v-if="city"
        >Spedizione a <b>{{ city }}</b></span
      >
      <span v-else>
        {{ message }}
      </span>
      <InlineButton
        :class="[`${CSS_NAME}__form__toggle`, 'u-mt-micro']"
        underline="green"
        @click.prevent="isShippingFormOpen = !isShippingFormOpen"
      >
        Modifica indirizzo
      </InlineButton>

      <FormShippingAddress
        v-show="isShippingFormOpen"
        :address="address"
        tag="div"
        class="u-mt-half"
        @update="updateShippingAddress"
        @update:address="updateAddress"
        @not-available="showMissingShippingAddress"
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
const shippingMethods = ref([])
const isShippingFormOpen = ref(false)
const { address, updateAddress, method, updateMethod } = inject(
  'shipping',
  () => {}
)
const city = ref(null)
const message = ref(
  'Inserisci il tuo indirizzo per visualizzare le opzioni di spedizione.'
)

// Watcher

// Computed

// Methods
const updateShippingMethod = (methodId) => {
  const method = shippingMethods.value.find(
    (shippingMethod) => shippingMethod.id === methodId
  )

  updateMethod(method)
}

const updateShippingAddress = (methods) => {
  shippingMethods.value = methods

  // TODO: verificare nel caso dovessero cambiare i metodi di spedizione
  updateMethod(shippingMethods.value.find(() => true))

  city.value = address.value.city

  isShippingFormOpen.value = false
}

const showMissingShippingAddress = (response) => {
  shippingMethods.value = []

  updateMethod(null)

  message.value = response.value.message

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
      @include set-local-vars(
        $prefix: 'button',
        $map: (
          font-family: get-var(family-text),
        )
      );

      @include typography(15px, 18px);
    }
  }
}
</style>
