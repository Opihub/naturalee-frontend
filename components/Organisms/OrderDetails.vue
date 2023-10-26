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
        <th>{{ $t('common.subTotal') }}</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="product in products" :key="product.id" :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--image`]">
          <ProductImage :src="product.image" :alt="product.title" />
        </td>
        <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('products.label')">
          <b class="u-mr-mini">{{ product.quantity }}&times;</b
          >{{ product.title }}<br />
          <small>{{ product.costDescription }}</small>
        </td>
        <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('products.type')">
          {{ product.selling }}
        </td>
        <td
          :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--emphasis`]"
          :data-title="$t('products.price')"
        >
          <PriceHolder :price="product.price" />
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
          :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]"
          :data-title="$t('common.subTotal')"
          colspan="3"
        >
          <span class="desktop-label">{{ $t('common.subTotal') }}:</span>
        </td>
        <td :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]" colspan="3">
          <PriceHolder :price="subTotal" />
        </td>
      </tr>
      <tr
        v-if="timeSlots && Object.keys(timeSlots).length > 0"
        :class="CSS_NAME_ITEM"
      >
        <td
          :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]"
          :data-title="$t('common.timeSlot')"
          colspan="3"
        >
          <span class="desktop-label">{{ $t('common.timeSlot') }}:</span>
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">
          {{ timeSlots.title }} {{ timeSlots.from }} - {{ timeSlots.to }}
        </td>
      </tr>
      <tr v-if="coupon" :class="CSS_NAME_ITEM">
        <td
          :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]"
          :data-title="$t('coupon.name')"
          colspan="3"
        >
          <span class="desktop-label">{{ $t('coupon.name') }}:</span>
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">{{ coupon }}</td>
      </tr>
      <tr :class="CSS_NAME_ITEM">
        <td
          :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]"
          :data-title="$t('orders.shipping')"
          colspan="3"
        >
          <span class="desktop-label">{{ $t('orders.shipping') }}:</span>
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">
          {{ shipping.title }}
        </td>
      </tr>
      <tr :class="CSS_NAME_ITEM">
        <td
          :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]"
          :data-title="$t('orders.payment')"
          colspan="3"
        >
          <span class="desktop-label">{{ $t('orders.payment') }}:</span>
        </td>
        <td :class="CSS_NAME_ITEM_CELL" colspan="3">
          {{ payment.title }}
        </td>
      </tr>
      <tr :class="CSS_NAME_ITEM">
        <td
          :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]"
          :data-title="$t('common.total')"
          colspan="3"
        >
          <span class="desktop-label">{{ $t('common.total') }}:</span>
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
const CSS_NAME = 'c-order-details'
const CSS_NAME_ITEM = `${CSS_NAME}__item`
const CSS_NAME_ITEM_CELL = `${CSS_NAME_ITEM}__cell`
const CSS_NAME_ITEM_CELL_FOOT = 'cell_tfoot'

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
  timeSlots: {
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
$prefix: 'order-details';
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
      padding-left: 50%;
      @include typography(16px, 22px);
      vertical-align: middle;

      &::before {
        left: rem(20px);
        font-weight: get-var(weight-bold);
        @include typography(16px, 22px);
        text-transform: uppercase;
      }
      &.cell_tfoot::before {
        @include until(tablet) {
          padding-top: rem(20px);
        }
      }
      @include until(tablet) {
        & > .desktop-label {
          display: none;
        }
        text-align: start;
        padding-right: rem(20px);
        padding-bottom: rem(20px);
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
      }

      @include modifier('emphasis') {
        @include typography(20px, 24px);
      }

      // @include element('foot') {
      //   &::before {
      //     padding-top: rem(20px);
      //   }
      // }
    }
  }
}
</style>
