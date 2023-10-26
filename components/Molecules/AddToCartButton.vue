<template>
  <BaseButton
    :class="className"
    type="button"
    :color="color"
    :disabled="isDisabled"
    :text="text"
    @click="add"
  >
    <span v-if="sending" :class="`${CSS_NAME}__spinner`" />

    <ClientOnly>
      <div v-if="animating" :class="`${CSS_NAME}__animation`">
        <Vue3Lottie
          :animation-data="BasketLottie"
          :loop="false"
          :play-animation="animating"
          :width="30"
          :height="30"
          no-margin
          @on-complete="reset"
        />
        Aggiunto con successo!
      </div>
    </ClientOnly>

    <span :class="`${CSS_NAME}__text`"
      ><slot>{{ text }}</slot></span
    >
  </BaseButton>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import BasketLottie from 'assets/lotties/CaMQMFqXYq.json'

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
  disabled: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: 'Aggiungi al carrello',
  },
})
const emit = defineEmits(['api:start', 'api:end'])

// Component life-cycle hooks

// Composables
const { sending, send } = useSender(emit)
const cartStore = useCartStore()

// Data
const animating = ref(false)

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (sending.value) {
    className.push('is-sending')
  } else if (animating.value) {
    className.push('is-confirming')
  }

  return className
})

const isDisabled = computed(() => {
  return props.disabled || animating.value || sending.value
})

const color = computed(() => {
  if (animating.value || sending.value) {
    return 'yellow'
  }

  return 'green'
})

// Methods
const add = async () => {
  if (sending.value) {
    return
  }

  const feedback = await send(
    async () => await cartStore.addToCart(props.product, props.quantity)
  )

  if (feedback) {
    animating.value = true
  }
}

const reset = () => {
  animating.value = false
}
</script>

<style lang="scss">
%centered {
  inset: 0;
  z-index: 1;
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: rem(5px);
  opacity: 0;
  visibility: hidden;
}

$prefix: 'add-to-cart';
@include component($prefix) {
  position: relative;

  & > * {
    @include transition(opacity, visibility);
  }

  @include element('text') {
    position: relative;
    z-index: 0;
    opacity: 1;
    visibility: visible;
  }

  @include element('spinner') {
    @extend %centered;

    &::before {
      content: '';
      display: block;
      border: 5px solid;
      border-top-color: rgba(get-var(rgb-green), 1);
      border-right-color: rgba(get-var(rgb-green), 0.66);
      border-bottom-color: rgba(get-var(rgb-green), 0.33);
      border-left-color: rgba(get-var(rgb-green), 0);
      border-radius: 100%;
      width: rem(30px);
      height: rem(30px);

      @include spinner($time: 0.5s);
    }
  }

  @include element('animation') {
    @extend %centered;

    svg {
      transform: scale(1.75) !important;
    }
  }

  @include is('sending') {
    @include element('text') {
      opacity: 0;
      visibility: hidden;
    }

    @include element('spinner') {
      opacity: 1;
      visibility: visible;
    }
  }

  @include is('confirming') {
    @include element('text') {
      opacity: 0;
      visibility: hidden;
    }

    @include element('animation') {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
