<template>
  <BackgroundHolder :class="CSS_NAME" tag="section" :color="color">
    <SiteContainer flex>
      <div :class="`${CSS_NAME}__content`">
        <BaseHeading
          v-if="slots['sup-title']"
          :tag="supTitleTag"
          use="h6"
          class="u-mb-micro"
          ><slot name="sup-title"
        /></BaseHeading>
        <BaseHeading
          v-if="slots.title"
          :tag="titleTag"
          use="h2"
          class="u-mb-medium"
          ><slot name="title"
        /></BaseHeading>

        <BaseParagraph v-if="slots.default" color="white"
          ><slot
        /></BaseParagraph>

        <BaseButton
          v-if="button.text"
          :as="button.to ? 'link' : 'button'"
          :target="button.target || null"
          :color="button.color || 'yellow'"
          class="u-mt-large u-mt-huge@tablet"
          >{{ button.text }}</BaseButton
        >
      </div>

      <div :class="[`${CSS_NAME}__parallax`, 'u-mb-large', 'u-mb-none@tablet']">
        <NuxtImg :class="`${CSS_NAME}__parallax__image`" :src="image" />
      </div>
    </SiteContainer>
  </BackgroundHolder>
</template>

<script setup>
const CSS_NAME = 'c-content-row'

defineProps({
  color: {
    type: String,
    default: 'green',
  },
  supTitleTag: {
    type: String,
    default: 'h6',
  },
  titleTag: {
    type: String,
    default: 'h2',
  },
  image: {
    type: String,
    required: true,
  },
  button: {
    type: Object,
    default: null,
    validator(value) {
      return 'text' in value
    },
  },
})

const slots = useSlots()
</script>

<style lang="scss">
$prefix: 'content-row';
@include component($prefix) {
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      wrap: nowrap,
      direction: column,
    )
  );

  padding: rem(40px) 0;

  @include from(tablet) {
    padding: 0;

    @include set-local-vars(
      $prefix: 'container',
      $map: (
        direction: row,
      )
    );
  }

  @include element('content') {
    flex: 0 0 auto;
    order: 2;
    width: 100%;

    @include from(tablet) {
      order: 1;
      max-width: get-var(content-width, rem(520px), $prefix: $prefix);
    }

    @include from(tablet) {
      margin: get-var(margin, 0, $prefix: $prefix) 0;
    }
  }

  @include element('parallax') {
    flex: 1 1 100%;
    width: 100%;
    order: 1;
    align-self: stretch;

    @include from(tablet) {
      order: 2;
      margin-left: auto;
      max-width: get-var(parallax-width, rem(925px), $prefix: $prefix);
    }

    @include element('image') {
      @include from(tablet) {
        position: absolute;
      }
    }
  }
}
</style>
