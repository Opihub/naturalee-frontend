<template>
  <SiteContainer :class="CSS_NAME">
    <div :class="`${CSS_NAME}__toolbar`">
      <div
        v-if="filters.length"
        :class="[CSS_NAME_ACTION, `${CSS_NAME_ACTION}--filter`]"
      >
        <button
          :class="`${CSS_NAME_ACTION}__trigger`"
          type="button"
          @click="toggleOverlay(true)"
        >
          {{ $t('filters.label') }}
        </button>

        <ul :class="`${CSS_NAME}__filter`">
          <li
            v-for="filter in filters"
            :key="filter.slug"
            :class="`${CSS_NAME}__filter__item`"
          >
            <BaseButton
              color="transparent"
              scope="filter"
              :class="{
                'is-active': chosenFilters.includes(filter.slug),
              }"
              @click="$emit('filter:change', filter.slug)"
              >{{ filter.text }}</BaseButton
            >
          </li>
        </ul>

        <Teleport to="body">
          <BaseOverlay
            v-show="isFilterOverlayOpen"
            :class="[CSS_NAME, CSS_NAME_OVERLAY]"
          >
            <div :class="`${CSS_NAME_OVERLAY}__header`">
              <span>{{
                $t('filters.selected', chosenFilters.length, {
                  count: chosenFilters.length,
                })
              }}</span>
              <u @click="$emit('filter:clear')">{{ $t('filters.clear') }}</u>
            </div>

            <ul :class="`${CSS_NAME}__filter`">
              <li
                v-for="filter in filters"
                :key="filter.slug"
                :class="`${CSS_NAME}__filter__item`"
              >
                <BaseButton
                  color="transparent"
                  scope="filter"
                  :class="{
                    'is-active': chosenFilters.includes(filter.slug),
                  }"
                  @click="$emit('filter:change', filter.slug)"
                  >{{ filter.text }}</BaseButton
                >
              </li>
            </ul>

            <div :class="`${CSS_NAME_OVERLAY}__footer`">
              <BaseButton
                color="transparent"
                scope="filter"
                @click="toggleOverlay(false)"
                >{{ $t('apply') }}
              </BaseButton>
            </div>
          </BaseOverlay>
        </Teleport>
      </div>

      <div v-if="sortable && orderOptions" :class="CSS_NAME_ACTION">
        <button
          :class="[
            `${CSS_NAME_ACTION}__trigger`,
            `${CSS_NAME_ACTION}__trigger--intent`,
          ]"
          type="button"
        >
          {{ $t('filters.order') }}
          <Suspense>
            <NuxtIcon name="caret" />
          </Suspense>
        </button>
        <select
          :value="orderby"
          :class="{
            [`${CSS_NAME_ACTION}__trigger`]: true,
            [`${CSS_NAME_ACTION}__trigger--select`]: true,
            'is-active': orderby !== null,
          }"
          @change="$emit('order:change', $event.target.value)"
        >
          <option value="">{{ $t('filters.orderBy') }}</option>
          <option v-for="(name, key) in orderOptions" :key="key" :value="key">
            {{ name }}
          </option>
        </select>
      </div>
    </div>
  </SiteContainer>
</template>

<script setup>
// Imports
import { useI18n } from 'vue-i18n'

// Constants
const CSS_NAME = 'c-products-filters'
const CSS_NAME_OVERLAY = `${CSS_NAME}-overlay`
const CSS_NAME_ACTION = `${CSS_NAME}__action`

// Define (Props, Emits, Page Meta)
defineProps({
  filters: {
    type: Array,
    default() {
      return []
    },
  },
  chosenFilters: {
    type: Array,
    default() {
      return []
    },
  },
  sortable: {
    type: Boolean,
    default: null,
  },
  orderby: {
    type: String,
    default: null,
  },
  orderOptions: {
    type: Object,
    default() {
      const { t } = useI18n()

      return {
        asc: t('asc'),
        desc: t('desc'),
      }
    },
  },
})
defineEmits(['filter:clear', 'filter:change', 'order:change'])

// Component life-cycle hooks

// Composables

// Data
const isFilterOverlayOpen = ref(false)

// Watcher

// Computed

// Methods
const toggleOverlay = (status = null) => {
  isFilterOverlayOpen.value =
    status === null ? !isFilterOverlayOpen.value : status
}
</script>

<style lang="scss">
$prefix: 'products-filters';
$prefix-filter: '#{$prefix}-filter';

@include component($prefix) {
  @include until(desktop) {
    padding: 0;
  }

  @include element('toolbar') {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 0;
    background-color: get-var(color-white);
    padding: 0 get-var(padding, $prefix: 'container');
    @include typography(16px, 20px);

    @include from(desktop) {
      @include typography(14px, 18px);
      gap: rem(20px);
      padding: 0;
      align-items: flex-start;
      background-color: transparent;
      justify-content: space-between;
      // gap: rem(10px);
    }
  }

  @include element('filter') {
    display: get-var(display, none, $prefix: $prefix-filter);
    list-style: none;
    flex-wrap: wrap;
    align-items: stretch;
    flex-direction: column;
    gap: rem(10px) rem(20px);
    padding: 0;
    margin: 0;

    @include from(tablet) {
      flex-direction: row;
      gap: rem(10px);
    }

    @include between(tablet, desktop) {
      justify-content: space-between;
    }

    @include from(desktop) {
      @include set-local-vars(
        $prefix: $prefix-filter,
        $map: (
          display: flex,
        )
      );

      gap: rem(10px);
    }

    @include from(full) {
      gap: rem(10px) rem(20px);
    }

    @include element('item') {
      width: 100%;

      @include between(tablet, desktop) {
        width: calc(50% - 10px);
      }

      @include from(desktop) {
        width: auto;
      }
    }

    @include object('button') {
      width: 100%;

      @include from(desktop) {
        width: auto;
      }
    }
  }

  @include element('action') {
    position: relative;
    flex: 1 1 100%;
    text-align: center;

    & + #{current(&)} {
      &::before {
        display: block;
        content: '';
        inset: rem(10px) auto rem(10px) 0;
        position: absolute;
        transform: translateX(50%);
        width: 1px;
        background-color: get-var(color-black);
      }

      @include from(desktop) {
        &::before {
          content: none;
        }
      }
    }

    @include from(desktop) {
      flex: 0 1 auto;

      &:last-child {
        margin-left: auto;
      }
    }

    @include element('trigger') {
      width: 100%;
      margin: 0;
      border: 0;
      padding: rem(15px) 0;
      cursor: pointer;
      color: get-var(color-dark);
      line-height: inherit;
      font-size: 1em;
      display: inline-block;
      background-color: transparent;
      text-transform: uppercase;
      position: relative;
      font-family: get-var(family-main);
      @include transition(color, background-color);

      .nuxt-icon {
        display: inline-block;
        vertical-align: middle;
        color: get-var(color-yellow);

        svg {
          width: rem(7.84px);
          height: rem(4.48px);
        }
      }

      option {
        text-transform: none;
        color: get-var(color-dark);
        background-color: get-var(color-white);
      }

      @include modifier('intent') {
        pointer-events: none;

        @include from(desktop) {
          display: none;
        }
      }

      @include modifier('select') {
        appearance: none;

        @include until(desktop) {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
      }

      @include from(desktop) {
        width: auto;
        min-width: get-var(inner-width, rem(200px), $prefix: 'button');
        padding: rem(12px) rem(20px);
        border-radius: get-var(border-circle);
        border: 1px solid get-var(color-dark);
        text-transform: none;

        &:hover {
          color: get-var(color-dark);
          background-color: get-var(color-white);
        }

        @include is('active') {
          color: get-var(color-white);
          background-color: get-var(color-dark);
        }
      }
    }

    @include modifier('filter') {
      position: static;

      @include element('trigger') {
        @include from(desktop) {
          display: none;
        }
      }
    }
  }
}

@include component('#{$prefix}-overlay') {
  @include set-local-vars(
    $prefix: 'container',
    $map: (
      direction: column,
      align-items: stretch,
      gap: rem(20px),
      height: 100%,
      justify-content: flex-start,
    )
  );

  @include set-local-vars(
    $prefix: $prefix-filter,
    $map: (
      display: flex,
    )
  );

  padding: rem(20px) 0;

  @include element('header') {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: nowrap;

    u {
      cursor: pointer;
    }
  }

  @include element('footer') {
    margin-top: auto;

    @include object('button') {
      width: 100%;
    }
  }
}
</style>
