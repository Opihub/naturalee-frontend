<template>
  <section :class="CSS_NAME">
    <ProductImage
      :class="`${CSS_NAME}__thumbnail`"
      :src="product.image"
      background="white"
    />

    <hgroup :class="`${CSS_NAME}__heading`">
      <BaseHeading use="h4" :text="product.title" />
    </hgroup>

    <div :class="`${CSS_NAME}__body`">
      <ul
        :class="{
          [`${CSS_NAME}__variations`]: true,
          'is-single': variations.length <= 1,
        }"
        class="u-mb-half"
      >
        <li v-for="variation in variations" :key="variation.id">
          <DrawedButton
            :as="variations.length > 1 ? 'link' : 'div'"
            :to="variations.length > 1 ? variation.link : null"
            :inner-class="`${CSS_NAME}__variations__single`"
            :class="{ 'is-current': variations.length <= 1 }"
          >
            <ProductDescriptor
              :class="`${CSS_NAME}__variations__single__icon`"
              :icon="variation.selling"
              icon-size="38px"
            />
            <strong :class="`${CSS_NAME}__variations__single__title`">{{
              variation.selling
            }}</strong>
            <span :class="`${CSS_NAME}__variations__single__description`">{{
              variation.costDescription
            }}</span>
          </DrawedButton>
        </li>
      </ul>

      <BaseMarkdown
        v-if="product.description"
        :class="`${CSS_NAME}__description`"
        :content="product.description"
      />

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

    <ProductCardDetail
      :container-class="`${CSS_NAME}__card`"
      :product="product"
    />
  </section>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-product-detail'

// Define (Props, Emits, Page Meta)
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// Component life-cycle hooks

// Composables
const localeRoute = useLocaleRoute()

// Data

// Watcher

// Computed
const variations = computed(() => {
  if ('list' in props.product && props.product.list.length > 0) {
    return props.product.list
  }

  return [
    {
      variationId: props.product.variationId,
      selling: props.product.selling,
      costDescription: props.product.costDescription,
      link: props.product.link,
    },
  ]
})

// Methods
const categoryLink = (category, filter = null) => {
  const query = {}
  if (filter) {
    query['filters[]'] = filter
  }

  const route = localeRoute({
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

  flex: 1 1 auto;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: rem(20px);

  @include from(tablet) {
    display: grid;
    align-items: flex-start;
    column-gap: rem(60px);
  }

  @include from(tablet) {
    grid-template-rows: auto auto auto;
    grid-template-columns: auto rem(340px);
  }

  @include from(desktop) {
    grid-template-rows: auto 1fr;
    grid-template-columns: rem(220px) auto rem(340px);
  }

  @include from(large) {
    grid-template-columns: rem(350px) auto rem(340px);
  }

  @include from(full) {
    grid-template-columns: rem(520px) auto rem(340px);
  }

  @include element('thumbnail') {
    max-width: 50vw;
    margin: 0 auto;
  }

  @include element('body') {
    padding-top: rem(20px);
    border-top: rem(3px) solid get-var(color-white);
  }

  @include element('description') {
    @include typography(18px, 28px);
  }

  @include from(tablet) {
    @include element('thumbnail') {
      max-width: 100%;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      align-self: center;

      @include from(large) {
        align-self: start;
        grid-row: 1 / 3;
      }
    }

    @include element('heading') {
      grid-column: 1 / 3;
      grid-row: 2 / 3;
      align-self: center;

      @include from(desktop) {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }
    }

    @include element('body') {
      grid-column: 1 / 3;
      grid-row: 3 / 4;

      @include from(desktop) {
        grid-row: 2 / 3;
      }

      @include from(large) {
        grid-column: 2 / 3;
      }
    }

    @include element('card') {
      grid-column: 2 / 3;
      grid-row: 1 / 2;

      @include from(desktop) {
        grid-column: 3 / 4;
        grid-row: 1 / 4;
      }
    }
  }

  @include set-local-vars(
    $prefix: 'heading',
    $map: (
      text-color: get-var(color-black),
    )
  );

  // @include element('provenance') {
  //   @include set-local-vars(
  //     $prefix: 'heading',
  //     $map: (
  //       font-weight: get-var(weight-regular),
  //     )
  //   );
  // }

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

  @include element('variations') {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 0;
    margin: 0;
    gap: rem(14px);
    overflow: auto;

    @include is('single') {
      pointer-events: none;
    }

    @include element('single') {
      display: grid;
      grid-template-columns: rem(38px) 1fr;
      grid-template-rows: 1fr auto;
      column-gap: rem(16px);
      row-gap: rem(2px);
      text-align: left;
      align-items: center;

      @include element('icon') {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
      }

      @include element('title') {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        @include typography(16px, 20px);
      }

      @include element('description') {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        font-weight: get-var(weight-regular);
        @include typography(13px, 16px);
      }
    }
  }
}
</style>
