<template>
  <ResponsiveTable :class="CSS_NAME">
    <template #head>
      <tr :class="`${CSS_NAME}__head`">
        <th colspan="2">
          {{
            $t('products.count', order.products.length, {
              count: order.products.length,
            })
          }}
        </th>
        <th>{{ $t('products.type') }}</th>
        <th>{{ $t('products.price') }}</th>
        <th>{{ $t('common.subTotal') }}</th>
      </tr>
    </template>

    <template #body>
      <tr
        v-for="product in order.products"
        :key="product.id"
        :class="CSS_NAME_ITEM"
      >
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
        <td :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]" colspan="3">
          <span>{{ $t('common.deliveryDate') }}:</span>
        </td>
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('common.deliveryDate')"
          colspan="2"
        >
          <b class="u-d-block u-d-inline@tablet">{{
            getFormattedDate(order.pickedDate)
          }}</b
          ><span class="u-d-none u-d-inline@tablet">, </span
          >{{ order.timeSlots.from }} -
          {{ order.timeSlots.to }}
        </td>
      </tr>

      <tr :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]" colspan="3">
          <span>{{ $t('common.subTotal') }}:</span>
        </td>
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('common.subTotal')"
          colspan="2"
        >
          <PriceHolder :price="order.subTotal" />
        </td>
      </tr>

      <tr v-if="order.discount" :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]" colspan="3">
          <span>{{ $t('common.discount') }}:</span>
        </td>
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('common.discount')"
          colspan="2"
        >
          <PriceHolder :price="order.discount">
            <template #before>-</template>
          </PriceHolder>
        </td>
      </tr>

      <tr :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]" colspan="3">
          <span>{{ $t('orders.shipping') }}:</span>
        </td>
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('orders.shipping')"
          colspan="2"
        >
          <template v-if="order.shipping.cost">
            <PriceHolder :price="order.shipping.cost" />
          </template>
          <template v-else>
            {{ order.shipping.title }}
          </template>
        </td>
      </tr>

      <tr :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]" colspan="3">
          <span>{{ $t('orders.payment') }}:</span>
        </td>
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('orders.payment')"
          colspan="2"
        >
          {{ order.payment.title }}
        </td>
      </tr>

      <tr :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, CSS_NAME_ITEM_CELL_FOOT]" colspan="3">
          <span>{{ $t('common.total') }}:</span>
        </td>
        <td
          :class="CSS_NAME_ITEM_CELL"
          :data-title="$t('common.total')"
          colspan="2"
        >
          <PriceHolder :price="order.total" />
        </td>
      </tr>

      <tr v-if="order.notes" :class="CSS_NAME_ITEM">
        <td :class="[CSS_NAME_ITEM_CELL, 'is-full']" colspan="5">
          <b class="u-d-block">{{ $t('orders.notes') }}:</b>
          {{ order.notes }}
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
defineProps({
  order: {
    type: Object,
    required: true,
    validator(value) {
      return (
        'id' in value &&
        'date' in value &&
        'status' in value &&
        'total' in value &&
        'discount' in value &&
        'subTotal' in value &&
        'addresses' in value &&
        'coupon' in value &&
        'products' in value &&
        Array.isArray(value.products) &&
        'shipping' in value &&
        'payment' in value &&
        'fees' in value &&
        'pickedDate' in value &&
        'timeSlots' in value
      )
    },
  },
})

// Component life-cycle hooks

// Composables

// Data

// Watcher

// Computed

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
    padding-top: rem(20px);

    @include from(tablet) {
      padding-top: 0;
    }

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
      @include typography(16px, 22px);
      border-bottom: 1px solid transparent;
      // padding-left: 50%;
      padding-top: 0;
      vertical-align: middle;

      &::before {
        @include set-local-vars(
          $prefix: 'table',
          $map: (
            offset-left: rem(20px),
            offset-right: rem(20px),
          )
        );

        font-weight: get-var(weight-bold);
        @include typography(16px, 22px);
        text-transform: uppercase;
      }

      @include until(tablet) {
        text-align: start;
        padding-right: rem(20px);
        padding-bottom: rem(20px);

        @include is('full') {
          padding-left: rem(20px);
        }

        &.cell_tfoot {
          display: none;
        }

        @include modifier('image') {
          padding-left: rem(20px);

          @include object('product-image') {
            width: 200px;
            margin: 0 auto;
          }
        }
      }

      @include from(tablet) {
        padding: get-var(cell-padding, $prefix: $prefix);
        &:first-child {
          padding-left: get-var(x-offset, $prefix: $prefix);
        }

        &:last-child {
          padding-right: get-var(x-offset, $prefix: $prefix);
        }

        @include modifier('image') {
          width: calc(
            #{rem(65px)} + #{get-var(x-offset, $prefix: $prefix)} + #{get-var(
                cell-padding,
                $prefix: $prefix
              )}
          );
        }
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
