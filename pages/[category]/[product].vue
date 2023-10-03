<template>
  <main>
    <HeaderBottomBar :breadcrumb="page.breadcrumbs" />

    <WorkInProgress />

    <SiteContainer class="u-pt-huge u-pb-huge">
      <div class="o-row">
        <div class="o-row__column _image">
          <ProductImage :src="page.image" />
        </div>

        <div class="o-row__column _card">
          <MarkerLabel
            v-if="page.marker"
            :text="page.marker.title"
            :color="page.marker.color"
          />

          <BaseHeading :text="page.title" />
          <BaseHeading
            v-if="page.provenance"
            tag="h2"
            :text="page.provenance"
          />

          <div>
            <BaseButton color="green">Aggiungi al carrello</BaseButton>
            <WishlistButton :product="page" />
          </div>
        </div>
      </div>
    </SiteContainer>
  </main>
</template>

<script setup>
// Imports

// Constants

// Define (Props, Emits, Page Meta)
definePageMeta({
  validate: async (route) => {
    if (!isCategory(route.params.category)) {
      return false
    }

    const { response } = await usePage(
      route.params.product,
      `shop/categories/${route.params.category}/products`
    )

    return response.value.success
  },
})

// Component life-cycle hooks

// Data
const route = useRoute()
const { page } = await usePage(
  route.params.product,
  `shop/categories/${route.params.category}/products`
)

// Watcher

// Computed

// Methods
</script>

<style lang="scss" scoped>
@include object('row') {
  @include set-local-vars(
    $prefix: 'row',
    $map: (
      columns: 2,
    )
  );
}

._image {
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    max-width: rem(520px);
    margin: 0 auto;
  }
}

._card {
  background-color: get-var(color-white);
  display: flex;
  flex-direction: column;
  position: relative;
  padding: rem(120px);
  border-radius: rem(60px);

  @include object('marker') {
    position: absolute;
    left: 0;
    top: rem(60px);
  }

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );
}
</style>
