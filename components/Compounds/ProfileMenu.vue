<template>
  <PopupContainer max-width="317px">
    <InlineMenu
      :class="CSS_NAME"
      :item-class="`${CSS_NAME}__item`"
      :menu="menu"
      :arrow="true"
      color="dark"
      hover-color="green"
      direction="vertical"
    >
      <template #before="{ itemClassName }">
        <li
          :class="[
            itemClassName,
            `${CSS_NAME}__item`,
            `${CSS_NAME}__item--user`,
            'has-no-link',
          ]"
        >
          <span
            >Ciao <strong>{{ username }}</strong></span
          >
          <u>Esci</u>
        </li>
      </template>
    </InlineMenu>
  </PopupContainer>
</template>

<script setup>
const CSS_NAME = 'c-profile-menu'

defineProps({
  username: {
    type: String,
    required: true,
  },
  menu: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss">
$prefix: 'profile-menu';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'menu',
    $map: (
      gap: 0,
      font-size: rem(16px),
      line-height: rem(20px),
    )
  );

  @include set-local-vars(
    $prefix: 'menu-item',
    $map: (
      padding: rem(14px) rem(21px),
    )
  );

  @include set-local-vars(
    $prefix: 'link-label',
    $map: (
      width: 100%,
      disposition: space-between,
    )
  );

  @include element('item') {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: 1px solid rgba(get-var(rgb-green), 0.45);

    &:last-child {
      border-bottom: 0;
    }

    @include modifier('user') {
      @include typography(14px, 18px);
      border-bottom: 0;
      font-weight: get-var(weight-regular);
      background-color: get-var(color-green);
      color: get-var(color-white);

      u {
        cursor: pointer;
        color: get-var(color-yellow);
      }
    }
  }
}
</style>
