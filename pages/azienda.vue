<template>
  <main class="s-azienda">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <SiteContainer flex class="u-mt-huge u-position-relative" :max-width="1370">
      <FloatingIcon
        :svg-size="{ width: 150, height: 140 }"
        :coordinates="{ bottom: -20, left: -90 }"
      >
        <template #default>
          <FragolaPera />
        </template>
      </FloatingIcon>
      <FloatingIcon
        :svg-size="{ width: 260, height: 360 }"
        :coordinates="{ bottom: -20, right: -170 }"
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
        poster="/azienda/poster-azienda.svg"
      />
    </SiteContainer>

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
        <BaseHeading>
          <i18n-t keypath="secondSection.title">
            <template #highlight>
              <HighlightText>{{
                t('secondSection.highlightText')
              }}</HighlightText>
            </template>
          </i18n-t>

          <CircularText :text="t('secondSection.circularText')" />
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
      class="c-fourth-section u-pt-huge u-pb-huge"
      image="/azienda/brb.png"
      flipped
      color="white"
    >
      <template #sup-title>{{ t('fourthSection.supTitle') }}</template>
      <template #title>{{ t('fourthSection.title') }}</template>

      <template #default>
        {{ t('fourthSection.paragraph') }}
      </template>
    </ContentRow>
  </main>
</template>

<script setup>
// Imports
import FormaggioRapanello from '@/assets/svg/decorations/formaggio-rapanello.svg'
import FragolaPera from '@/assets/svg/decorations/fragola-pera.svg'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'company',
})

// Component life-cycle hooks

// Data
const { t } = useI18n({
  useScope: 'local',
})
const { page } = await usePage('azienda')
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
      $prefix: 'paragraph',
      $map: (
        width: rem(520px),
      )
    );

    @include set-local-vars(
      $prefix: 'content-row',
      $map: (
        margin: rem(100px),
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
      top: rem(50px);
      right: calc(rem(100px) - 4vw);

      @include from(tablet) {
        top: rem(120px);
        right: rem(100px);
      }
    }
  }

  @include component('third-section') {
    text-align: center;
    position: relative;

    @include set-local-vars(
      $prefix: 'card',
      $map: (
        width: rem(350px),
      )
    );

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
          width: rem(385px),
          white-space: pre-line,
        )
      );

      @include set-local-vars(
        $prefix: 'card',
        $map: (
          width: rem(420px),
        )
      );
    }

    @include object('row') {
      align-items: baseline;
      justify-content: center;

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

<i18n lang="json" locale="it">
{
  "firstSection": {
    "supTitle": "Freschezza e qualità dalle nostre terre",
    "title": "Una storia che abbraccia passato e futuro",
    "paragraph": "Naturalee ha solide radici sia nel mercato ortofrutticolo milanese che nelle fertili terre del Lazio. Grazie alla sua rete di fornitori e alla sua efficienza operativa, è in grado di fornire prodotti freschi e di qualità direttamente alle vostre porte."
  },
  "secondSection": {
    "circularText": "La natura a casa tua",
    "title": "Coltiviamo passione, {highlight} gusto",
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
      "paragraph": "Naturale direttamente a casa vostra.\nPortiamo la tradizione nel futuro, rendendo più facile che mai l’acquisto online di prodotti di alta qualità."
    }
  },
  "fourthSection": {
    "supTitle": "Naturalee per l'Ho.re.ca.",
    "title": "una storia che abbraccia passato e futuro",
    "paragraph": "Naturalee garantisce qualità e professionalità per soddisfare ogni cliente. Mense, ristoranti, frutterie, alberghi e professionisti della ristorazione possono contare su un servizio puntuale, flessibile e basato sulla onestà.",
    "paragraph2": "Forniamo all'ingrosso frutta e verdura di origine e qualità certificate, offrendo sempre la migliore frutta al prezzo più conveniente. Per i palati più esigenti, offriamo una vasta gamma di prodotti regionali italiani e stranieri, oltre a prelibatezze esotiche."
  }
}
</i18n>
