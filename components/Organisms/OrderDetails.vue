<template>
  <ResponsiveTable :class="CSS_NAME">
    <template #head>
      <tr :class="`${CSS_NAME}__head`">
        <th colspan="2">
          {{
            $t('products.count', products.length, {
              count: products.length,
            })
          }}
        </th>
        <th>{{ $t('products.type') }}</th>
        <th>{{ $t('products.price') }}</th>
        <th>{{ $t('products.quantity') }}</th>
        <th>{{ $t('common.subTotal') }}</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="product in products" :key="product.id" :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--image`]">
          <ProductImage :src="product.image" :alt="product.title" />
        </td>
        <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('products.count')">
          {{ product.selling }}
        </td>
        <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('products.type')">
          {{ product.costDescription }}
        </td>
        <td
          :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
          :data-title="$t('products.price')"
        >
          <PriceHolder :price="product.price" />
        </td>
        <td
          :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
          :data-title="$t('products.quantity')"
        >
          {{ product.quantity }}
        </td>
        <td
          :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
          :data-title="$t('common.subTotal')"
        >
          <PriceHolder :price="product.price * product.quantity" />
        </td>
      </tr>
    </template>
    <template #footer>
      <tr :class="CSS_NAME_ITEM">
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('common.subTotal')"
          colspan="3"
        >
          {{ $t('common.subTotal') }}:
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">
          <PriceHolder :price="subTotal" />
        </td>
      </tr>
      <tr v-if="coupon" :class="CSS_NAME_ITEM">
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('coupon.name')"
          colspan="3"
        >
          {{ $t('coupon.name') }}:
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">{{ coupon }}</td>
      </tr>
      <tr :class="CSS_NAME_ITEM">
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('orders.shipping')"
          colspan="3"
        >
          {{ $t('orders.shipping') }}:
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">{{ shipping.title }}</td>
      </tr>
      <tr :class="CSS_NAME_ITEM">
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('orders.payment')"
          colspan="3"
        >
          {{ $t('orders.payment') }}:
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">{{ payment.title }}</td>
      </tr>
      <tr :class="CSS_NAME_ITEM">
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('common.total')"
          colspan="3"
        >
          {{ $t('common.total') }}:
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">
          <PriceHolder :price="granTotal" />
        </td>
      </tr>
    </template>
  </ResponsiveTable>
</template>

<script setup>
// Imports

// Constants
const CSS_NAME = 'c-order-resume'
const CSS_NAME_ITEM = `${CSS_NAME}__item`
const CSS_NAME_ITEM_CELL = `${CSS_NAME_ITEM}__cell`

// Define (Props, Emits, Page Meta)
const props = defineProps({
  products: {
    type: Array,
    default() {
      return []
    },
  },
  subTotal: {
    type: Number,
    default: null,
  },
  shipping: {
    type: Object,
    default() {
      return {}
    },
  },
  payment: {
    type: Object,
    default() {
      return {}
    },
  },
  coupon: {
    type: String,
    default: null,
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed
const { subTotal } = props.subTotal
  ? ref(props.subTotal)
  : useTotal(props.products)

const granTotal = computed(() => {
  return subTotal.value + props.shipping.cost || 0
})

// Methods
</script>

<style lang="scss">
$prefix: 'order-resume';
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
    }
  }
}
</style>
