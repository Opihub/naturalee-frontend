<template>
  <div :class="CSS_NAME" :style="style">
    <Suspense>
      <MarkerPlaceholder :class="`${CSS_NAME}__marker`" />
    </Suspense>
    <span :class="`${CSS_NAME}__text`">{{ text }}</span>
  </div>
</template>

<script setup>
import MarkerPlaceholder from 'assets/svg/marker-placeholder.svg'

const CSS_NAME = 'o-marker'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: null,
  },
})

const style = computed(() => {
  const style = {}

  if (props.color) {
    style['--marker-background'] = props.color
    style['--marker-text'] = invertColor(props.color)
  }

  return style
})
</script>

<style lang="scss">
$prefix: 'marker';
@include object($prefix) {
  display: block;
  position: relative;
  user-select: none;
  text-align: center;
  text-transform: uppercase;
  font-weight: get-var(weight-bold);
  @include typography(15px, 19px);

  @include element('marker') {
    display: block;
    fill: get-var(background, get-var(color-green), $prefix: $prefix);
    width: get-var(width, rem(117px), $prefix: $prefix);
    height: get-var(height, rem(39px), $prefix: $prefix);
  }

  @include element('text') {
    display: block;
    position: absolute;
    inset: 50% 0 auto 0;
    pointer-events: none;
    padding: rem(5px);
    color: get-var(text, get-var(color-white), $prefix: $prefix);
    transform: translateY(-50%);
  }
}
</style>
../../utils/color
