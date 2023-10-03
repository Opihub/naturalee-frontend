<template>
  <component
    :is="component"
    ref="playerElement"
    :class="className"
    :src="src"
    :style="style"
  />
</template>

<script setup>
// Imports
import Vlitejs from 'vlitejs'

// Constants
const CSS_NAME = 'o-video'
const CSS_CUSTOM_RATIO = `${CSS_NAME}--ratio`
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
  aspectRatio: {
    type: Array,
    default: null,
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
  if (props.aspectRatio) {
    player.value.outerContainer.style = style.value
    player.value.outerContainer.classList.add('v-border-radius')
  }
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.aspectRatio) {
    className.push(`${CSS_CUSTOM_RATIO}`)
  }

  return className
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
const style = computed(() => {
  const style = {}

  if (props.aspectRatio) {
    if (Array.isArray(props.aspectRatio)) {
      style['--video-ratio'] = `${props.aspectRatio[0]}/${props.aspectRatio[1]}`
    }
    if (typeof props.aspectRatio === 'string') {
      style['--video-ratio'] = `${props.aspectRatio}`
    }
  }
  return style
})

// Methods
</script>

<style lang="scss">
@import 'vlitejs/vlite.css';

$prefix: 'video';

.v-vlite.v-#{$prefix} {
  aspect-ratio: get-var(video-ratio);
  &.v-border-radius {
    border-radius: 50px;
  }
}
</style>
