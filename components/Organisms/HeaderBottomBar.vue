<template>
  <BackgroundHolder :class="className" :color="color">
    <SiteContainer :class="`${CSS_NAME}__container`">
      <BreadCrumb
        v-if="breadcrumb && breadcrumb.length"
        :class="`${CSS_NAME}__breadcrumb`"
        :menu="breadcrumb"
      />

      <SearchForm
        :search="search"
        :class="`${CSS_NAME}__search`"
        size="mini"
        placeholder="Di cosa hai bisogno?"
        @update:search="$emit('update:search', $event)"
      />
    </SiteContainer>
  </BackgroundHolder>
</template>

<script setup>
// Imports
import { useScroll } from '@vueuse/core'

// Constants
const CSS_NAME = 'c-bottom-bar'

// Define (Props, Emits, Page Meta)
defineProps({
  breadcrumb: {
    type: Array,
    default() {
      return []
    },
  },
  search: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'green',
  },
})

defineEmits(['update:search'])

// Component life-cycle hooks

// Data & Composables
const document = ref(globalThis.window?.document || null)
const { isScrolling, directions } = useScroll(document)
const { top: toTop } = toRefs(directions)
const isShowing = ref(false)

// Watcher
watch(isScrolling, (scroll) => {
  if (!scroll) {
    return
  }

  isShowing.value = toTop.value
})

// Computed
const className = computed(() => {
  const className = [CSS_NAME]

  if (isShowing.value) {
    className.push('is-showing')
  }

  return className
})

// Methods
</script>

<style lang="scss">
$prefix: 'bottom-bar';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      padding: rem(8px),
      font-size: 14px,
      line-height: 18px,
      background-color: get-var(color-green),
    )
  );

  display: flex;
  flex-wrap: wrap;
  padding: get-var(padding, $prefix: $prefix) 0;
  // position: relative;
  position: sticky;
  top: get-var(offset, 0, $prefix: $prefix);
  z-index: get-var(z-#{$prefix});
  @include transition(top);
  // top: 0;
  // transform: translateY(get-var(offset, 0, $prefix: $prefix));
  // @include transition(transform);

  @include is('showing') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        offset: get-var(header-height, 0, $prefix: 'layout'),
      )
    );
  }

  @include element('breadcrumb') {
    @include until(tablet) {
      display: none;
    }
  }

  @include element('search') {
    width: 100%;
    max-width: 100%;

    @include from(tablet) {
      margin-left: auto;
      max-width: get-var(search-width, rem(495px), $prefix: $prefix);
    }
  }

  @include element('container') {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(8px);
  }
}
</style>
