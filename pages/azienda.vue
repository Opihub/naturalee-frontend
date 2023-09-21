<template>
  <main>
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />
    <SiteContainer flex class="u-mt-huge" :max-width="1370">
      <BaseVideo src="assets/video/azienda.mp4" :aspect-ratio="ratio" />
    </SiteContainer>
    <ContentRow
      class="c-first-section"
      image="/azienda/azienda-storia.png"
      flipped
    >
      <template #sup-title>LOREM IPSUM DOLOR SIT</template>
      <template #title>Amet consectetur adipiscing elit</template>

      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore.
      </template>
    </ContentRow>
    <BackgroundHolder tag="section" color="white">
      <SiteContainer
        class="c-second-section u-pt-huge u-pb-huge u-pt-custom@desktop u-pb-custom@desktop"
        :max-width="790"
      >
        <BaseHeading>
          Amet consectetur
          <HighlightText>adipiscing</HighlightText> elit !
          <CircularText text="Lorem ipsum dolor sit amet" />
        </BaseHeading>
        <BaseParagraph class="u-mt-large">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
          optio tenetur pariatur sapiente, iste voluptate alias culpa eligendi?
          Magnam assumenda saepe voluptatum expedita facere ipsum voluptatibus.
          Non distinctio nemo fuga?
        </BaseParagraph>
      </SiteContainer>
    </BackgroundHolder>
    <SiteContainer class="c-third-section u-pt-huge u-pb-huge">
      <BaseHeading class="u-pb-huge" tag="h2">
        Amet consectetur adipisicing</BaseHeading
      >
      <div class="o-row">
        <BaseCard
          v-for="(card, index) in cards"
          :key="card.heading + index"
          :heading="card.heading"
          :paragraph="card.paragraph"
          :image="card.image"
        />
      </div>
    </SiteContainer>
    <ContentRow
      class="c-fourth-section u-pt-huge u-pb-huge"
      image="/azienda/brb.png"
      flipped
      color="white"
    >
      <template #sup-title>LOREM IPSUM DOLOR SIT</template>
      <template #title>Hai un ristorante, bar o un bed&breakfast?</template>

      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore.
      </template>
    </ContentRow>
  </main>
</template>

<script setup>
// Imports

// Constants
const { page } = await usePage('azienda')
const ratio = [16, 8.8]
const cards = [
  {
    image: '/azienda/delivery_1.png',
    heading: 'Amet consectetur',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusimod tempor incididunt ut dolore magna aliqua. Ut enim ad minim veniam',
  },
  {
    image: '/azienda/delivery_2.png',
    heading: 'Amet consectetur',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusimod tempor incididunt ut dolore magna aliqua. Ut enim ad minim veniam',
  },
  {
    image: '/azienda/delivery_3.png',
    heading: 'Amet consectetur',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusimod tempor incididunt ut dolore magna aliqua. Ut enim ad minim veniam',
  },
]
// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Data
// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include component('first-section') {
  margin-top: 100px;
  @include set-local-vars(
    $prefix: 'content-row',
    $map: (
      margin: rem(100px),
    )
  );
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      justify-content: start,
    )
  );
  @include set-local-vars(
    $prefix: 'parallax',
    $map: (
      margin-left: 0,
    )
  );
  @include set-local-vars(
    $prefix: 'content-row-parallax',
    $map: (
      offset: rem(-55px) 0 0,
    )
  );
}
@include component('second-section') {
  @include set-local-vars(
    $prefix: 'custom',
    $map: (
      pt: rem(140px),
      pb: rem(120px),
    )
  );
  text-align: center;
  position: relative;
  @include object('circular-text') {
    top: rem(120px);
    right: rem(100px);
    font-weight: 400;
  }
}
@include component('third-section') {
  @include object('row') {
    flex-wrap: nowrap;
  }
  text-align: center;
  position: relative;
  @include object('heading') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        'text-color': color-black,
      )
    );
  }
}
@include component('fourth-section') {
  margin-top: rem(100px);
  @include set-local-vars(
    $prefix: 'content-row',
    $map: (
      margin: rem(100px),
    )
  );
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      justify-content: space-around,
    )
  );
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      align-items: center,
    )
  );
  @include set-local-vars(
    $prefix: 'parallax',
    $map: (
      margin-left: 0,
    )
  );
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      'text-color': color-black,
    )
  );
  @include set-local-vars(
    $prefix: 'paragraph',
    $map: (
      'text-color': color-black,
    )
  );

  @include set-local-vars(
    $prefix: 'content-row-content',
    $map: (
      width: rem(537px),
    )
  );

  @include set-local-vars(
    $prefix: 'content-row-parallax',
    $map: (
      width: rem(790px),
    )
  );

  @include set-local-vars(
    $prefix: 'image',
    $map: (
      border-radius: rem(50px),
    )
  );
}
</style>
