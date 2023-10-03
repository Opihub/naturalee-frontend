<template>
  <BackgroundHolder :class="CSS_NAME" tag="section" :color="color">
    <SiteContainer :style="style" flipped>
      <div :class="`${CSS_NAME}__content`">
        <BaseHeading
          v-if="slots['sup-title']"
          :tag="supTitleTag"
          use="h6"
          class="u-mb-micro"
          ><slot name="sup-title"
        /></BaseHeading>
        <BaseHeading
          v-if="slots.title"
          :tag="titleTag"
          use="h2"
          class="u-mb-medium"
          ><slot name="title"
        /></BaseHeading>

        <BaseParagraph
          v-if="slots.default"
          :color="color == 'white' ? 'black' : 'white'"
          ><slot
        /></BaseParagraph>

        <BaseButton
          v-if="button?.text"
          :as="button.to ? 'link' : 'button'"
          :target="button.target || null"
          :color="button.color || 'yellow'"
          class="u-mt-large u-mt-huge@tablet"
          >{{ button.text }}</BaseButton
        >
      </div>

      <div :class="[`${CSS_NAME}__parallax`, 'u-mb-large', 'u-mb-none@tablet']">
        <NuxtImg
          ref="parallaxElement"
          :class="`${CSS_NAME}__parallax__image`"
          :src="image"
        />
      </div>
    </SiteContainer>
  </BackgroundHolder>
</template>

<script setup>
// Imports
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Constants
const CSS_NAME = 'c-content-row'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  color: {
    type: String,
    default: 'green',
  },
  supTitleTag: {
    type: String,
    default: 'h6',
  },
  titleTag: {
    type: String,
    default: 'h2',
  },
  image: {
    type: String,
    required: true,
  },
  offset: {
    type: Number,
    default: 0.075,
  },
  button: {
    type: Object,
    default: null,
    required: false,
    validator(value) {
      return 'text' in value
    },
  },
  borderRadius: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const parallax = getElement(parallaxElement)

  // https://greensock.com/forums/topic/24712-how-to-create-parallax-effect-with-gsap/
  gsap
    .timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    .to(parallax, { y: parallax.offsetHeight * props.offset, ease: 'none' }, 0)
})

// Composables
const slots = useSlots()
const parallaxElement = ref(null)

// Data

// Watcher

// Computed
const style = computed(() => {
  const style = {}

  if (props.borderRadius) {
    style['--image-border-radius'] = props.borderRadius
  }
  return style
})
// Methods
</script>

<style lang="scss">
$prefix: 'content-row';
@include component($prefix) {
  $prefix-parallax: '#{$prefix}-parallax';
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      wrap: nowrap,
      direction: column,
    )
  );

  padding: rem(40px) 0;

  @include from(tablet) {
    padding: 0;

    @include set-local-vars(
      $prefix: 'container',
      $map: (
        direction: row,
      )
    );
  }

  @include element('content') {
    flex: 0 0 auto;
    order: 2;
    width: 100%;

    @include from(tablet) {
      order: 1;
      max-width: get-var(content-width, rem(520px), $prefix: $prefix);
    }

    @include from(tablet) {
      margin: get-var(margin, 0, $prefix: $prefix) 0;
    }
  }

  @include element('parallax') {
    flex: 1 1 100%;
    width: 100%;
    order: 1;
    align-self: stretch;
    position: relative;

    @include from(tablet) {
      order: 2;
      margin-left: get-var(parallax-margin-left, auto);
      max-width: get-var(width, rem(925px), $prefix: $prefix-parallax);
    }

    @include element('image') {
      border-radius: get-var(image-border-radius, 0);
      @include from(tablet) {
        position: absolute;
        margin: get-var(offset, 0, $prefix: $prefix-parallax);
      }
    }
  }
}
</style>
