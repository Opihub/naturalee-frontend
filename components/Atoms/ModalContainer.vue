<template>
  <Transition name="fade">
    <div :class="className" :style="style" v-bind="$attrs" @click="closeModal">
      <div :class="`${className}__body`" :style="style">
        <div :class="CSS_NAME_HEADER">
          <slot name="header" />

          <Suspense>
            <button
              :class="[`${className}__close`, `${className}__close--header`]"
              @click="closeModal"
            >
              <NuxtIcon name="close" />
            </button>
          </Suspense>
        </div>

        <div :class="`${className}__main`">
          <slot />
        </div>

        <slot name="footer" :class-name="CSS_NAME_FOOTER" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
const CSS_NAME = 'o-modal'
const CSS_NAME_HEADER = `${CSS_NAME}__header`
const CSS_NAME_FOOTER = `${CSS_NAME}__footer`

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  maxWidth: {
    type: [Number, String],
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['open', 'close', 'toggle'])

const { style } = useMaxWidth(props.maxWidth, 'modal')

const className = computed(() => {
  const className = [CSS_NAME]

  return className
})

onMounted(() => {
  emit('open')
  emit('toggle', true)
})

const closeModal = () => {
  emit('close')
  emit('toggle', false)
}
</script>

<style lang="scss">
$prefix: 'modal';
@include object($prefix) {
  $prefix-close: '#{$prefix}-close';
  $prefix-header: '#{$prefix}-header';

  position: fixed;
  inset: 0;
  padding: get-var(
    padding,
    get-var(padding, $prefix: 'container'),
    $prefix: $prefix
  );
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;

  @include element('body') {
    overflow: hidden;
    width: 100%;
    background-color: get-var(
      background,
      get-var(color-light),
      $prefix: $prefix
    );
    max-width: get-var(max-width, get-var(container-size), $prefix: $prefix);
    border-radius: get-var(radius, rem(30px), $prefix: $prefix);
  }

  @include element('main') {
    padding: rem(20px) rem(30px) rem(30px);

    @include from(tablet) {
      padding-top: rem(30px);
    }
  }

  @include element('header') {
    background-color: get-var(
      background,
      get-var(color-white),
      $prefix: $prefix-header
    );
    padding-left: rem(25px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    @include from(tablet) {
      padding-left: rem(30px);
    }
  }

  @include element('close') {
    padding: rem(30px);
    display: flex;
    margin: 0;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    border: 0;
    cursor: pointer;

    color: get-var(close-color, get-var(color-white), $prefix: $prefix-close);
    background-color: get-var(
      close-background,
      get-var(color-yellow),
      $prefix: $prefix-close
    );

    svg {
      width: rem(20px);
      height: rem(20px);
    }

    @include modifier('header') {
      flex: 0 0 auto;
      margin-left: rem(20px);

      @include from(tablet) {
        margin-left: rem(30px);
      }
    }
  }
}
</style>
