<template>
  <component
    :is="component"
    ref="playerElement"
    :class="className"
    :src="src"
  />
</template>

<script setup>
// Imports
import Vlitejs from 'vlitejs'

// Constants
const CSS_NAME = 'o-video'
const VIDEO_OPTIONS = {
  controls: false,
  autoplay: true,
  playPause: false,
  progressBar: false,
  time: false,
  volume: false,
  fullscreen: false,
  bigPlay: false,
  playsinline: true,
  loop: true,
  muted: true,
}

// Define (Props, Emits, Page Meta)
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  background: {
    type: Boolean,
    default: false,
  },
  onReady: {
    type: Function,
    default() {
      return () => {}
    },
  },
  provider: {
    type: String,
    default: 'html5',
    validator(value) {
      return ['html5', 'youtube', 'vimeo', 'dailymotion'].includes(value)
    },
  },
  options: {
    type: Object,
    default() {
      return {}
    },
  },
})

// Component life-cycle hooks
onMounted(() => {
  const { options: inheritOptions, provider } = props

  const config = {
    provider,
    onReady: props.onReady,
  }

  let options = {}
  if (props.background) {
    options = VIDEO_OPTIONS
  }

  config.options = {
    ...options,
    ...inheritOptions,
  }

  player.value = new Vlitejs(playerElement.value, config)
})

// Composables

// Data
const player = ref(null)
const playerElement = ref(null)

// Watcher

// Computed
const component = computed(() => {
  if (props.provider === 'html5') {
    return 'video'
    // return 'audio'
  }

  return 'div'
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.background) {
    className.push(`${CSS_NAME}--background`)
  }

  return className
})

// Methods
</script>

<style lang="scss">
@import 'vlitejs/vlite.css';

$prefix: 'video';
@include object($prefix) {
  @include modifier('background') {
    pointer-events: none;
  }
}
</style>
