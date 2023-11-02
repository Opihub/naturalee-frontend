<template>
  <ReceiptBlock :class="CSS_NAME">
    <template #header>
      <BaseHeading tag="span" use="custom" :text="heading" />
    </template>

    <template #default="{ className }">
      <slot
        :class-name="className"
        :row-class-name="`${CSS_NAME}__row`"
        :total-class-name="`${CSS_NAME}__total`"
        :grid-class-name="CSS_GRID_NAME"
        :grid-cell-class-name="CSS_GRID_CELL_NAME"
        :grid-cell-left-class-name="[CSS_GRID_CELL_NAME, `${CSS_NAME}__grid__cell--left`]"
        :grid-cell-right-class-name="[CSS_GRID_CELL_NAME, `${CSS_NAME}__grid__cell--right`]"
        :grid-cell-full-class-name="[CSS_GRID_CELL_NAME, `${CSS_NAME}__grid__cell--full`]"
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
const CSS_GRID_NAME = `${CSS_NAME}__grid`
const CSS_GRID_CELL_NAME = `${CSS_NAME}__grid__cell`

// Define (Props, Emits, Page Meta)
defineProps({
  heading: {
    type: String,
    required: true,
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
  $prefix-grid: 'order-resume-grid';
  @include set-local-vars(
    $prefix: 'receipt',
    $map: (
      padding: rem(40px),
    )
  );

  @include element('row') {
    border-bottom: get-var(border-bottom, rem(2px), $prefix: $prefix) solid
      get-var(color-light);
  }

  @include element('grid') {
    @include set-local-vars(
      $prefix: 'toggle-field',
      $map: (
        offset-top: rem(4px),
      )
    );

    display: grid;
    gap: rem(20px) 0;
    grid-template-columns: 1fr auto;

    @include element('sum') {
      font-weight: get-var(weight-bold);
    }

    @include element('cell') {
      @include modifier('left') {
        grid-column: 1 / 2;
        padding-left: get-var(padding, $prefix: 'receipt');
        padding-right: get-var(gap, rem(20px), $prefix: $prefix-grid);
      }

      @include modifier('right') {
        grid-column: 2 / 3;
        padding-right: get-var(padding, $prefix: 'receipt');
      }

      @include modifier('full') {
        grid-column: 1 / 3;
        padding-left: get-var(padding, $prefix: 'receipt');
        padding-right: get-var(padding, $prefix: 'receipt');
      }
    }

    @include element('total') {
      font-weight: get-var(weight-bold);
      border-top: 2px solid get-var(color-light);
      padding-top: rem(20px);

      @include object('price') {
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
