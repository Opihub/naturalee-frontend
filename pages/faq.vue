<template>
  <main class="s-faq">
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
onMounted(async () => {
  try {
    const response = await useApi('faq')
    console.debug(response.data)

    if (response.success) {
      faqs.value = response.data
    }
  } catch (error) {
    console.error(error)
    noProductsMessage.value =
      'È avvenuto un errore durante il caricamento dei prodotti. Ci scusiamo per il disagio'
  }
})

// Data
const faqs = ref([])

// Watcher

// Computed

// Methods
</script>

<style lang="scss">
@include scope('faq') {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-green)
    )
  )
}
</style>
