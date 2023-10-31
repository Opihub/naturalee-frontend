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
            {{ $t('company.pIva', { piva: page.meta.piva }) }} <br />
            {{ $t('company.cf', { cf: page.meta.codice_fiscale }) }}<br />
            {{ $t('company.rea', { rea: page.meta.rea }) }}<br />
            {{ $t('company.capSoc', { capSoc: page.meta.capitale_sociale })
            }}<br />
            <BaseLink :to="`mailto:${page.meta.pec}`" color="green">{{
              page.meta.pec
            }}</BaseLink>
          </BaseParagraph>
        </SiteContainer>

        <SiteContainer
          class="o-row__container o-row__container--right u-position-relative u-pb-none"
          padless
        >
          <FloatingIcon
            :svg-size="{ width: 285, height: 250 }"
            :coordinates="{ bottom: -70, left: -220 }"
          >
            <template #default>
              <Papaya />
            </template>
          </FloatingIcon>
          <FloatingIcon
            :svg-size="{ width: 150, height: 140 }"
            :coordinates="{ top: -30, right: -70 }"
            z-index="-1"
          >
            <template #default>
              <yellowDots />
            </template>
          </FloatingIcon>
          <BackgroundHolder tag="div" color="white" content-center>
            <ContactForm />
          </BackgroundHolder>
        </SiteContainer>
      </SiteContainer>
    </div>
  </main>
</template>

<script setup>
// Imports
import Papaya from '@/assets/svg/decorations/papaya.svg'
import yellowDots from '@/assets/svg/decorations/yellow-dots.svg'

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'contacts'
})

defineI18nRoute({
  paths: {
    it: '/contatti',
  },
  locales: ['it'],
})

// Data
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
            margin: 50px 0 0 0,
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
