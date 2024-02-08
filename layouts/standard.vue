<template>
  <LayoutWrapper ref="layoutElement">
    <HeaderTopBar
      ref="topBarElement"
      :socials-menu="menu.socials"
      :primary-menu="menu.primary"
      :banners="menu.topbar"
    />

    <HeaderMain
      ref="headerElement"
      :categories="menu.categories"
      :profile-menu="menu.profile"
      @menu-mobile:toggle="updateMobileMenuStatus"
    />

    <ClientOnly>
      <Transition name="fade">
        <HeaderMainMobile
          v-show="isMobileMenuOpen"
          :socials-menu="menu.socials"
          :primary-menu="menu.primary"
          :profile-menu="menu.profile"
        />
      </Transition>
    </ClientOnly>

    <slot name="before" />

    <main id="page">
      <slot />
    </main>

    <slot name="after" />

    <SiteFooter :class="{ 'u-mt-auto': !overrideLastElement }">
      <FooterNavigation :socials-menu="menu.socials" :menu="menu.footer" />

      <FooterCopyrights
        :copyright="layout.copyrights"
        :privacy-menu="menu.privacy"
      />
    </SiteFooter>

    <ClientOnly>
      <CategoriesMenu
        v-if="menu.categories && menu.categories"
        ref="categoriesMenuElement"
        :class="`${CSS_NAME}__categories`"
        :categories="menu.categories"
      />
    </ClientOnly>

    <Teleport to="body">
      <PostcodeModal
        v-show="isPostcodeModalOpen"
        @close="togglePostcodeModal(false)"
      />
    </Teleport>
  </LayoutWrapper>
</template>

<script setup>
// Imports
import { useElementBounding, useScrollLock } from '@vueuse/core'
import { useConfigurationStore } from '@/stores/configuration'

// Constants
const CSS_NAME = 'o-layout'
const configurationStore = useConfigurationStore()

// Define (Props, Emits, Page Meta)
defineProps({
  overrideLastElement: {
    type: Boolean,
    default: false,
  },
})

// Component life-cycle hooks
onMounted(() => {
  setBottomGap()
  setHeaderGap()
  setHeaderOffset()

  window.addEventListener('resize', setBottomGap)
  window.addEventListener('resize', setHeaderGap)
  window.addEventListener('resize', setHeaderOffset)
  window.addEventListener('scroll', setHeaderOffset)
})

onUnmounted(() => {
  window.removeEventListener('resize', setBottomGap)
  window.removeEventListener('resize', setHeaderGap)
  window.removeEventListener('resize', setHeaderOffset)
  window.removeEventListener('scroll', setHeaderOffset)
})

// Composables
const { menu, layout } = storeToRefs(configurationStore)

// Data
const layoutElement = ref(null)
const headerElement = ref(null)
const topBarElement = ref(null)
const categoriesMenuElement = ref(null)
const isPostcodeModalOpen = ref(false)
const isMobileMenuOpen = ref(false)
const { top } = useElementBounding(headerElement)
const document = ref(globalThis.window?.document.body || null)
const isLocked = useScrollLock(document)

//Watcher

// Computed

// Methods
const setBottomGap = () => {
  if (!layoutElement.value || !categoriesMenuElement.value) {
    return
  }

  getElement(layoutElement).style.setProperty(
    '--layout-bottom-gap',
    `${categoriesMenuElement.value.$el.clientHeight}px`
  )
}

const setHeaderGap = () => {
  if (!layoutElement.value || !headerElement.value) {
    return
  }

  getElement(layoutElement).style.setProperty(
    '--layout-header-height',
    `${headerElement.value.$el.clientHeight}px`
  )
}

const setHeaderOffset = () => {
  if (!layoutElement.value || !headerElement.value) {
    return
  }
  getElement(layoutElement).style.setProperty(
    '--layout-header-offset',
    `${top.value}px`
  )
}

const togglePostcodeModal = (status = null) => {
  isPostcodeModalOpen.value =
    status !== null ? !!status : !isPostcodeModalOpen.value
}

const updateMobileMenuStatus = (status) => {
  isMobileMenuOpen.value = status
  setHeaderOffset()

  isLocked.value = status
}

// Provide
provide('postcodeModal', {
  isPostcodeModalOpen,
  togglePostcodeModal,
})
</script>

<style lang="scss">
$prefix: 'layout';
@include object($prefix) {
  @include element('categories') {
    position: fixed;
    inset: auto 0 0;
    z-index: get-var(z-categories);
    background-color: get-var(color-white);

    justify-content: space-around;
    @include set-local-vars(
      $prefix: 'menu',
      $map: (
        gap: 0,
        font-size: rem(13px),
        line-height: rem(16px),
      )
    );

    @include set-local-vars(
      $prefix: 'menu-item',
      $map: (
        padding: rem(18px) 0,
      )
    );

    @include from(desktop) {
      display: none;
    }
  }
}
</style>
