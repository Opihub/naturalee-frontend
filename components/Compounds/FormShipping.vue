<template>
  <FormWrapper :class="CSS_NAME">
    <template
      #default="{
        rowClassName,
        columnClassName,
        columnFullClassName,
        columnHalfClassName,
        columnThirdClassName,
      }"
    >
      <fieldset :class="rowClassName">
        <div :class="[columnClassName, columnFullClassName]">
          Hai un codice promozionale?
          <InlineButton underline @click="isCouponFormOpen = !isCouponFormOpen"
            >Fai clic qui per inserire il tuo codice promozionale</InlineButton
          >

          <FormCoupon
            v-show="isCouponFormOpen"
            class="u-mt-mini"
            :placeholder="$t('coupon.formPlaceholder')"
          />
        </div>
      </fieldset>

      <div :class="[columnClassName, columnFullClassName]">
        Scegli una fascia oraria per la consegna:
      </div>

      <fieldset :class="rowClassName">
        <div
          style="background-color: #fff"
          :class="[columnClassName, columnThirdClassName]"
        >
          <ToggleField
            v-for="slot in timeSlots"
            :key="slot.id"
            radio
            :model-value="formData.timeSlot === slot.id"
            @update:model-value="formData.timeSlot = slot.id"
          >
            <b>{{ slot.title }}</b>
            <span>
              <time>{{ slot.from }}</time> - <time>{{ slot.to }}</time>
            </span>
          </ToggleField>
        </div>
      </fieldset>

      <InputField
        v-model="formData.address.firstName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        name="firstName"
        required
      >
        Nome*
      </InputField>
      <InputField
        v-model="formData.address.lastName"
        :class="[columnClassName, columnHalfClassName]"
        type="text"
        name="firstName"
        required
      >
        Cognome*
      </InputField>

      <InputField
        v-model="formData.address.country"
        :class="[columnClassName, columnFullClassName]"
        type="select"
        name="country"
        :data="countries"
      >
        Paese/Regione
      </InputField>

      <InputField
        v-model="formData.address.address"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        name="address"
        placeholder="Via/Piazza e Numero Civico"
        required
      >
        Via e numero*
      </InputField>
      <InputField
        v-model="formData.address.address2"
        :class="[columnClassName, columnFullClassName]"
        type="text"
        name="address2"
        placeholder="Appartamento, suite, unità, piano, ecc. (opzionale)"
      />

      <InputField
        v-model="formData.address.postcode"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        name="postcode"
        error="CAP non valido"
        pattern="\d{5}"
        required
      >
        CAP*
      </InputField>
      <InputField
        v-model="formData.address.city"
        :class="[columnClassName, columnThirdClassName]"
        type="text"
        name="city"
        required
      >
        Città*
      </InputField>
      <ProvincesSelect
        v-model="formData.address.country"
        :class="[columnClassName, columnThirdClassName]"
        name="country"
      >
        Paese/Regione
      </ProvincesSelect>

      <InputField
        v-model="formData.address.phone"
        :class="[columnClassName, columnHalfClassName]"
        type="tel"
        name="phone"
        required
      >
        Telefono*
      </InputField>

      <InputField
        v-model="formData.address.email"
        :class="[columnClassName, columnHalfClassName]"
        type="email"
        name="email"
        required
      >
        E-mail*
      </InputField>

      <InputField
        v-model="formData.note"
        :class="[columnClassName, columnFullClassName]"
        type="textarea"
        name="note"
        placeholder="Note sull'ordine, ad esempio richieste particolare per la consegna..."
      >
        Note sull'ordine
      </InputField>
    </template>
  </FormWrapper>
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
  address: {
    type: Object,
    required: true,
  },
})

// Component life-cycle hooks

// Composables

// Data
const isCouponFormOpen = ref(false)
const countries = ref({ IT: 'Italia' })

const formData = reactive({
  note: '',
  timeSlot: props.timeSlots?.[0]?.id,
  address: { ...props.address },
})

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'shipping-form';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'form',
    $map: (
      columns: 3,
      fieldset-gap: rem(20px),
      fieldset-border: 2px solid get-var(color-white),
    )
  );

  @include set-local-vars(
    $prefix: 'input-field-label',
    $map: (
      margin: 0 0 rem(8px),
    )
  );

  @include typography(18px, 22px);
}
</style>
