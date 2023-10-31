<template>
  <BaseButton
    :class="className"
    type="button"
    :color="color"
    :disabled="isDisabled"
    :text="text"
    @click="add"
  >
    <template #default="{ svgStyle, svgFilled }">
      <Vue3Lottie
        v-if="sending"
        :class="`${CSS_NAME}__spinner`"
        :animation-data="SpinnerLottie"
        loop
        :width="21"
        :height="21"
        no-margin
      />

      <template v-else-if="animating">
        <Vue3Lottie
          :class="`${CSS_NAME}__animation`"
          :animation-data="BasketLottie"
          :loop="false"
          :play-animation="animating"
          :width="21"
          :height="21"
          no-margin
          @on-complete="reset"
        />
        <span :class="`${CSS_NAME}__text`">
          <slot name="added">{{ $t('cart.addedSuccessfully') }}</slot>
        </span>
      </template>

      <template v-else>
        <span :class="`${CSS_NAME}__text`"
          ><slot>{{ text }}</slot></span
        >
        <slot name="svg" :svg-style="svgStyle" :filled="svgFilled" />
      </template>
    </template>
  </BaseButton>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import BasketLottie from 'assets/lotties/CaMQMFqXYq.json'
import SpinnerLottie from 'assets/lotties/spinner.json'

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
    transform: scale(1.4);
  }

  @include element('animation') {
    transform: scale(3);
  }

  // @include is('sending') {
  //   @include element('text') {
  //     opacity: 0;
  //     visibility: hidden;
  //   }

  //   @include element('spinner') {
  //     opacity: 1;
  //     visibility: visible;
  //   }
  // }

  // @include is('confirming') {
  //   @include element('text') {
  //     opacity: 0;
  //     visibility: hidden;
  //   }

  //   @include element('animation') {
  //     opacity: 1;
  //     visibility: visible;
  //   }
  // }
}
</style>
