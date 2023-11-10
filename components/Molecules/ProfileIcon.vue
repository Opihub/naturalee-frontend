<template>
  <BaseLink
    :to="{ name: 'login' }"
    :class="CSS_NAME"
    :label-class-name="`${CSS_NAME}__label`"
  >
    <template #svg="{ className }">
      <BaseIcon name="profile" :class="className" filled />
    </template>
    <template v-if="isLoggedIn" #default>
      <Suspense>
        <BaseIcon :class="`${CSS_NAME}__caret`" name="caret" :filled="false" />
      </Suspense>
    </template>
  </BaseLink>
</template>

<script setup>
const CSS_NAME = 'c-profile-icon'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
$prefix: 'profile-icon';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'link-svg',
    $map: (
      width: rem(32px),
      height: rem(32px),
    )
  );

  @include set-local-vars(
    $prefix: 'link',
    $map: (
      gap: rem(5px),
    )
  );

  color: get-var(color-yellow);
  user-select: none;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @include until(tablet) {
    @include element('label') {
      display: none;
    }
  }

  @include element('caret') {
    svg {
      height: 4.48px;
      width: 7.835px;
      margin-bottom: 0;

      transform: rotate(0deg);
      @include transition(transform);
    }
  }

  @include is('active') {
    &,
    &:hover {
      color: get-var(color-yellow);

      @include element('caret') {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
