<template>
  <CompleteLayout override-last-element>
    <slot />

    <template #after>
      <BackgroundHolder
        class="u-pt-huge u-mt-auto"
        color="white"
        :class="{ 'u-pb-medium': menu.marquee && menu.marquee.length }"
      >
        <SiteContainer v-if="shopCategories.length" class="u-mb-medium s-category-cards">
          <BaseHeading
            class="u-mb-medium u-text-center u-text-left@tablet"
            tag="h5"
            >{{ $t('products.categoriesFeatured') }}</BaseHeading
          >

          <div class="o-row">
            <CategoryCard
              v-for="category in shopCategories"
              :key="category.id"
              class="o-row__column"
              :image="category.image"
              :to="category.link"
              :position="category.position"
            >
              {{ category.title }}
            </CategoryCard>
          </div>
        </SiteContainer>

        <MarqueeSlider
          v-if="layout.marquee && layout.marquee.length"
          :marquee="layout.marquee"
        />
      </BackgroundHolder>
    </template>
  </CompleteLayout>
</template>

<script setup>
// Imports
import CompleteLayout from '@/layouts/standard'

// Constants
const configurationStore = useConfigurationStore()

// Composables
const { shopCategories, menu, layout } = storeToRefs(configurationStore)
</script>

<style lang="scss">
@include scope('category-cards') {
  @include object('row') {
    flex-direction: column;

    @include from(tablet) {
      flex-direction: row;
      justify-content: center;
    }
  }

  @include from(tablet) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 3,
      )
    );
  }

  @include from(desktop) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 5,
      )
    );
  }
}
</style>
