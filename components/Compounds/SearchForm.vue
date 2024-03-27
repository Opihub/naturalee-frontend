<template>
  <slot name="before" />

  <form
    :class="className"
    method="GET"
    v-bind="$attrs"
    @submit.prevent="goToSearch"
  >
    <InputField
      v-model="searchValue"
      :class="`${CSS_NAME}__input`"
      name="search"
      type="search"
      required
      :minlength="minlength"
      :placeholder="placeholder"
      :rounded="true"
      :borderless="true"
    />

    <BaseButton
      :class="`${CSS_NAME}__submit`"
      type="submit"
      color="yellow"
      svg="search"
      :svg-size="svgSize"
    >
      <span :class="`${CSS_NAME}__submit__text`">{{ $t('search') }}</span>
    </BaseButton>
  </form>

  <slot name="after" />
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-search'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  placeholder: {
    type: String,
    default: null,
  },
  search: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'default',
    validator(value) {
      return ['default', 'mini'].includes(value)
    },
  },
  minlength: {
    type: Number,
    default: 3,
  },
})

const emit = defineEmits(['update:search'])

// Component life-cycle hooks

// Data
const innerSearch = ref('')
const searchValue = computed({
  get() {
    return props.search || innerSearch.value
  },
  set(value) {
    innerSearch.value = value
    emit('update:search', value)
  },
})

// Watcher

// Computed
const svgSize = computed(() => {
  if (props.size === 'mini') {
    return [15, 15]
  }

  return [22, 22]
})

const className = computed(() => {
  const className = [CSS_NAME]

  if (props.size !== 'default') {
    className.push(`${CSS_NAME}--${props.size}`)
  }

  return className
})

// Methods
const goToSearch = async () => {
  if (!searchValue.value) {
    return
  }

  await navigateTo({
    name: 'search',
    query: { search: searchValue.value },
  })
}
</script>

<style lang="scss">
$prefix: 'search';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'button',
    $map: (
      padding: rem(21px) rem(30px),
      font-weight: get-var(weight-extrabold),
      font-size: rem(15px),
      line-height: rem(19px),
      svg-gap: rem(12px),
    )
  );

  @include set-local-vars(
    $prefix: 'input',
    $map: (
      width: 100%,
      padding: rem(21px) rem(35px),
      font-size: get-var(font-size, rem(18px), $prefix: $prefix),
      line-height: get-var(line-height, rem(22px), $prefix: $prefix),
    )
  );

  display: flex;
  background-color: get-var(color-white);
  border-radius: get-var(border-circle);
  font-size: get-var(font-size, rem(18px), $prefix: $prefix);
  line-height: get-var(line-height, rem(22px), $prefix: $prefix);
  display: flex;
  align-items: stretch;

  @include element('input') {
    flex: 0 1 100%;
  }

  @include element('submit') {
    flex: 0 0 auto;

    @include element('text') {
      display: get-var(display-label, inline, $prefix: $prefix);
    }
  }

  @include modifier('mini') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        font-size: rem(14px),
        line-height: rem(18px),
      )
    );

    @include set-local-vars(
      $prefix: 'button',
      $map: (
        font-size: get-var(font-size, $prefix: $prefix),
        line-height: get-var(line-height, $prefix: $prefix),
        padding: rem(7px) rem(9px),
      )
    );

    @include set-local-vars(
      $prefix: 'input',
      $map: (
        font-size: get-var(font-size, $prefix: $prefix),
        line-height: get-var(line-height, $prefix: $prefix),
        padding: rem(7px) rem(20px),
      )
    );

    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        display-label: none,
      )
    );

    @include from(tablet) {
      @include set-local-vars(
        $prefix: 'button',
        $map: (
          padding: rem(7px) rem(20px),
        )
      );

      @include set-local-vars(
        $prefix: $prefix,
        $map: (
          display-label: inline,
        )
      );
    }
  }
}
</style>
