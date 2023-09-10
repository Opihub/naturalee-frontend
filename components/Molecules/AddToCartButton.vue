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
const emit = defineEmits(['api:start', 'api:end'])

// Component life-cycle hooks

// Composables
const { sending, send } = useSender(emit)
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
const add = async () => {
  if (sending.value) {
    return
  }

  const success = await send(
    async () => await cartStore.addToCart(props.product, props.quantity)
  )

  if (success) {
    notifications.notify({
      message: t('cart.addedToCart', props.quantity, {
        named: {
          name: props.product.title,
          count: props.quantity,
        },
      }),
      status: 'success',
    })
  }
}
</script>
