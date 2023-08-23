<template>
  <main class="s-homepage">
    <BackgroundHolder
      class="c-first-section"
      tag="section"
      content-center
      :image="image"
    >
      <SiteContainer :max-width="912">
        <SearchForm v-model="search" placeholder="Inizia la tua spesa">
          <template #before>
            <BaseHeading class="u-mb-half" tag="h4"
              >Esplora una spesa Fresca e Naturalee. Ordina subito!</BaseHeading
            >
          </template>
          <template #after>
            <p class="u-mt-tiny">
              Non sai da dove iniziare?
              <BaseLink to="featured" underline>Ti consigliamo noi!</BaseLink>
            </p>
          </template>
        </SearchForm>
      </SiteContainer>
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
        <BaseButton color="white"
          >Verifica se il tuo indirizzo è coperto dal servizio</BaseButton
        >
      </SiteContainer>
    </BackgroundHolder>
  </main>
</template>

<script setup>
/**
 * TODO:
 *  - spostare background via API
 *  - usare video
 */
const image = ref('https://picsum.photos/1920/700?blur=3')
const search = ref('')
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

    text-align: center;
    color: get-var(color-white);

    p {
      @include typography(16px, 20px);
    }

    @include object('heading') {
      @include typography(24px, 30px);
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
      text-transform: uppercase;
      @include typography(15px, 19px);
    }
  }
}
</style>
