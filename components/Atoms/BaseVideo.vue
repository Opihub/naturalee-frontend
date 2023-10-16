<template>
  <component
    :is="component"
    :id="elementId"
    ref="playerElement"
    :class="className"
    :src="src"
    :data-youtube-id="src"
    :style="style"
  />
</template>

<script setup>
// Imports
import Vlitejs from 'vlitejs'
import VlitejsYoutube from 'vlitejs/providers/youtube'

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
  elementId: {
    type: String,
    default: null,
  },
  src: {
    type: String,
    default: null,
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

  Vlitejs.registerProvider('youtube', VlitejsYoutube)
  player.value = new Vlitejs(playerElement.value, config)
  if (props.aspectRatio) {
    player.value.outerContainer.style = style.value
    player.value.outerContainer.classList.add('v-border-radius')
  }
  if (props.provider !== 'html5') {
    player.value.outerContainer.classList.add('is-iframe')
    className.push('is-iframe')
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
  &.is-iframe {
    width: 100%;
    height: auto;
    padding-bottom: 50%;
    position: relative;
    & iframe {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  aspect-ratio: get-var(video-ratio);
  &.v-border-radius {
    border-radius: 50px;
  }

  & .v-bigPlay {
    --vlite-controlsOpacity: 1;
    --vlite-controlsColor: #{get-var(color-white)};
    & svg {
      stroke: none;
      background: get-var(color-green);
      border-radius: 100%;
    }
    &::after {
      content: 'Clicca qui per visionare il video';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
      color: white;
      font-size: 25px;
      width: 250px;
      font-weight: get-var(weight-extrabold);
    }
  }
}
</style>
