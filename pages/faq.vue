<template>
  <main class="s-faq">
    <HeaderBottomBar v-if="page.breadcrumbs" :breadcrumb="page.breadcrumbs" />

    <BackgroundHolder color="white" class="u-pt-huge u-pb-large">
      <SiteContainer :max-width="1060">
        <BaseHeading tag="h1" class="u-text-center@tablet u-mb-huge"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BaseHeading
        >

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
  </main>
</template>

<script setup>
// Imports

// Constants

// Props & Emits

// Component life-cycle hooks

// Data
const faqs = await useApi(
  'faq',
  {},
  {
    dataOnly: true,
  }
)
const { page } = await usePage('faq')

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
}
</style>
