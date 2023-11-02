<template>
  <Datepicker
    v-model="date"
    :class="CSS_NAME"
    :enable-time-picker="false"
    :auto-apply="true"
    :disabled-week-days="[0]"
    :allowed-dates="allowedDates"
    :disabled-dates="holydays"
    :locale="$i18n.locale"
    :format="format"
  />
</template>

<script setup>
// Imports
/* https://vue3datepicker.com/ */
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// Constants
const CSS_NAME = 'o-date-picker'

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Data
const date = ref(new Date())
// Watcher

// Computed
const allowedDates = computed(() => {
  const currentDate = new Date(new Date().setDate(new Date().getDate() + 1))
  const endDate = new Date(new Date().setDate(new Date().getDate() + 365))
  const dates = []
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
})

const holydays = computed(() => {
  const year = new Date().getFullYear()
  let holidays = [
    new Date(`${year}-1-1`),
    new Date(`${year}-1-6`),
    new Date(`${year}-4-25`),
    new Date(`${year}-5-1`),
    new Date(`${year}-6-2`),
    new Date(`${year}-8-15`),
    new Date(`${year}-11-1`),
    new Date(`${year}-12-25`),
    new Date(`${year}-12-26`),
    new Date(`${year + 1}-1-1`),
    new Date(`${year + 1}-1-6`),
    new Date(`${year + 1}-4-25`),
    new Date(`${year + 1}-5-1`),
    new Date(`${year + 1}-6-2`),
    new Date(`${year + 1}-8-15`),
    new Date(`${year + 1}-11-1`),
    new Date(`${year + 1}-12-25`),
    new Date(`${year + 1}-12-26`),
  ]
  holidays = holidays.concat(pasqua([year, year + 1]))
  return holidays
})

//Methods
// ritorna pasqua e pasquetta
const pasqua = (years) => {
  const dates = []
  years.forEach((year) => {
    const y = year
    const a = y % 19
    const b = Math.floor(y / 100)
    const c = y % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const n = Math.floor((h + l - 7 * m + 114) / 31)
    const p = (h + l - 7 * m + 114) % 31

    const month = n
    const day = p + 1

    //dates.push(new Date(`${y}-${month}-${day}`))

    dates.push(
      new Date(
        new Date(`${y}-${month}-${day}`).setDate(
          new Date(`${y}-${month}-${day}`).getDate() + 1
        )
      )
    )
  })
  return dates
}
const format = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
</script>

<style lang="scss">
$prefix: 'date-picker';

// @include object($prefix) {
//   display: block;
// }

.dp__theme_light {
  & div.dp__today {
    border: #{get-var(color-green)};
  }

  & div.dp__active_date {
    background: #{get-var(color-green)};
  }
}
</style>
