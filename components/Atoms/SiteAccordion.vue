<template>
  <details
    ref="accordionElement"
    :class="{ [CSS_NAME]: true, 'is-open': isOpen }"
    :open="isOpen"
  >
    <summary
      ref="summaryElement"
      :class="`${CSS_NAME}__header`"
      @click.prevent="toggleAccordion"
    >
      <span>{{ title }}</span>
      <span :class="`${CSS_NAME}__header__status`"></span>
    </summary>

    <div ref="contentElement" :class="`${CSS_NAME}__body`">
      <slot />
    </div>
  </details>
</template>

<script setup>
/**
 * Single accordion with animations
 *
 * @link https://codepen.io/Mamboleoo/pen/QWEpLqm
 */

// Imports

// Constants
const CSS_NAME = 'o-accordion'

// Props & Emits
defineProps({
  title: {
    type: String,
    required: true,
  },
})

// Component life-cycle hooks

// Data
const isOpen = ref(false)
const isClosing = ref(false)
const isExpanding = ref(false)
const animation = ref(null)

const accordionElement = ref(null)
const summaryElement = ref(null)
const contentElement = ref(null)

// Watcher

// Computed

// Methods
const toggleAccordion = () => {
  // Add an overflow on the <details> to avoid content overflowing
  accordionElement.value.style.overflow = 'hidden'

  // Check if the element is being closed or is already closed
  if (isClosing.value || !isOpen.value) {
    open()
    // Check if the element is being openned or is already open
  } else if (isExpanding.value || isOpen.value) {
    shrink()
  }
}

const open = () => {
  // Apply a fixed height on the element
  accordionElement.value.style.height = `${accordionElement.value.offsetHeight}px`

  // Force the [open] attribute on the details element
  isOpen.value = true

  // Wait for the next frame to call the expand function
  window.requestAnimationFrame(() => expand())
}

const expand = () => {
  // Set the element as "being expanding"
  isExpanding.value = true

  // Get the current fixed height of the element
  const startHeight = `${accordionElement.value.offsetHeight}px`

  // Calculate the open height of the element (summary height + content height)
  const endHeight = `${
    summaryElement.value.offsetHeight + contentElement.value.offsetHeight
  }px`

  // If there is already an animation running
  if (animation.value) {
    // Cancel the current animation
    animation.value.cancel()
  }

  // Start a WAAPI animation
  animation.value = accordionElement.value.animate(
    {
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight],
    },
    {
      duration: 400,
      easing: 'ease-out',
    }
  )

  // When the animation is complete, call onAnimationFinish()
  animation.value.onfinish = () => onAnimationFinish(true)

  // If the animation is cancelled, isExpanding variable is set to false
  animation.value.oncancel = () => (isExpanding.value = false)
}

const shrink = () => {
  // Set the element as "being closed"
  isClosing.value = true

  // Store the current height of the element
  const startHeight = `${accordionElement.value.offsetHeight}px`

  // Calculate the height of the summary
  const endHeight = `${summaryElement.value.offsetHeight}px`

  // If there is already an animation running
  if (animation.value) {
    // Cancel the current animation
    animation.value.cancel()
  }

  // Start a WAAPI animation
  animation.value = accordionElement.value.animate(
    {
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight],
    },
    {
      duration: 400,
      easing: 'ease-out',
    }
  )

  // When the animation is complete, call onAnimationFinish()
  animation.value.onfinish = () => onAnimationFinish(false)

  // If the animation is cancelled, isClosing variable is set to false
  animation.value.oncancel = () => (isClosing.value = false)
}

const onAnimationFinish = (open) => {
  // Set the open attribute based on the parameter
  isOpen.value = open

  // Clear the stored animation
  animation.value = null

  // Reset isClosing & isExpanding
  isClosing.value = false
  isExpanding.value = false

  // Remove the overflow hidden and the fixed height
  accordionElement.value.style.height = ''
  accordionElement.value.style.overflow = ''
}
</script>

<style lang="scss">
$prefix: 'accordion';
@include object($prefix) {
  @include set-vars(
    $prefix: $prefix,
    $map: (
      border-opacity: 1,
      status-size: rem(16px),
    )
  );

  @include element('header') {
    list-style-type: none;
    user-select: none;
    font-weight: get-var(weight-bold);
    @include typography(20px, 35px);
    padding: rem(20px) 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    gap: rem(10px);
    cursor: pointer;
    border-bottom: 1px solid
      rgba(get-var(rgb-dark), get-var(border-opacity, $prefix: $prefix));
    @include transition(border-color);

    &::webkit-details-marker {
      display: none;
    }

    @include element('status') {
      pointer-events: none;
      position: relative;
      flex: 0 0 auto;
      margin-right: rem(20px);
      width: get-var(status-size, $prefix: $prefix);
      height: get-var(status-size, $prefix: $prefix);

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        background-color: get-var(color-yellow);
        transform: translateY(-50%)
          rotate(
            calc(
              #{get-var(status-rotate, 0deg, $prefix: $prefix)} * #{get-var(
                  status-active,
                  1,
                  $prefix: $prefix
                )}
            )
          );
      }

      &::after {
        @include set-local-vars(
          $prefix: $prefix,
          $map: (
            status-rotate: -90deg,
          )
        );

        @include transition(transform);
      }
    }
  }

  @include element('body') {
    padding: rem(20px) 0;
  }

  @include is('open') {
    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        border-opacity: 0.4,
      )
    );

    @include set-local-vars(
      $prefix: $prefix,
      $map: (
        status-active: 0,
      )
    );
  }
}
</style>
