<template>
  <section class="s-azienda">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />
    <div class="s-overflow">
      <SiteContainer
        flex
        class="u-mt-huge u-position-relative c-video-section"
        :max-width="1370"
      >
        <FloatingIcon
          :svg-size="svgs.fragolaPera.size"
          :coordinates="svgs.fragolaPera.coordinates"
        >
          <template #default>
            <FragolaPera />
          </template>
        </FloatingIcon>
        <FloatingIcon
          :svg-size="svgs.formaggioRapanello.size"
          :coordinates="svgs.formaggioRapanello.coordinates"
        >
          <template #default>
            <FormaggioRapanello />
          </template>
        </FloatingIcon>
        <BaseVideo
          id="player"
          src="shZXLvznzWk"
          provider="youtube"
          :aspect-ratio="ratio"
          poster="/azienda/poster-azienda.png"
        />
      </SiteContainer>
    </div>

    <ContentRow
      class="c-first-section"
      image="/azienda/azienda-storia.png"
      flipped
      parallax
    >
      <template #sup-title>{{ t('firstSection.supTitle') }}</template>
      <template #title>{{ t('firstSection.title') }}</template>

      <template #text>
        {{ t('firstSection.paragraph') }}
      </template>
    </ContentRow>

    <BackgroundHolder tag="section" color="white">
      <SiteContainer
        class="c-second-section u-pt-huge@tablet u-pb-huge@tablet u-pt-custom@tablet u-pb-custom@tablet"
        :max-width="830"
      >
        <BaseHeading class="u-position-relative">
          <CircularText :text="t('secondSection.circularText')" />
          <i18n-t keypath="secondSection.title">
            <template #highlight>
              <HighlightText>{{
                t('secondSection.highlightText')
              }}</HighlightText>
            </template>
          </i18n-t>
        </BaseHeading>

        <BaseParagraph class="u-mt-large">
          {{ t('secondSection.paragraph') }}
        </BaseParagraph>
      </SiteContainer>
    </BackgroundHolder>

    <SiteContainer
      class="c-third-section u-pt-large u-pb-large u-pt-custom@tablet u-pb-custom@tablet"
    >
      <BaseHeading
        class="u-mb-large"
        tag="h2"
        :text="t('thirdSection.title')"
      />

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
      class="c-fourth-section u-pt-large u-pb-large u-pt-custom@tablet u-pb-custom@tablet"
      image="/azienda/brb.png"
      flipped
      color="white"
    >
      <template #sup-title>{{ t('fourthSection.supTitle') }}</template>
      <template #title>{{ t('fourthSection.title') }}</template>

      <template #default>
        <BaseParagraph class="u-mb-large">
          {{ t('fourthSection.paragraph') }}
        </BaseParagraph>
        <BaseParagraph>
          {{ t('fourthSection.paragraph2') }}
        </BaseParagraph>
      </template>
    </ContentRow>
  </section>
</template>

<script setup>
// Imports
import FormaggioRapanello from '@/assets/svg/decorations/formaggio-rapanello.svg'
import FragolaPera from '@/assets/svg/decorations/fragola-pera.svg'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/azienda',
  name: 'company',
})

defineI18nRoute({
  paths: {
    it: '/azienda',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data
const { t } = useI18n({
  useScope: 'local',
})
const { page } = await usePage()
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

const ratio = [16, 9]
const cards = ref([
  {
    image: '/azienda/delivery_1.png',
    heading: t('thirdSection.firstBox.title'),
    paragraph: t('thirdSection.firstBox.paragraph'),
  },
  {
    image: '/azienda/delivery_2.png',
    heading: t('thirdSection.secondBox.title'),
    paragraph: t('thirdSection.secondBox.paragraph'),
  },
  {
    image: '/azienda/delivery_3.png',
    heading: t('thirdSection.thirdBox.title'),
    paragraph: t('thirdSection.thirdBox.paragraph'),
  },
])

const svgs = ref({
  fragolaPera: {
    size: {
      default: { width: 81, height: 73 },
      desktop: { width: 110, height: 100 },
      full: { width: 150, height: 140 },
    },
    coordinates: {
      default: { bottom: -10, left: 0 },
      desktop: { bottom: -20, left: 0 },
      full: { bottom: -20, left: -90 },
    },
  },
  formaggioRapanello: {
    size: {
      default: { width: 120, height: 170 },
      desktop: { width: 200, height: 300 },
      full: { width: 260, height: 360 },
    },
    coordinates: {
      default: { bottom: -20, right: -30 },
      desktop: { bottom: -20, right: -105 },
      full: { bottom: -20, right: -195 },
    },
  },
})

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include scope('azienda') {
  @include scope('overflow') {
    width: 100%;
    padding-bottom: 30px;
    overflow: hidden;
  }
  @include component('video-section') {
    @include between(tablet, full) {
      @include set-local-vars(
        $prefix: 'container',
        $map: (
          padding: rem(60px),
        )
      );
    }
  }

  @include component('first-section') {
    margin-top: 70px;
    @include object('container') {
      @include set-local-vars(
        $prefix: 'container',
        $map: (
          direction: row-reverse,
        )
      );
    }

    @include until(tablet) {
      @include set-local-vars(
        $prefix: 'paragraph',
        $map: (
          width: 100%,
        )
      );
      // @include set-local-vars(
      //   $prefix: 'content-row',
      //   $map: (
      //     margin: rem(230px),
      //   )
      // );
    }

    @include set-local-vars(
      $prefix: 'paragraph',
      $map: (
        width: rem(520px),
      )
    );
    @include from(tablet) {
      @include set-local-vars(
        $prefix: 'content-row',
        $map: (
          margin: rem(100px),
          content-width: rem(610px),
          parallax-offset: rem(-55px) 0 0,
        )
      );
    }
    @include set-local-vars(
      $prefix: 'content-row',
      $map: (
        content-width: rem(610px),
        parallax-offset: rem(-55px) 0 0,
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
  }

  @include component('second-section') {
    position: relative;

    @include from('tablet') {
      text-align: center;
    }

    padding-top: rem(60px);
    padding-bottom: rem(60px);

    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        white-space: pre-line,
        display: inline,
      )
    );
    @include customMedia(440px, true) {
      @include set-local-vars(
        $prefix: 'circular-text',
        $map: (
          position: static,
          letter-position: static,
          font-size: rem(20px),
        )
      );
    }
    @include customMedia(400px, true) {
      @include set-local-vars(
        $prefix: 'heading',
        $map: (
          display: block,
        )
      );
    }
    @include set-local-vars(
      $prefix: 'paragraph',
      $map: (
        white-space: pre-line,
      )
    );

    @include set-local-vars(
      $prefix: 'custom',
      $map: (
        pt: rem(140px),
        pb: rem(120px),
      )
    );

    @include object('circular-text') {
      font-weight: get-var(weight-regular);
      // top: rem(50px);
      // right: calc(rem(100px) - 4vw);

      // @include media(400px, reverse) {
      //   top: rem(0px);
      //   right: rem(60px);
      // }

      top: rem(0px);
      right: rem(0px);
      // @include until(tablet) {
      // }

      @include until(tablet) {
        top: rem(10px);
        right: rem(30px);
      }
      // @include from(tablet) {
      //   top: rem(120px);
      //   right: rem(80px);
      // }

      // @include from(desktop) {
      //   right: rem(0px);
      // }
    }

    @include until(tablet) {
      @include set-local-vars(
        $prefix: 'highlight-text',
        $map: (
          translate: #{-50%,
          30%},
          rotate: 50deg,
        )
      );
    }

    @include from(tablet) {
      @include set-local-vars(
        $prefix: 'highlight-text',
        $map: (
          translate: #{-50%,
          30%},
          rotate: 50deg,
        )
      );
    }

    @include from(desktop) {
      @include set-local-vars(
        $prefix: 'highlight-text',
        $map: (
          translate: #{-50%,
          5%},
          rotate: 65deg,
        )
      );
    }
  }

  @include component('third-section') {
    text-align: center;
    position: relative;

    @include from(tablet) {
      @include set-local-vars(
        $prefix: 'custom',
        $map: (
          pt: rem(70px),
          pb: rem(70px),
        )
      );

      @include set-local-vars(
        $prefix: 'paragraph',
        $map: (
          width: 100%,
          white-space: pre-line,
        )
      );
    }

    @include from(desktop) {
      @include set-local-vars(
        $prefix: 'card',
        $map: (
          width: rem(280px),
        )
      );
    }

    @include from(large) {
      @include set-local-vars(
        $prefix: 'card',
        $map: (
          width: rem(300px),
        )
      );

      @include set-local-vars(
        $prefix: 'paragraph',
        $map: (
          width: rem(385px),
          white-space: pre-line,
        )
      );
    }

    @include from(full) {
      @include set-local-vars(
        $prefix: 'card',
        $map: (
          width: rem(350px),
        )
      );
    }

    @include object('row') {
      align-items: baseline;
      justify-content: center;

      @include from('tablet') {
        flex-wrap: nowrap;
      }

      @include set-local-vars(
        $prefix: 'row',
        $map: (
          gap: rem(30px),
        )
      );

      @include from('desktop') {
        @include set-local-vars(
          $prefix: 'row',
          $map: (
            gap: rem(128px),
          )
        );
      }

      @include object('card') {
        flex-shrink: 1;
      }
    }

    @include object('heading') {
      @include set-local-vars(
        $prefix: 'heading',
        $map: (
          text-color: get-var(color-black),
        )
      );
    }
  }

  @include component('fourth-section') {
    @include set-local-vars(
      $prefix: 'custom',
      $map: (
        pt: rem(60px),
        pb: rem(80px),
      )
    );

    @include set-local-vars(
      $prefix: 'container',
      $map: (
        justify-content: space-around,
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
        text-transform: none,
        text-color: get-var(color-black),
      )
    );

    @include set-local-vars(
      $prefix: 'paragraph',
      $map: (
        text-color: get-var(color-black),
      )
    );

    @include set-local-vars(
      $prefix: 'content-row',
      $map: (
        content-width: rem(537px),
        parallax-width: rem(790px),
        image-radius: rem(50px),
      )
    );

    @include between(tablet, desktop) {
      @include set-local-vars(
        $prefix: 'content-row',
        $map: (
          margin: rem(30px),
          content-width: rem(600px),
        )
      );
      @include set-local-vars(
        $prefix: 'container',
        $map: (
          direction: column-reverse,
        )
      );
    }

    @include between(desktop, large) {
      @include set-local-vars(
        $prefix: 'container',
        $map: (
          gap: rem(40px),
        )
      );

      @include set-local-vars(
        $prefix: 'content-row',
        $map: (
          content-width: rem(400px),
          parallax-width: rem(790px),
        )
      );
    }
  }
}
</style>

<i18n lang="json" locale="it">
{
  "firstSection": {
    "supTitle": "Freschezza e qualità dalle nostre terre",
    "title": "Una storia che abbraccia passato e futuro",
    "paragraph": "Naturalee ha solide radici sia nel mercato ortofrutticolo milanese che nelle fertili terre del Lazio. Grazie alla sua rete di fornitori e alla sua efficienza operativa, è in grado di fornire prodotti freschi e di qualità direttamente alle vostre porte."
  },
  "secondSection": {
    "circularText": "La natura a casa tua",
    "title": "Coltiviamo passione,\n {highlight} gusto",
    "highlightText": "Raccogliamo",
    "paragraph": "La nostra missione è un connubio di tradizione e innovazione. Ci impegniamo a consegnare a voi e alla vostra attività la migliore selezione di frutta, verdura, latticini, vini, spezie e molto altro.\nLa freschezza di ieri incontra la comodità di oggi guardando avanti con entusiasmo.\nVolete frutta e verdura di alta qualità a portata di clic? Saremo il vostro punto di riferimento."
  },
  "thirdSection": {
    "title": "Cuore e Impegno in ogni fase",
    "firstBox": {
      "title": "+20 Ettari",
      "paragraph": "Le fertili terre del Lazio, con il loro ricco patrimonio naturale, sono la fonte della straordinaria qualità dei nostri prodotti. Un terreno ideale per la produzione di Naturalee."
    },
    "secondBox": {
      "title": "25 Anni di esperienza",
      "paragraph": "La nostra famiglia porta avanti una tradizione di generazioni nella vendita di frutta e verdura al mercato ortofrutticolo di Milano."
    },
    "thirdBox": {
      "title": "Consegna in 24h",
      "paragraph": "Naturalee direttamente a casa vostra.\nPortiamo la tradizione nel futuro, rendendo più facile che mai l’acquisto online di prodotti di alta qualità."
    }
  },
  "fourthSection": {
    "supTitle": "Naturalee per l’Ho.re.ca.",
    "title": "Hai un ristorante, bar o un bed&breakfast? ",
    "paragraph": "Naturalee garantisce qualità e professionalità per soddisfare ogni cliente. Mense, ristoranti, frutterie, alberghi e professionisti della ristorazione possono contare su un servizio puntuale, flessibile e basato sulla onestà. ",
    "paragraph2": "Forniamo all’ingrosso frutta e verdura di origine e qualità certificate, offrendo sempre la migliore frutta al prezzo più conveniente. Per i palati più esigenti, offriamo una vasta gamma di prodotti regionali italiani e stranieri, oltre a prelibatezze esotiche."
  }
}
</i18n>
