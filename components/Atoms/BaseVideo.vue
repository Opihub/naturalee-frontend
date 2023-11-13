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
import { useI18n } from '#imports'
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
  poster: null,
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
  poster: {
    type: String,
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

// Composables
const { t } = useI18n()

// Data
const player = ref(null)
const playerElement = ref(null)
const providers = useState('videoProviders', () => [])

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (!player.value) {
    className.push('is-loading')
  }

  if (props.aspectRatio) {
    className.push(`${CSS_CUSTOM_RATIO}`)
  }

  return className
})

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
    style['--video-ratio'] = formatAspectRatio(props.aspectRatio)
  }

  return style
})

// Methods
const formatAspectRatio = (prop) => {
  if (Array.isArray(prop)) {
    return `${prop[0]}/${prop[1]}`
  }
  if (typeof prop === 'string') {
    return `${prop.aspectRatio}`
  }
}

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

  if (props.poster) {
    options['poster'] = props.poster
  }

  config.options = {
    ...options,
    ...inheritOptions,
  }

  if (props.provider === 'youtube' && !providers.value.includes('youtube')) {
    Vlitejs.registerProvider('youtube', VlitejsYoutube)
    providers.value.push('youtube')
  }

  player.value = new Vlitejs(playerElement.value, config)
  if (props.aspectRatio) {
    player.value.outerContainer.style = style.value
    player.value.outerContainer.classList.add('v-border-radius')
  }

  if (props.provider !== 'html5') {
    player.value.outerContainer.classList.add('is-iframe')
    player.value.outerContainer.style = `--video-ratio: ${formatAspectRatio(
      props.aspectRatio
    )}`
  }
})
</script>

<style lang="scss">
@import 'vlitejs/vlite.css';

$prefix: 'video';
@include object($prefix) {
  @include is('loading') {
    width: 100%;
    aspect-ratio: get-var(video-ratio, '16 / 9');
    background-color: get-var(color-black);
    border-radius: rem(50px);
    @include customMedia(600px, true) {
      border-radius: rem(30px);
    }
  }
}

.v-vlite.v-#{$prefix} {
  aspect-ratio: get-var(video-ratio);

  &.is-iframe {
    width: 100%;
    height: auto;
    position: relative;

    iframe {
      height: 200%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);

      .ytp-large-play-button {
        display: none !important;
      }
    }
  }

  &.v-border-radius {
    border-radius: rem(50px);
    @include customMedia(600px, true) {
      border-radius: rem(30px);
    }
  }

  .v-bigPlay {
    width: auto;
    height: auto;
    outline: 0;

    --vlite-controlsOpacity: 1;
    --vlite-controlsColor: #{get-var(color-white)};

    svg {
      width: rem(215px);
      height: rem(215px);
      @include until(tablet) {
        width: rem(115px);
        height: rem(115px);
      }
      margin: 0 auto rem(18px);
      stroke: none;
      background: get-var(color-green);
      border-radius: 100%;
    }
  }
}
</style>
