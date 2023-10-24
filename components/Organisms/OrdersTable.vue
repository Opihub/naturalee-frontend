<template>
  <ResponsiveTable :class="CSS_NAME">
    <template #head>
      <tr :class="`${CSS_NAME}__head`">
        <th>{{ $t('orders.name') }}</th>
        <th>{{ $t('common.date') }}</th>
        <th>{{ $t('orders.statusLabel') }}</th>
        <th>{{ $t('common.total') }}</th>
        <th>{{ $t('common.actions') }}</th>
      </tr>
    </template>

    <template #body>
      <template v-if="orders.length > 0">
        <tr v-for="order in orders" :key="order.id" :class="CSS_NAME_ITEM">
          <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('orders.name')">
            <b>{{ id(order) }}</b>
          </td>
          <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('common.date')">
            {{ orderDate(order) }}
          </td>
          <td
            :class="CSS_NAME_ITEM_CELL"
            :data-title="$t('orders.statusLabel')"
          >
            {{ orderStatus(order) }}
          </td>
          <td :class="CSS_NAME_ITEM_CELL" :data-title="$t('common.total')">
            <PriceHolder :price="order.total" />
          </td>
          <td
            :class="[CSS_NAME_ITEM_CELL, `${CSS_NAME_ITEM_CELL}--actions`]"
            :data-title="$t('common.actions')"
          >
            <div class="o-row">
              <BaseButton
                as="link"
                :to="`/my-account/orders/${order.id}/view`"
                :class="`${CSS_NAME_ITEM}__view`"
                color="green"
              >
                <BaseIcon name="eye-on" filled />
              </BaseButton>
              <BaseButton
                as="link"
                :to="`/my-account/orders/${order.id}/reorder`"
                color="green"
                >{{ $t('orders.reorder') }}</BaseButton
              >
            </div>
          </td>
        </tr>
      </template>
      <tr v-else :class="CSS_NAME_ITEM">
        <td :class="CSS_NAME_ITEM_CELL" colspan="5" align="center">
          {{ $t('orders.empty') }}
        </td>
      </tr>
    </template>
  </ResponsiveTable>
</template>

<script setup>
// Imports
import { useI18n } from 'vue-i18n'

// Constants
const CSS_NAME = 'c-order-table'
const CSS_NAME_ITEM = `${CSS_NAME}__item`
const CSS_NAME_ITEM_CELL = `${CSS_NAME_ITEM}__cell`

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks
defineProps({
  orders: {
    type: Array,
    required: true,
  },
})

// Composables

// Data

// Watcher

// Computed
const id = computed(() => (order) => {
  return orderId(order.id)
})

const orderDate = computed(() => (order) => {
  const date = new Date(order.date)

  return [
    date.getDate().toString().padStart(2, '0'),
    date.getMonth().toString().padStart(2, '0'),
    date.getFullYear().toString().padStart(4, '0'),
  ].join('/')
})

const orderStatus = computed(() => (order) => {
  const { t } = useI18n()

  return t(`orders.status.${order.status}`)
})

// Methods
</script>

<style lang="scss">
$prefix: 'order-table';
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
  padding-bottom: rem(20px);

  @include element('counter') {
    font-weight: get-var(weight-regular);
  }

  @include element('head') {
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

  @include element('item') {
    position: relative;

    @include element('cell') {
      border-bottom: 1px solid transparent;
      @include typography(16px, 22px);
      vertical-align: middle;
      margin-bottom: rem(20px);
      @include until(tablet) {
        padding-left: 50%;
        text-align: start;
        padding-right: rem(20px);
        padding-top: rem(20px);
      }
      &::before {
        padding-top: rem(20px);
        width: 0;
        left: rem(40px);
        font-weight: get-var(weight-bold);
        @include typography(16px, 22px);
        text-transform: uppercase;
      }

      @include from(tablet) {
        &:first-child {
          padding-left: get-var(x-offset, $prefix: $prefix);
        }

        &:last-child {
          padding-right: get-var(x-offset, $prefix: $prefix);
        }
      }

      @include modifier('actions') {
        padding-left: 0;
        @include from(tablet) {
          width: rem(300px);
        }

        @include object('row') {
          @include until(tablet) {
            margin-top: rem(40px);
            justify-content: center;
            @include set-local-vars(
              $prefix: 'row',
              $map: (
                gap: rem(36px),
              )
            );
          }
          @include from(tablet) {
            justify-content: space-between;
          }
        }
      }

      @include object('cross') {
        display: block;
      }
    }

    @include element('view') {
      stroke: currentColor;
      @include set-local-vars(
        $prefix: 'button',
        $map: (
          padding: rem(15px),
        )
      );
    }
  }
}
</style>
