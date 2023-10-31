<template>
  <main class="s-homepage">
    <BackgroundHolder
      class="c-first-section"
      tag="section"
      color="green"
      content-center
    >
      <template #back>
        <BaseVideo :src="HomeVideo" background />
      </template>

      <template #default="{ className }">
        <SiteContainer :max-width="912" :class="className">
          <SearchForm :placeholder="t('hero.searchPlaceholder')">
            <template #before>
              <BaseHeading class="u-mb-half" tag="h4" :text="t('hero.title')" />
            </template>
            <template #after>
              <i18n-t keypath="hero.paragraph" tag="p" class="u-mt-tiny">
                <template #featured>
                  <BaseLink
                    :to="{ name: 'featured' }"
                    underline
                    :text="t('hero.featured')"
                  />
                </template>
              </i18n-t>
            </template>
          </SearchForm>
        </SiteContainer>
      </template>
    </BackgroundHolder>

    <BackgroundHolder
      class="c-second-section u-pt-small u-pb-small"
      tag="section"
      color="yellow"
    >
      <SiteContainer>
        <p class="u-mb-tiny u-mb-none@tablet">
          {{ t('deliverySection.title') }}
        </p>
        <BaseButton color="white" @click="togglePostcodeModal">{{
          t('deliverySection.cta')
        }}</BaseButton>
      </SiteContainer>
    </BackgroundHolder>

    <ContentRow
      class="c-third-section"
      :button="{ text: t('firstSection.cta'), to: { name: 'company' } }"
      image="/home/chi-siamo.png"
      parallax
    >
      <template #sup-title>{{ t('firstSection.supTitle') }}</template>
      <template #title>{{ t('firstSection.title') }}</template>

      <template #text>
        {{ t('firstSection.paragraph') }}
      </template>
    </ContentRow>

    <BackgroundHolder
      id="frutta-verdura"
      class="c-fourth-section u-pt-small u-pb-huge u-pt-custom@desktop u-pb-custom@desktop"
      tag="section"
    >
      <ProductCards
        :products="products.data"
        :title="$t('products.homepageFeatured')"
      />
    </BackgroundHolder>

    <TrackRow class="c-fifth-section">
      <template #title>{{ t('fifthSection.title') }}</template>

      <template #firstPoint>
        <i18n-t keypath="fifthSection.firstPoint.text">
          <template #top>
            <b>{{ t('fifthSection.firstPoint.top') }}</b>
          </template>
        </i18n-t>
      </template>

      <template #secondPoint>
        <i18n-t keypath="fifthSection.secondPoint.text">
          <template #top>
            <b>{{ t('fifthSection.secondPoint.top') }}</b>
          </template>
        </i18n-t>
      </template>

      <template #thirdPoint>
        <i18n-t keypath="fifthSection.thirdPoint.text">
          <template #top>
            <b>{{ t('fifthSection.thirdPoint.top') }}</b>
          </template>
        </i18n-t>
      </template>

      <template #fourthPoint>
        <b>{{ t('fifthSection.fourthPoint.top') }}</b>
        <b>{{ t('fifthSection.fourthPoint.bottom') }}</b>
      </template>
    </TrackRow>
  </main>
</template>

<script setup>
// Imports
import HomeVideo from 'assets/video/homepage.mp4'

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'home',
})

// Component life-cycle hooks

// Data (Reactive, Composables & Inject)
await usePage()
const products = await useApi('shop/homepage/products')
const { togglePostcodeModal } = inject('postcodeModal', () => {})
const { t } = useI18n({
  useScope: 'local',
})

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include scope('homepage') {
  @include component('first-section') {
    @include set-local-vars(
      $prefix: 'background',
      $map: (
        width: 100%,
        height: rem(554px),
      )
    );

    @include set-local-vars(
      $prefix: 'background',
      $map: (
        overflow: hidden,
      )
    );

    text-align: center;
    color: get-var(color-white);

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    &::before {
      background-color: rgba(get-var(rgb-black), 0.36);
    }

    &::after {
      background-color: rgba(get-var(rgb-green), 0.2);
    }

    p {
      @include typography(16px, 20px);
    }

    @include object('heading') {
      @include typography(24px, 30px);
    }
    @include object('video') {
      width: 100%;
    }
  }

  @include component('second-section') {
    text-align: center;

    @include object('container') {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      @include from(tablet) {
        flex-direction: row;
      }
    }

    p {
      @include typography(18px, 23px);
      font-weight: get-var(weight-bold);

      @include from(tablet) {
        @include typography(20px, 25px);
      }
    }

    @include object('button') {
      font-weight: get-var(weight-extrabold);
      @include typography(15px, 19px);
    }
  }

  @include component('third-section') {
    @include set-local-vars(
      $prefix: 'content-row',
      $map: (
        margin: rem(120px),
      )
    );

    @include set-local-vars(
      $prefix: 'content-row-parallax',
      $map: (
        offset: rem(60px) 0 0,
      )
    );
  }

  @include component('fourth-section') {
    @include set-local-vars(
      $prefix: 'custom',
      $map: (
        pt: rem(110px),
        pb: rem(60px),
      )
    );
  }

  @include component('fifth-section') {
    @include set-local-vars(
      $prefix: 'custom',
      $map: (
        pt: rem(80px),
        pb: rem(80px),
      )
    );
  }
}
</style>

<i18n lang="json" locale="it">
{
  "hero": {
    "title": "Esplora una spesa Fresca e Naturalee. Ordina subito!",
    "paragraph": "Non sai da dove iniziare? {featured}",
    "featured": "Ti consigliamo noi!",
    "searchPlaceholder": "Inizia la tua spesa"
  },
  "deliverySection": {
    "title": "Il servizio è attivo su Milano città e hinterland",
    "cta": "Verifica se il tuo indirizzo è coperto dal servizio"
  },
  "firstSection": {
    "supTitle": "Freschezza e qualità dalle nostre terre",
    "title": "Una storia che abbraccia passato e futuro",
    "paragraph": "Naturalee ha solide radici sia nel mercato ortofrutticolo milanese che nelle fertili terre del Lazio. Grazie alla sua rete di fornitori e alla sua efficienza operativa, è in grado di fornire prodotti freschi e di qualità direttamente alle vostre porte.",
    "cta": "Chi siamo"
  },
  "fifthSection": {
    "title": "Dalla terra a casa tua!",
    "firstPoint": {
      "top": "Scegli",
      "text": "{top} i tuoi prodotti"
    },
    "secondPoint": {
      "top": "Conferma",
      "text": "{top} il tuo ordine"
    },
    "thirdPoint": {
      "top": "Ricevi",
      "text": "{top} la tua spesa"
    },
    "fourthPoint": {
      "top": "Riordina",
      "bottom": "quando vuoi!"
    }
  }
}
</i18n>
