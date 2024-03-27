<template>
  <NuxtLoadingIndicator />

  <NuxtLayout name="error">
    <SiteContainer flex class="u-pt-huge u-pb-huge">
      <template v-if="error.statusCode === 404">
        <BaseParagraph class="">
          {{ $t('errors.ops') }}
        </BaseParagraph>
        <BaseHeading tag="h1" use="custom" class="u-mb-large _error-title">{{ error.statusCode }}</BaseHeading>
        <BaseHeading tag="h2" use="h3" class="u-mb-tiny">
          {{ $t('errors.404.title') }}
        </BaseHeading>
        <BaseParagraph class="u-mb-huge">
          {{ $t('errors.404.subtitle') }}
        </BaseParagraph>
      </template>
      <template v-else>
        <BaseHeading class="u-mt-large">{{ $t('errors.ops') }}</BaseHeading>
        <BaseHeading tag="h2" use="h3" class="u-mb-huge">{{
          $t('errors.generic')
        }}</BaseHeading>

        <BaseHeading tag="h4">{{ error.message }}</BaseHeading>
        <div class="u-mt-large u-mb-large" v-html="error.stack"></div>
      </template>

      <BaseButton @click="handleError">{{
        $t('errors.backToHome')
      }}</BaseButton>
    </SiteContainer>
  </NuxtLayout>
</template>

<script setup>
// Imports
import { useI18n } from 'vue-i18n'

// Constants

// Define (Props, Emits, Page Meta)
const props = defineProps({
  error: {
    type: Object,
    default() {
      return {}
    },
  },
})

// Component life-cycle hooks
onMounted(() => {
  if (props.error.statusCode !== 404) {
    console.error({ ...props.error })
  }
})

// Composables
const config = useRuntimeConfig()
const { t } = useI18n()

// Data

// Watcher

// Computed
const seoTitle = computed(() => {
  let title = t('errors.ops')

  if (config.public.title) {
    title += ` ${config.public.seoSeparator || '|'} ${config.public.title}`
  }

  return title
})

// Methods
const handleError = () => clearError({ redirect: '/' })

// Component life-cycle hooks
usePageSeo({
  title: seoTitle
})
</script>

<style lang="scss" scoped>
@include hack('error-title') {
  @include set-local-vars($prefix: 'heading', $map: (
    font-weight: get-var(weight-bold),
    font-size: rem(120px),
    line-height: rem(130px),
  ));
}
</style>
