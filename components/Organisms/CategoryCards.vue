<template>
  <SiteContainer>
    <BaseHeading v-if="title" class="u-mb-large" tag="h5">{{ title }}</BaseHeading>
    <div class="o-row">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :image="category.image"
        :to="category.link"
      >
        {{ category.title }}
      </CategoryCard>
    </div>
  </SiteContainer>
</template>

<script setup>
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
