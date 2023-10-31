<template>
  <Datepicker
    v-model="date"
    class="o-date-picker"
    :enable-time-picker="false"
    inline
    auto-apply
    disable-year-select
    :locale="locale"
    :format="format"
  />
</template>

<script setup>
// Imports
/* https://vue3datepicker.com/ */
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// Constants
//const CSS_NAME = 'o-highlight-text'
// Define (Props, Emits, Page Meta)
//const props = defineProps({
//   text: {
//     type: String,
//     default: null,
//   },
//   color: {
//     type: String,
//     default: null,
//     validator(value) {
//       return [
//         'green',
//         'red',
//         'brown',
//         'orange',
//         'yellow',
//         'light',
//         'dark',
//         'white',
//         'black',
//       ].includes(value)
//     },
//   },
//})

// Component life-cycle hooks

// Data
const date = ref(new Date())
const locale = ref(navigator.language)
const format = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
// Watcher

// Computed

//Methods
</script>

<style lang="scss" scoped>
$prefix: 'date-picker';
.dp__active_date {
  background: get-var(color-green) !important;
}
@include object($prefix) {
  display: block;
}
</style>
