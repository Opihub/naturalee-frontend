<template>
  <BaseButton :class="className" type="button" :color="color" @click="add">
    Aggiungi al carrello
  </BaseButton>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import { useNotificationsStore } from '@/stores/notifications'
import { useI18n } from 'vue-i18n'

// Constants
const CSS_NAME = 'c-add-to-cart'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator(value) {
      return (
        'id' in value &&
        'title' in value &&
        'provenance' in value &&
        'link' in value
      )
    },
  },
  quantity: {
    type: Number,
    default: 1,
  },
})

// Component life-cycle hooks

// Composables
const cartStore = useCartStore()
const notifications = useNotificationsStore()
const { t } = useI18n()

// Data
const color = ref('green')

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  return className
})

// Methods
const add = () => {
  notifications.notify({
    message: t('cart.addedToCart', props.quantity, {
      named: {
        name: props.product.title,
        count: props.quantity,
      }
    }),
    status: 'success',
  })

  cartStore.addToCart(props.product, props.quantity)
}
</script>
