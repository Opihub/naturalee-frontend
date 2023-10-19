<template>
  <main class="s-contacts">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />
    <div class="o-row row-contacts">
      <SiteContainer>
        <SiteContainer class="o-row__container o-row__container--left" padless>
          <BaseHeading id="company-info" class="u-mb-small" tag="h3">{{
            $t('form.contactUs')
          }}</BaseHeading>

          <BaseParagraph class="u-mb-small">{{
            $t('form.moreInfo')
          }}</BaseParagraph>

          <BaseHeading class="u-mt-huge" tag="h6">{{
            page.meta.nome
          }}</BaseHeading>

          <BaseParagraph class="u-mb-small"
            >{{ page.meta.indirizzo }} <br />
            {{ page.meta.cap }} {{ page.meta.citta }} ({{
              page.meta.provincia
            }})<br />
            {{ page.meta.stato }}</BaseParagraph
          >

          <BaseParagraph class="u-mb-small">
            <BaseLink :to="`mailto:${page.meta.pec}`" color="green">{{
              page.meta.pec
            }}</BaseLink
            ><br />
            {{ $t('company.pIva', { piva: page.meta.piva }) }} <br />
            {{ $t('company.cf', { cf: page.meta.codice_fiscale }) }}<br />
            {{ $t('company.rea', { rea: page.meta.rea }) }}<br />
            {{ $t('company.capSoc', { capSoc: page.meta.capitale_sociale }) }}
          </BaseParagraph>
        </SiteContainer>

        <SiteContainer class="o-row__container o-row__container--right" padless>
          <BackgroundHolder tag="div" color="white" content-center>
            <ContactForm />
          </BackgroundHolder>
        </SiteContainer>
      </SiteContainer>
    </div>
  </main>
</template>

<script setup>
const { page } = await usePage('contatti')
</script>

<style lang="scss" scoped>
$prefix: 'contacts';
@include scope($prefix) {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );
  @include layout($prefix, 'container');
  @include object('row') {
    @include object('container') {
      @include object('background') {
        padding: 25px;
        @include from('tablet') {
          padding: 50px;
        }
        border-radius: 30px;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 10px;
      padding-bottom: 10px;
      @include from('tablet') {
        flex-direction: row;
        gap: 4em;
      }
    }
    @include element('container') {
      display: block;
      @include from('tablet') {
        @include set-local-vars(
          $prefix: 'container',
          $map: (
            margin: 50px 0,
          )
        );
        @include modifier('left') {
          width: 50%;
        }
        @include modifier('right') {
          width: 100%;
        }
      }
    }
  }
}
</style>
