<template>
  <main class="s-azienda">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <SiteContainer flex class="u-mt-huge" :max-width="1370">
      <BaseVideo :src="AziendaVideo" :aspect-ratio="ratio" />
    </SiteContainer>

    <ContentRow
      class="c-first-section"
      image="/azienda/azienda-storia.png"
      flipped
      parallax
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
        class="c-second-section u-pt-huge@tablet u-pb-huge@tablet u-pt-custom@tablet u-pb-custom@tablet"
        :max-width="830"
      >
        <BaseHeading>
          Amet consectetur
          <HighlightText>adipiscing</HighlightText> elit !
          <CircularText text="Lorem ipsum dolor sit amet" />
        </BaseHeading>

        <BaseParagraph class="u-mt-large">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse.
        </BaseParagraph>
      </SiteContainer>
    </BackgroundHolder>

    <SiteContainer class="c-third-section u-pt-huge u-pb-huge@tablet">
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
import AziendaVideo from 'assets/video/azienda.mp4'

// Constants
const { page } = await usePage('azienda')
const ratio = [16, 8.8]
const cards = ref([
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
])
// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Data
// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include scope('azienda') {
  @include component('first-section') {
    margin-top: 100px;
    @include object('container') {
      @include set-local-vars(
        $prefix: 'container',
        $map: (
          direction: row-reverse,
        )
      );
    }
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
    position: relative;

    @include from('tablet') {
      text-align: center;
    }

    padding-top: rem(60px);
    padding-bottom: rem(60px);

    @media screen and (max-width: 375px) {
      & h1 {
        @include set-local-vars(
          $prefix: 'heading',
          $map: (
            font-size: rem(30px),
          )
        );
      }
    }
    @include set-local-vars(
      $prefix: 'custom',
      $map: (
        pt: rem(140px),
        pb: rem(120px),
      )
    );
    @include object('circular-text') {
      font-weight: 400;
      top: rem(50px);
      right: calc(rem(100px) - 4vw);
      @include from('tablet') {
        top: rem(120px);
        right: rem(100px);
      }
    }
  }
  @include component('third-section') {
    @include object('row') {
      @include from('full') {
        flex-wrap: nowrap;
      }
      @include set-local-vars(
        $prefix: 'row',
        $map: (
          gap: rem(30px),
        )
      );
      @include from('tablet') {
        @include set-local-vars(
          $prefix: 'row',
          $map: (
            gap: rem(128px),
          )
        );
      }
      justify-content: center;
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
    @include object('container') {
      @include component('content-row') {
        background-color: red;
        @include element('parallax') {
          display: flex !important;
          align-items: center !important;
        }
      }
    }
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
}
</style>
