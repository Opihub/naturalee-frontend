<template>
  <form :class="className" :style="style">
    <slot
      :class-name="CSS_NAME"
      :column-class-name="CSS_FORM_FIELD"
      :column-full-class-name="CSS_FORM_FIELD_FULL"
      :column-half-class-name="CSS_FORM_FIELD_HALF"
      :column-one-third-class-name="CSS_FORM_FIELD_ONE_THIRD"
    />
  </form>
</template>

<script setup>
const CSS_NAME = 'o-form'
const CSS_FORM_FIELD = `${CSS_NAME}__field`
const CSS_FORM_FIELD_FULL = `${CSS_FORM_FIELD}--full`
const CSS_FORM_FIELD_HALF = `${CSS_FORM_FIELD}--half`
const CSS_FORM_FIELD_ONE_THIRD = `${CSS_FORM_FIELD}--one_third`

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
    @include element('field') {
      @include modifier('one_third') {
        @include set-local-vars(
          $prefix: 'form',
          $map: (
            columns: 3,
          )
        );
      }
      @include modifier('half') {
        @include set-local-vars(
          $prefix: 'form',
          $map: (
            columns: 2,
          )
        );
      }
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
