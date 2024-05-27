<template>
  <section class="s-faq">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <BackgroundHolder color="white" class="u-pt-huge u-pb-large">
      <div class="o-row row-faq">
        <SiteContainer :max-width="1060">
          <BaseHeading tag="h1" class="u-text-start u-mb-huge">{{
            $t('pages.faq.title')
          }}</BaseHeading>

          <BaseParagraph class="u-text-start u-mb-huge">
            Qui troverete risposte alle domande più comuni riguardanti il
            processo di acquisto, il pagamento, la spedizione e altro ancora. Se
            non trovate la risposta alla vostra domanda, non esitate a
            <BaseLink :to="{ name: 'contacts' }" color="dark" underline=""
              >contattarci</BaseLink
            >.
          </BaseParagraph>
        </SiteContainer>
      </div>
      <SiteContainer :max-width="1060">
        <SiteAccordion
          v-for="(faq, index) in faqs"
          :key="index"
          :title="faq.title"
        >
          <BaseParagraph>
            {{ faq.content }}
          </BaseParagraph>
        </SiteAccordion>
      </SiteContainer>
    </BackgroundHolder>
  </section>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  name: 'faq',
})

defineI18nRoute({
  paths: {
    it: '/faq',
  },
  locales: ['it'],
})

// Component life-cycle hooks

// Data
const { data: faqs } = await useApi('faq', {
  dataOnly: true,
})
const { page } = await usePage()
if (page.value && 'seo' in page.value) {
  usePageSeo(page.value.seo)
}

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
@include scope('faq') {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-green),
    )
  );
  @include object('row') {
    @include object('container') {
      display: flex;
      flex-direction: column;
      @include object('heading') {
        @include set-local-vars(
          $prefix: 'heading',
          $map: (
            'font-size': rem(40px),
            'line-height': rem(50px),
          )
        );
      }

      @include from('desktop') {
        flex-direction: row;
        align-items: center;
        gap: rem(154px);
      }
    }
  }
}
</style>
