<template>
  <div :class="CSS_NAME">
    <table>
      <thead v-if="slots.head">
        <slot name="head" />
      </thead>

      <tbody v-if="slots.body">
        <slot name="body" />
      </tbody>

      <tfoot v-if="slots.footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-table'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const slots = useSlots()

// Data

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
$prefix: 'table';
@include object($prefix) {
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: get-var(layout, auto, $prefix: $prefix);
  }

  /* Media Query per il No More Tables */
  @include until(tablet) {
    /* Forza la tabella a non comportarsi come una normale tabella */
    table,
    thead,
    tbody,
    tfoot,
    th,
    td,
    tr {
      display: block;
    }

    /* Nasconde le intestazioni della tabella */
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    /* Inserisce il comportamento come una riga */
    td:not(.is-full) {
      position: relative;
      padding-left: get-var(padding-left, 50%, $prefix: $prefix);
      padding-right: get-var(padding-right, 0, $prefix: $prefix);
      white-space: normal;
    }

    /* Inserisce il comportamento come un'intestazione di tabella */
    td[data-title]::before {
      position: absolute;

      top: 0;
      left: 0;
      width: calc(100% - get-var(padding-left, 50%, $prefix: $prefix));
      padding-left: get-var(offset-left, 0, $prefix: $prefix);
      padding-right: get-var(offset-right, 0, $prefix: $prefix);

      /* Aggiunge l'etichetta ai dati della tabella */
      content: attr(data-title);
    }
  }
}
</style>
