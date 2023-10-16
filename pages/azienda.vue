<template>
  <main class="s-azienda">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <SiteContainer flex class="u-mt-huge" :max-width="1370">
      <BaseVideo
        id="player"
        src="shZXLvznzWk"
        provider="youtube"
        :aspect-ratio="ratio"
      />
    </SiteContainer>

    <ContentRow
      class="c-first-section"
      image="/azienda/azienda-storia.png"
      flipped
      parallax
    >
      <template #sup-title>{{
        $t('pages.company.firstSection.supTitle')
      }}</template>
      <template #title>{{ $t('pages.company.firstSection.title') }}</template>

      <template #default>
        {{ $t('pages.company.firstSection.paragraph') }}
      </template>
    </ContentRow>

    <BackgroundHolder tag="section" color="white">
      <SiteContainer
        class="c-second-section u-pt-huge@tablet u-pb-huge@tablet u-pt-custom@tablet u-pb-custom@tablet"
        :max-width="830"
      >
        <BaseHeading>
          Coltiviamo passione,
          <HighlightText>{{
            $t('pages.company.secondSection.highlightText')
          }}</HighlightText>
          gusto
          <CircularText
            :text="$t('pages.company.secondSection.circularText')"
          />
        </BaseHeading>

        <BaseParagraph class="u-mt-large">
          {{ $t('pages.company.secondSection.paragraph') }}
        </BaseParagraph>
      </SiteContainer>
    </BackgroundHolder>

    <SiteContainer class="c-third-section u-pt-huge u-pb-huge@tablet">
      <BaseHeading class="u-pb-huge" tag="h2">
        {{ $t('pages.company.thirdSection.title') }}</BaseHeading
      >
      <div class="o-row">
        <BaseCard
          v-for="(card, index) in cards"
          :key="index"
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
      <template #sup-title>{{
        $t('pages.company.fourthSection.supTitle')
      }}</template>
      <template #title>{{ $t('pages.company.fourthSection.title') }}</template>

      <template #default>
        {{ $t('pages.company.fourthSection.paragraph') }}
      </template>
    </ContentRow>
  </main>
</template>

<script setup>
// Imports
//import AziendaVideo from 'assets/video/azienda.mp4'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Constants
const { page } = await usePage('azienda')
const ratio = [16, 8.8]
const cards = ref([
  // {
  //   image: '/azienda/delivery_1.png',
  //   heading: '+20 Ettari',
  //   paragraph:
  //     'Le fertili terre del Lazio, con il loro ricco patrimonio naturale, sono la fonte della straordinaria qualità dei nostri prodotti. Un terreno ideale per la produzione di Naturalee.',
  // },
  {
    image: '/azienda/delivery_1.png',
    heading: t('pages.company.thirdSection.firstBox.title'),
    paragraph: t('pages.company.thirdSection.firstBox.paragraph'),
  },
  {
    image: '/azienda/delivery_2.png',
    heading: t('pages.company.thirdSection.secondBox.title'),
    paragraph: t('pages.company.thirdSection.secondBox.paragraph'),
  },
  {
    image: '/azienda/delivery_3.png',
    heading: t('pages.company.thirdSection.thirdBox.title'),
    paragraph: t('pages.company.thirdSection.thirdBox.paragraph'),
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
      align-items: baseline;
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
