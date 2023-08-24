<template>
  <SiteContainer :class="CSS_NAME">
    <BaseHeading v-if="title" class="u-mb-medium" tag="h5">{{
      title
    }}</BaseHeading>
    <div class="o-row">
      <CategoryCard
        v-for="category in categories"
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
</template>

<script setup>
const CSS_NAME = 'c-category-cards'

defineProps({
  title: {
    type: String,
    default: null,
  },
  /**
   * id: "Number"
   * title: "String"
   * link: "RelativeURL"
   * slug: "UniqueString"
   * position: "String"
   * image: "Image"
   */
  categories: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss">
$prefix: 'category-cards';
@include component($prefix) {
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

  @include from(full) {
    @include set-local-vars(
      $prefix: 'row',
      $map: (
        columns: 5,
      )
    );
  }
}
</style>
