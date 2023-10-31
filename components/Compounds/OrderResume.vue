<template>
  <ReceiptBlock :class="CSS_NAME">
    <template #header>
      <BaseHeading tag="span" use="custom" :text="heading" />
    </template>

    <template #default="{ className }">
      <slot name="before" :class-name="[`${CSS_NAME}__row`, className]" />

      <TotalRecap
        class="u-pt-half u-pb-half"
        :class="`${CSS_NAME}__body`"
        :total="total"
        :sub-total="subTotal"
        :total-class-name="`${CSS_NAME}__body__total`"
        :without-sub-total="withoutSubTotal"
        :without-shipping="withoutShipping"
        :without-payment="withoutPayment"
      />

      <slot
        name="after"
        :class-name="[`${CSS_NAME}__row`, className]"
        :footer-class-name="[`${CSS_NAME}__footer`, className]"
      />
    </template>
  </ReceiptBlock>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-order-resume'

// Define (Props, Emits, Page Meta)
defineProps({
  heading: {
    type: String,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: null,
  },
  withoutSubTotal: {
    type: Boolean,
    default: false,
  },
  withoutShipping: {
    type: Boolean,
    default: false,
  },
  withoutPayment: {
    type: Boolean,
    default: true,
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'order-resume';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'receipt',
    $map: (
      padding: rem(40px),
    )
  );

  @include element('row') {
    border-bottom: 2px solid get-var(color-light);
  }

  @include element('body') {
    border-bottom: get-var(border-bottom, 0, $prefix: $prefix) solid
      get-var(color-light);

    @include set-local-vars(
      $prefix: 'toggle-field',
      $map: (
        offset-top: rem(4px),
      )
    );

    & > * {
      @include is('label') {
        padding-left: get-var(padding, $prefix: 'receipt');
      }

      @include is('data') {
        padding-right: get-var(padding, $prefix: 'receipt');
      }
    }

    @include element('total') {
      font-weight: get-var(weight-bold);
      border-top: 2px solid get-var(color-light);
      padding-top: rem(20px);

      @include modifier('price') {
        @include typography(22px, 35px);
      }
    }
  }

  @include element('footer') {
    @include object('button') {
      width: 100%;
    }
  }
}
</style>
