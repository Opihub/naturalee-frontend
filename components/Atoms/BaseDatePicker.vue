<template>
  <Datepicker
    :model-value="date"
    :class="CSS_NAME"
    :enable-time-picker="false"
    auto-apply
    prevent-min-max-navigation
    :disabled-week-days="DISABLE_SUNDAY"
    :min-date="minDate"
    :max-date="maxDate"
    :year-range="yearsToShow"
    :disabled-dates="holidays"
    :locale="$i18n.locale"
    :format="getFormattedDate"
    @update:model-value="updateDate"
  />
</template>

<script setup>
// Imports
/* https://vue3datepicker.com/ */
import Datepicker from '@vuepic/vue-datepicker'

// Constants
const CSS_NAME = 'o-date-picker'
const DISABLE_SUNDAY = [0]

// Define (Props, Emits, Page Meta)
const emit = defineEmits(['update:date'])
defineProps({
  date: {
    type: Date,
    default() {
      return getToday()
    },
  },
})

// Component life-cycle hooks

// Data
const disabledDays = inject('holiday', () => [])
// La spedizione parte dall'indomani
const minDate = ref(getToday())
// La spedizione può essere richiesta max entro un mese
const maxDate = ref(new Date(new Date().setMonth(new Date().getMonth() + 1)))

// Watcher

// Computed
const holidays = computed(() => {
  const year = new Date().getFullYear()

  return [...disabledDays, ...getEaster([year, year + 1])]
})

const yearsToShow = computed(() => {
  return [minDate.value.getFullYear(), maxDate.value.getFullYear()]
})

// Methods
const updateDate = (date) => {
  emit('update:date', date)
}
</script>

<style lang="scss">
@import '@vuepic/vue-datepicker/dist/main.css';

$prefix: 'date-picker';

@include object($prefix) {
  & .dp__pointer:not(.dp__cell_inner) {
    font-size: rem(25px);
  }
  .dp__cell_offset {
    &:not(.dp__cell_disabled) {
      color: inherit;
    }

    &.dp__active_date {
      color: var(--dp-primary-text-color);
    }
  }

  .dp__today {
    border: #{get-var(color-green)};
  }

  .dp__active_date {
    background: #{get-var(color-green)};
  }
}
</style>
