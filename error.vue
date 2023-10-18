<template>
  <NuxtLayout name="standard" class="s-error">
    <SiteContainer flex class="u-pt-huge u-pb-huge">
      <template v-if="error.statusCode === 404">
        <BaseHeading class="u-mt-large">{{ error.statusCode }}</BaseHeading>
        <BaseHeading tag="h2" use="h3" class="u-mb-huge">
          {{ message }}
        </BaseHeading>
      </template>
      <template v-else>
        <BaseHeading class="u-mt-large">{{ $t('errors.ops') }}</BaseHeading>
        <BaseHeading tag="h2" use="h3" class="u-mb-huge">{{
          $t('errors.generic')
        }}</BaseHeading>
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
    console.warn({ ...props.error })
  }
})

// Composables
const { t } = useI18n()

// Data

// Watcher

// Computed
const message = computed(() => {
  if (props.error.statusMessage.indexOf('Page Not Found:') > -1) {
    return t('errors.pageNotFound')
  }

  return props.error.statusMessage
})

// Methods
const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss">
@include scope('error') {
  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );

  @include set-local-vars(
    $prefix: 'container',
    $map: (
      direction: column,
    )
  );
}
</style>
