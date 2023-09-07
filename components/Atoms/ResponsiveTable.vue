<template>
  <div :class="CSS_NAME">
    <table>
      <thead>
        <slot name="head" />
      </thead>

      <tbody>
        <slot name="body" />
      </tbody>

      <tfoot>
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
    table-layout: auto;
  }

  /* Media Query per il No More Tables */
  @include until(tablet) {
    /* Forza la tabella a non comportarsi come una normale tabella */
    table,
    thead,
    tbody,
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
    td {
      position: relative;
      padding-left: 50%;
      white-space: normal;
    }

    /* Inserisce il comportamento come un'intestazione di tabella */
    td::before {
      position: absolute;

      top: 0;
      left: 6px;
      width: 45%;
    }

    /* Aggiunge l'etichetta ai dati della tabella */
    td::before {
      content: attr(data-title);
    }
  }
}
</style>
