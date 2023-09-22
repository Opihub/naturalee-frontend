<template>
  <div :class="className" :style="style">
    <div :class="`${CSS_NAME} ${CSS_NAME}__image`">
      <NuxtImg :src="image" />
    </div>
    <div
      :class="`${CSS_NAME} ${CSS_NAME}__heading`"
      class="u-mt-medium u-mb-medium"
      :heading="heading"
    >
      <BaseHeading tag="h3">
        {{ heading }}
      </BaseHeading>
    </div>
    <div :class="`${CSS_NAME} ${CSS_NAME}__paragraph`" :paragraph="paragraph">
      <BaseParagraph>
        {{ paragraph }}
      </BaseParagraph>
      <slot />
    </div>
  </div>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'o-card'
// Define (Props, Emits, Page Meta)
const props = defineProps({
  image: {
    type: String,
    default: null,
  },
  heading: {
    type: String,
    default: null,
  },
  paragraph: {
    type: String,
    default: null,
  },
  width: {
    type: String,
    default: null,
  },
  height: {
    type: String,
    default: null,
  },
  alt: {
    type: String,
    default: null,
  },
})
// Component life-cycle hooks

// Data

// Watcher

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  //   if (props.contentCenter) {
  //     className.push(`${CSS_NAME}--centered`)
  //   }

  return className
})

const style = computed(() => {
  const style = {}

  if (props.width) {
    style['--card-width'] = props.width
  }

  if (props.height) {
    style['--card-height'] = props.height
  }
  if (props.objectFit) {
    style['--card-objectFit'] = props.objectFit
  }

  return style
})

// Methods
</script>

<style lang="scss" scoped>
$prefix: 'card';
@include object($prefix) {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: get-var(width, rem(350px), $prefix: $prefix);
  @include from('tablet') {
    width: get-var(width, rem(420px), $prefix: $prefix);
  }
  @include element('image') {
    width: 100%;
    height: 100%;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      object-fit: get-var(objectFit, contain, $prefix: $prefix);
    }
  }
  @include element('heading') {
    @include object('heading') {
      @include set-local-vars(
        $prefix: 'heading',
        $map: (
          'text-color': color-black,
        )
      );
    }
  }
}
</style>
