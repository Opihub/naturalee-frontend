<template>
  <ResponsiveTable :class="CSS_NAME">
    <template #head>
      <tr :class="`${CSS_NAME}__head`">
        <th colspan="2">
          {{ $t('product', count) }} <span :class="`${CSS_NAME}__counter`">({{ count }})</span>
        </th>
        <th>{{ $t('cart.type') }}</th>
        <th>{{ $t('cart.price') }}</th>
        <th>{{ $t('cart.qty') }}</th>
        <th colspan="2">{{ $t('common.subTotals') }}</th>
      </tr>
    </template>

    <template #body>
      <template v-if="count > 0">
        <tr v-for="product in cart" :key="product.id" :class="CSS_NAME_ITEM">
          <td :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--image`]">
            <ProductImage :src="product.image" :alt="product.title" />
          </td>
          <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('product')">
            {{ product.title }}
          </td>
          <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('cart.type')">
            {{ product.selling }}
          </td>
          <td
            :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
            :data-title="$t('cart.price')"
          >
            <PriceHolder :price="product.price" />
          </td>
          <td
            :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
            :data-title="$t('cart.qty')"
          >
            <BaseCounter v-model="product.quantity">
              <template #after
                ><span class="u-ml-tiny">{{ product.unit }}</span></template
              >
            </BaseCounter>
          </td>
          <td
            :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
            :data-title="$t('common.subTotals')"
          >
            <PriceHolder :price="product.price * product.quantity" />
          </td>
          <td :class="CSS_NAME_ITEM_CELL">
            <CrossButton @click="deleteFromCart(product)" />
          </td>
        </tr>
      </template>
      <tr v-else :class="CSS_NAME_ITEM">
        <td :class="CSS_NAME_ITEM_CELL" colspan="7" align="center">
          {{ $t('cart.empty') }}
        </td>
      </tr>
    </template>
    <template #footer>
      <tr :class="`${CSS_NAME}__footer`">
        <td colspan="7" align="right">
          <button
            :class="`${CSS_NAME}__empty`"
            type="button"
            color="green"
            :disabled="count <= 0"
            @click="clearCart"
          >
            {{ $t('cart.clearCart') }}
          </button>
        </td>
      </tr>
    </template>
  </ResponsiveTable>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'

// Constants
const CSS_NAME = 'c-cart-table'
const CSS_NAME_ITEM = `${CSS_NAME}__item`
const CSS_NAME_ITEM_CELL = `${CSS_NAME_ITEM}__cell`

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const store = useCartStore()

// Data
const { cart, count } = storeToRefs(store)

// Watcher

// Computed

// Methods
const { deleteFromCart, clearCart } = store
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

  @include element('counter') {
    font-weight: get-var(weight-regular);
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
      bottom: 0;
      height: 1px;
      background-color: get-var(color-light);
    }

    @include element('cell') {
      border-bottom: 1px solid transparent;
      padding: get-var(cell-padding, $prefix: $prefix);
      @include typography(16px, 22px);
      vertical-align: middle;

      @include from(tablet) {
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
      }

      @include modifier('emphasis') {
        @include typography(20px, 24px);
      }

      @include object('cross') {
        display: block;
      }
    }
  }
}
</style>
