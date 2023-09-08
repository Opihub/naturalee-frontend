<template>
  <NuxtLayout name="standard" class="s-error">
    <SiteContainer flex class="u-pt-huge u-pb-huge">
      <template v-if="error.statusCode === 404">
        <BaseHeading class="u-mt-large">{{ error.statusCode }}</BaseHeading>
        <BaseHeading tag="h2" use="h3" class="u-mb-huge"
          >La pagina che stavi cercando non esiste oppure è stata
          spostata.</BaseHeading
        >
      </template>
      <template v-else>
        <BaseHeading class="u-mt-large">Ops!</BaseHeading>
        <BaseHeading tag="h2" use="h3" class="u-mb-huge"
          >È avvenuto un errore inaspettato...</BaseHeading
        >
      </template>

      <BaseButton @click="handleError">Torna alla homepage</BaseButton>
    </SiteContainer>
  </NuxtLayout>
</template>

<script setup>
// Imports

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

// Data

// Watcher

// Computed

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
