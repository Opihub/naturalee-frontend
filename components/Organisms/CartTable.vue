<template>
  <ResponsiveTable :class="CSS_NAME">
    <template #head>
      <tr :class="`${CSS_NAME}__head`">
        <th colspan="2">
          {{ $t('products.label', products.length) }}
          <span :class="`${CSS_NAME}__counter`">({{ products.length }})</span>
        </th>
        <th>{{ $t('products.type') }}</th>
        <th align="center">{{ $t('products.price') }}</th>
        <th align="center">{{ $t('products.quantity') }}</th>
        <th align="center" colspan="2">{{ $t('common.subTotal') }}</th>
      </tr>
    </template>

    <template #body>
      <template v-if="products.length > 0">
        <tr
          v-for="product in products"
          :key="product.id"
          :class="CSS_NAME_ITEM"
        >
          <td :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--image`]">
            <ProductImage :src="product.image" :alt="product.title" />
          </td>
          <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('products.label')">
            {{ product.title }}
          </td>
          <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('products.type')">
            {{ product.selling }}
          </td>
          <td
            :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
            :data-title="$t('products.price')"
            align="center"
          >
            <PriceHolder
              :price="product.price"
              :sales-price="product?.discountPrice"
            >
              <template v-if="product.discountPrice">
                <PriceHolder
                  class="u-block"
                  :sales-price="product?.discountKgPrice"
                />
              </template>
            </PriceHolder>
          </td>
          <td
            :class="[
              CSS_NAME_ITEM_CELL,
              `${CSS_NAME_ITEM_CELL}--emphasis`,
              `${CSS_NAME_ITEM_CELL}--inline`,
            ]"
            :data-title="$t('products.quantity')"
            align="center"
          >
            <BaseCounter v-if="!readonly" v-model.number="product.quantity" />
            <span v-else>{{ product.quantity }}</span>
          </td>
          <td
            :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
            :data-title="$t('common.subTotal')"
            align="center"
          >
            <PriceHolder :price="calculatedPrice(product)" />
          </td>
          <td v-if="!readonly" :class="CSS_NAME_ITEM_CELL" align="center">
            <CrossButton @click="onDelete(product)" />
          </td>
        </tr>
      </template>
      <tr v-else :class="CSS_NAME_ITEM">
        <td :class="CSS_NAME_ITEM_CELL" colspan="7" align="center">
          {{ $t('cart.empty') }}
        </td>
      </tr>
    </template>
    <template v-if="!readonly" #footer>
      <tr :class="`${CSS_NAME}__footer`">
        <td colspan="7">
          <button
            :class="`${CSS_NAME}__empty u-mr-small`"
            type="button"
            color="green"
            :disabled="products.length <= 0"
            @click="onClear"
          >
            {{ $t('cart.clearCart') }}
          </button>

          <button
            :class="`${CSS_NAME}__empty`"
            type="button"
            color="green"
            :disabled="products.length <= 0"
            @click="onSave"
          >
            {{ $t('cart.updateCart') }}
          </button>
        </td>
      </tr>
    </template>
  </ResponsiveTable>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-cart-table'
const CSS_NAME_ITEM = `${CSS_NAME}__item`
const CSS_NAME_ITEM_CELL = `${CSS_NAME_ITEM}__cell`

// Define (Props, Emits, Page Meta)
defineProps({
  products: {
    type: Array,
    required: true,
  },
  onDelete: {
    type: Function,
    default() {
      return () => {}
    },
  },
  onClear: {
    type: Function,
    default() {
      return () => {}
    },
  },
  onSave: {
    type: Function,
    default() {
      return () => {}
    },
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed
const { calculatedPrice } = usePrice()

// Methods
</script>

<style lang="scss">
$prefix: 'cart-table';
@include component($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      x-offset: rem(40px),
      cell-padding: rem(10px),
    )
  );

  border-radius: rem(20px);
  background-color: get-var(color-white);
  text-align: left;

  @include set-local-vars(
    $prefix: 'counter',
    $map: (
      width: rem(110px),
    )
  );

  @include element('counter') {
    font-weight: get-var(weight-regular);
  }

  @include element('unit') {
    display-inline: block;
  }

  @include element('head') {
    border-bottom: 2px solid get-var(color-light);
    text-transform: uppercase;
    font-weight: get-var(weight-bold);
    @include typography(16px, 20px);

    td,
    th {
      padding: rem(24px) get-var(cell-padding, $prefix: $prefix);

      @include from(tablet) {
        &:first-child {
          padding-left: get-var(x-offset, $prefix: $prefix);
        }

        &:last-child {
          padding-right: get-var(x-offset, $prefix: $prefix);
        }
      }
    }
  }

  @include element('footer') {
    td,
    th {
      padding: rem(0px) get-var(cell-padding, $prefix: $prefix) rem(24px);

      @include from(tablet) {
        padding: rem(24px) get-var(cell-padding, $prefix: $prefix);
        text-align: right;
        &:first-child {
          padding-left: get-var(x-offset, $prefix: $prefix);
        }

        &:last-child {
          padding-right: get-var(x-offset, $prefix: $prefix);
        }
      }
    }
  }

  @include element('empty') {
    border: 0;
    border-radius: 0;
    padding: 0;
    background-color: transparent;
    font-weight: get-var(weight-bold);
    text-transform: uppercase;
    text-decoration: underline;
    color: get-var(color-black);
    text-decoration-color: get-var(color-green);
    text-underline-offset: rem(8px);
    text-decoration-thickness: 2px;
    cursor: pointer;
    @include typography(16px, 28px);
    @include transition(color, text-decoration-color);
    outline-offset: 3px;

    &:hover {
      color: get-var(color-green);
      text-decoration-color: get-var(color-yellow);
    }

    &:disabled {
      cursor: not-allowed;
      color: get-var(color-light);
      text-decoration-color: get-var(color-light);
    }
  }

  @include element('item') {
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: get-var(x-offset, $prefix: $prefix);
      right: get-var(x-offset, $prefix: $prefix);
      bottom: get-var(after-bottom, 0, $prefix: $prefix);
      height: 1px;
      background-color: get-var(color-light);
    }

    @include element('cell') {
      border-bottom: 1px solid transparent;
      @include typography(16px, 22px);
      vertical-align: middle;
      padding-left: 50%;
      margin-bottom: rem(20px);
      @include until(tablet) {
        text-align: start;
        padding-right: rem(20px);
      }
      & > * {
        vertical-align: middle;
      }

      &::before {
        width: 0;
        left: rem(20px);
        font-weight: get-var(weight-bold);
        @include typography(16px, 22px);
        text-transform: uppercase;
      }

      @include from(tablet) {
        padding: get-var(cell-padding, $prefix: $prefix);
        &:first-child {
          padding-left: get-var(x-offset, $prefix: $prefix);
        }

        &:last-child {
          padding-right: get-var(x-offset, $prefix: $prefix);
        }
      }

      @include modifier('image') {
        width: calc(
          #{rem(65px)} + #{get-var(x-offset, $prefix: $prefix)} + #{get-var(
              cell-padding,
              $prefix: $prefix
            )}
        );
        @include until('tablet') {
          padding-left: 0;
          padding-right: 0;
          width: 150px;
          margin: 0 auto;
          margin-bottom: 20px;
          padding-top: 20px;
        }
      }

      @include modifier('emphasis') {
        @include typography(20px, 24px);
      }

      @include modifier('inline') {
        white-space: nowrap;
      }

      @include object('cross') {
        display: block;
        @include until('tablet') {
          // padding-left: 95%;
          // margin-top: -40px;
          padding-bottom: rem(20px);
        }
      }
    }
  }
}
tfoot {
  @include until(tablet) {
    display: block;
    text-align: center;
  }
}
</style>
