<template>
  <section :class="[CSS_NAME, 'o-row']">
    <div :class="[CSS_NAME_MAIN, 'o-row__column']">
      <ProductImage
        :class="`${CSS_NAME_MAIN}__thumbnail`"
        :src="product.image"
      />

      <hgroup :class="`${CSS_NAME_MAIN}__heading`">
        <BaseHeading use="h4" :text="product.title" />
        <BaseHeading
          v-if="product.provenance"
          :class="[`${CSS_NAME}__provenance`, 'u-mt-mini']"
          use="h6"
          tag="h2"
          :text="product.provenance"
        />
      </hgroup>

      <div :class="`${CSS_NAME_MAIN}__body`">
        <ul v-if="product?.list && product.list.length > 0">
          <li v-for="variation in product.list" :key="variation.id">
            {{ variation }}
          </li>
        </ul>

        <BaseMarkdown :content="product.description" />

        <TagsList
          v-if="product?.categories && product.categories.length > 0"
          class="u-mt-half"
          :list="product.categories"
          :title="$t('products.category')"
          item-key="slug"
          item-value="title"
          :resolve-link="(item) => categoryLink(item.slug)"
        />

        <TagsList
          v-if="product?.tag && product.tag.length > 0"
          class="u-mt-half"
          :list="product.tag"
          :title="$t('products.tag')"
          item-key="slug"
          :resolve-link="
            (item) => categoryLink($route.params.category, item.slug)
          "
        />
      </div>
    </div>

    <ReceiptBlock
      :container-class="[`${CSS_NAME}__card`, 'o-row__column']"
      top-less
    >
      <MarkerLabel v-if="product.marker" :marker="product.marker" />

      <div>
        <BaseButton color="green">{{ $t('cart.addTo') }}</BaseButton>
        <WishlistButton :product="product" />
      </div>
    </ReceiptBlock>
  </section>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-product-detail'
const CSS_NAME_MAIN = `${CSS_NAME}__main`

// Define (Props, Emits, Page Meta)
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// Component life-cycle hooks

// Composables
const router = useRouter()

// Data

// Watcher

// Computed

// Methods
const categoryLink = (category, filter = null) => {
  const query = {}
  if (filter) {
    query['filters[]'] = filter
  }

  const route = router.resolve({
    name: 'category',
    params: {
      category,
    },
    query,
  })

  return route
}
</script>

<style lang="scss">
$prefix: 'product-detail';
@include component($prefix) {
  align-items: flex-start;

  @include set-local-vars(
    $prefix: 'row',
    $map: (
      column-gap: rem(60px),
      columns: 2,
    )
  );

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );

  @include element('provenance') {
    @include set-local-vars(
      $prefix: 'heading',
      $map: (
        font-weight: get-var(weight-regular),
      )
    );
  }

  @include element('main') {
    @include set-local-vars(
      $prefix: 'column',
      $map: (
        width: rem(1200px),
      )
    );

    @include set-local-vars(
      $prefix: 'paragraph',
      $map: (
        font-family: get-var(family-main),
        font-size: rem(14px),
        line-height: rem(18px),
      )
    );

    @include set-local-vars(
      $prefix: 'content',
      $map: (
        font-family: get-var(family-main),
        font-size: rem(14px),
        line-height: rem(18px),
      )
    );

    display: grid;
    align-items: flex-start;
    grid-template-columns: rem(520px) auto;
    column-gap: rem(60px);
    grid-template-rows: auto 1fr;
    row-gap: rem(20px);

    // align-items: center;
    // justify-content: center;

    @include element('thumbnail') {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    @include element('heading') {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    @include element('body') {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      padding-top: rem(20px);
      border-top: rem(3px) solid get-var(color-white);
    }
  }

  @include element('card') {
    @include set-local-vars(
      $prefix: 'column',
      $map: (
        width: rem(340px),
      )
    );
    display: flex;
    flex-direction: column;
    position: relative;

    @include object('marker') {
      position: absolute;
      left: 0;
      top: rem(60px);
    }
  }
}
</style>
