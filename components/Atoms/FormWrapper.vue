<template>
  <form :class="CSS_NAME">
    <slot
      :class-name="CSS_NAME"
      :row-class-name="CSS_FORM_FIELDSET"
      :column-class-name="CSS_FORM_FIELD"
      :column-full-class-name="CSS_FORM_FIELD_FULL"
      :column-half-class-name="CSS_FORM_FIELD_HALF"
<<<<<<< HEAD
      :column-one-third-class-name="CSS_FORM_FIELD_ONE_THIRD"
=======
      :column-third-class-name="CSS_FORM_FIELD_THIRD"
      :column-quarter-class-name="CSS_FORM_FIELD_QUARTER"
>>>>>>> origin/checkout
    />
  </form>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-form'
const CSS_FORM_FIELD = `${CSS_NAME}__field`
const CSS_FORM_FIELDSET = `${CSS_NAME}__fieldset`
const CSS_FORM_FIELD_FULL = `${CSS_FORM_FIELD}--full`
const CSS_FORM_FIELD_HALF = `${CSS_FORM_FIELD}--half`
<<<<<<< HEAD
const CSS_FORM_FIELD_ONE_THIRD = `${CSS_FORM_FIELD}--one_third`
=======
const CSS_FORM_FIELD_THIRD = `${CSS_FORM_FIELD}--third`
const CSS_FORM_FIELD_QUARTER = `${CSS_FORM_FIELD}--quarter`
>>>>>>> origin/checkout

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'form';
$prefix-field: 'field';
$prefix-fieldset: 'fieldset';
@include layout($prefix, $prefix-field, $prefix-fieldset) {
  @include until(tablet) {
    justify-content: center;
  }
<<<<<<< HEAD
}
@include layout($prefix, 'field') {
  @include from('tablet') {
    @include element('field') {
      @include modifier('one_third') {
        @include set-local-vars(
          $prefix: 'form',
          $map: (
            columns: 3,
          )
        );
      }
      @include modifier('half') {
        @include set-local-vars(
          $prefix: 'form',
          $map: (
            columns: 2,
          )
        );
      }
=======

  @include element($prefix-fieldset) {
    width: 100%;
    border: 0;
    margin: 0;
    padding: 0 0 get-var(gap, 0, $prefix: form-fieldset);
    border-bottom: get-var(border, none, $prefix: form-fieldset);
  }

  @include from(tablet) {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        columns: 2,
      )
    );

    @include element($prefix-field) {
      @include modifier('half') {
        @include set-local-vars(
          $prefix: $prefix-field,
          $map: (
            size: calc(get-var(columns, 1, $prefix: $prefix) / 2),
          )
        );
      }

      @include modifier('third') {
        @include set-local-vars(
          $prefix: $prefix-field,
          $map: (
            size: calc(get-var(columns, 1, $prefix: $prefix) / 3),
          )
        );
      }

      @include modifier('quarter') {
        @include set-local-vars(
          $prefix: $prefix-field,
          $map: (
            size: calc(get-var(columns, 1, $prefix: $prefix) / 4),
          )
        );
      }

>>>>>>> origin/checkout
      @include modifier('full') {
        @include set-local-vars(
          $prefix: $prefix-field,
          $map: (
            width: 100%,
          )
        );
      }
    }
  }
}
</style>
