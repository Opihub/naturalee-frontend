<template>
  <form :class="className" :style="style">
    <slot
      :class-name="CSS_NAME"
      :column-class-name="CSS_FORM_FIELD"
      :column-full-class-name="CSS_FORM_FIELD_FULL"
      :column-half-class-name="CSS_FORM_FIELD_HALF"
    />
  </form>
</template>

<script setup>
const CSS_NAME = 'o-form'
const CSS_FORM_FIELD = `${CSS_NAME}__field`
const CSS_FORM_FIELD_FULL = `${CSS_FORM_FIELD}--full`
const CSS_FORM_FIELD_HALF = `${CSS_FORM_FIELD}--half`

const props = defineProps({
  maxWidth: {
    type: [Number, String],
    default: null,
  },
  padless: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
  flex: {
    type: Boolean,
    default: false,
  },
})

const { style: maxWidth } = useMaxWidth(
  props.full ? '100%' : props.maxWidth,
  'container'
)

const style = computed(() => {
  let style = {}

  if (maxWidth.value) {
    style = { ...maxWidth.value }
  }

  if (props.padless || props.full) {
    style['--container-padding'] = 0
  }
  return style
})

const className = computed(() => {
  const className = [CSS_NAME]
  if (props.flex) {
    className.push(`${CSS_NAME}--flex`)
  }

  return className
})
</script>

<style lang="scss">
$prefix: 'form';
@include object($prefix) {
  @include until('tablet') {
    justify-content: center;
  }
}
@include layout($prefix, 'field') {
  @include from('tablet') {
    @include set-local-vars(
      $prefix: 'form',
      $map: (
        columns: 2,
      )
    );
    @include element('field') {
      @include modifier('full') {
        @include set-local-vars(
          $prefix: 'field',
          $map: (
            width: 100%,
          )
        );
      }
    }
  }
}
</style>
