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
          <SearchForm placeholder="Inizia la tua spesa">
            <template #before>
              <BaseHeading class="u-mb-half" tag="h4"
                >Esplora una spesa Fresca e Naturalee. Ordina
                subito!</BaseHeading
              >
            </template>
            <template #after>
              <p class="u-mt-tiny">
                Non sai da dove iniziare?
                <BaseLink to="/featured" underline
                  >Ti consigliamo noi!</BaseLink
                >
              </p>
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
          Il servizio è attivo su Milano città e hinterland
        </p>
        <BaseButton color="white" @click="togglePostcodeModal"
          >Verifica se il tuo indirizzo è coperto dal servizio</BaseButton
        >
      </SiteContainer>
    </BackgroundHolder>

    <ContentRow
      class="c-third-section"
      :button="{ text: 'Chi siamo', to: 'chi-siamo' }"
      image="/home/chi-siamo.png"
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

    <BackgroundHolder
      id="frutta-verdura"
      class="c-fourth-section u-pt-small u-pb-huge u-pt-custom@desktop u-pb-custom@desktop"
      tag="section"
    >
      <ProductCards :products="products.data" title="Frutta e Verdura Fresca" />
    </BackgroundHolder>

    <TrackRow class="c-fifth-section">
      <template #title>Amet consectetur adipiscing elit</template>

      <template #firstPoint><strong>Scegli</strong> i tuoi prodotti</template>

      <template #secondPoint><strong>Conferma</strong> il tuo ordine</template>

      <template #thirdPoint><strong>Ricevi</strong> la tua spesa</template>

      <template #fourthPoint
        ><strong>Riordina<br />quando vuoi!</strong></template
      >
    </TrackRow>
  </main>
</template>

<script setup>
// Imports
import HomeVideo from 'assets/video/homepage.mp4'

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Data (Reactive, Composables & Inject)
await usePage()
const products = await useApi('shop/homepage/products')
const { togglePostcodeModal } = inject('postcodeModal')

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
