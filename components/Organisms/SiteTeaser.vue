<template>
  <BackgroundHolder :class="`${CSS_NAME}`" tag="section" content-center>
    <SiteContainer flex class="u-text-center">
      <BreadCrumb
        v-if="breadcrumb && breadcrumb.length"
        :class="`${CSS_NAME}__breadcrumb`"
        :menu="breadcrumb"
      />

      <BaseHeading tag="h1" :text="title" />
    </SiteContainer>
  </BackgroundHolder>
</template>

<script setup>
const CSS_NAME = 'o-teaser'

defineProps({
  title: {
    type: String,
    required: true,
  },
  breadcrumb: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss">
$prefix: 'teaser';
@include object($prefix) {
  min-height: rem(240px);
  padding: rem(20px) 0;

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-white),
    )
  );

  @include object('container') {
    @include set-local-vars(
      $prefix: 'container',
      $map: (
        direction: column,
        justify-content: center,
      )
    );
  }

  @include from(tablet) {
    min-height: rem(300px);
  }
}
</style>
