<template>
  <section class="s-contacts">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />
    <div class="o-row row-contacts">
      <SiteContainer>
        <SiteContainer class="o-row__container o-row__container--left" padless>
          <BaseHeading id="company-info" class="u-mb-small" tag="h1" use="h3">{{
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
            :svg-size="svgs.papaya.size"
            :coordinates="svgs.papaya.coordinates"
          >
            <template #default>
              <Papaya />
            </template>
          </FloatingIcon>
          <FloatingIcon
            class="c-yellow-dots"
            :svg-size="svgs.yellowDots.size"
            :coordinates="svgs.yellowDots.coordinates"
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
  </section>
</template>

<script setup>
// Imports
import Papaya from '@/assets/svg/decorations/papaya.svg'
import yellowDots from '@/assets/svg/decorations/yellow-dots.svg'

// Define (Props, Emits, Page Meta)
definePageMeta({
  path: '/contatti',
  name: 'contacts',
})

defineI18nRoute({
  paths: {
    it: '/contatti',
  },
  locales: ['it'],
})

// Data
const { page } = await usePage()
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

const svgs = ref({
  yellowDots: {
    size: {
      default: { width: 67, height: 81 },
      tablet: { width: 150, height: 140 },
    },
    coordinates: {
      default: { top: -30, right: -20 },
    },
    rotate: 90,
  },
  papaya: {
    size: {
      default: { width: 102, height: 86 },
      tablet: { width: 235, height: 200 },
      large: { width: 285, height: 250 },
    },
    coordinates: {
      default: { bottom: -50, left: -30 },
      tablet: { bottom: -70, left: -180 },
      large: { bottom: -70, left: -220 },
    },
  },
})
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
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 10px;
      @include from('tablet') {
        flex-direction: row;
        gap: 4em;
      }
    }
    @include element('container') {
      display: block;
      @include component('yellow-dots') {
        @include until(tablet) {
          transform: rotate(180deg);
        }
      }
      @include from(tablet) {
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
