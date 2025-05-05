<template>
  <Transition name="fade">
    <ModalContainer
      v-if="isBlackFridayModalOpen"
      :max-width="800"
      @close="toggleBlackFridayModal(false)"
      dark
    >
      <template #header>
        <BaseHeading tag="h6">🎉 Black Friday: Sconto del 10% su tutti gli ordini! 🎉</BaseHeading>
      </template>
      <p style="font-size:25px;">
        Approfitta del 10% di sconto valido solo nei giorni 29, 30 novembre e 1 dicembre. 🛒✨<br>Non lasciarti scappare l'occasione: lo sconto è limitato e termina presto! 🕔
      </p>
    </ModalContainer>
  </Transition>

  <Transition name="fade">
    <ModalContainer
      v-if="isSummerModalOpen"
      :max-width="500"
      @close="toggleSummerModal(false)"
    >
      <template #header>
        <BaseHeading tag="h5">Pausa di Ferragosto</BaseHeading>
      </template>
      <h3>
        Saremo chiusi dal 15 al 18 Agosto compresi.<br />Le consegne
        riprenderanno regolarmente da Lunedì 19.<br />Buone vacanze
      </h3>
    </ModalContainer>
  </Transition>

  <Transition name="fade">
    <ModalContainer
      v-if="isADVModalOpen"
      :max-width="800"
      :full-content="true"
      @close="toggleADVModal(false)"
    >
      <template #header>
        <BaseHeading tag="h5"
          >Il tuo regalo di benvenuto su Naturalee</BaseHeading
        >
      </template>
      <div class="naturalee-promo">
        <div class="naturalee-content">
          <p>
            <img
              src="https://api.naturalee.it/wp-content/uploads/2024/07/logo-naturalee-w.png"
            />
          </p>
          <p>Inserisci il codice</p>
          <p class="naturalee-codice-promo">BENVENUTO10</p>
          <p>
            nel carrello per ottenere un'esclusivo
            <span>sconto del 10% e la spedizione gratuita</span> sul tuo primo
            ordine.
          </p>
        </div>
        <div class="naturalee-image">
          <img
            src="https://api.naturalee.it/wp-content/uploads/2024/07/sfondo-popup.png"
          />
        </div>
      </div>
    </ModalContainer>
  </Transition>

  <LayoutWrapper ref="layoutElement">
    <HeaderTopBar
      ref="topBarElement"
      :socials-menu="menu.socials"
      :primary-menu="menu.primary"
      :banners="layout.topbar"
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

    <SiteFooter
      ref="footerElement"
      :class="{ 'u-mt-auto': !overrideLastElement }"
    >
      <FooterNavigation :socials-menu="menu.socials" :menu="menu.footer" />

      <FooterCopyrights
        :copyright="layout.copyright"
        :privacy-menu="menu.privacy"
      />
    </SiteFooter>

    <CategoriesMenu
      v-if="menu.categories && menu.categories"
      ref="categoriesMenuElement"
      :class="`${CSS_NAME}__categories`"
      :categories="menu.categories"
    />

    <ClientOnly>
      <Teleport to="body">
        <Transition name="fade">
          <PostcodeModal
            v-show="isPostcodeModalOpen"
            @close="togglePostcodeModal(false)"
          />
        </Transition>
      </Teleport>
    </ClientOnly>
  </LayoutWrapper>
</template>

<script setup>
// Imports
import { useElementBounding, useScrollLock } from '@vueuse/core'

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
  setFooterGap()
  setHeaderOffset()

  window.addEventListener('resize', setBottomGap)
  window.addEventListener('resize', setHeaderGap)
  window.addEventListener('resize', setFooterGap)
  window.addEventListener('resize', setHeaderOffset)
  window.addEventListener('scroll', setHeaderOffset)

  setTimeout(() => {
    toggleADVModal(isADV.value)
    //toggleSummerModal(cookieSummerPopup.value=="closed"?false:true)
    temporizedPopup("11/25/2024","12/02/2024",()=>{
      toggleBlackFridayModal(cookieBlackFridayPopup.value=="closed"?false:true)
    })
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', setBottomGap)
  window.removeEventListener('resize', setHeaderGap)
  window.removeEventListener('resize', setFooterGap)
  window.removeEventListener('resize', setHeaderOffset)
  window.removeEventListener('scroll', setHeaderOffset)
})

// Composables
const { menu, layout } = storeToRefs(configurationStore)
const route = useRoute()

// Data
const layoutElement = ref(null)
const headerElement = ref(null)
const topBarElement = ref(null)
const footerElement = ref(null)
const categoriesMenuElement = ref(null)
const isPostcodeModalOpen = ref(false)
const isMobileMenuOpen = ref(false)
const { top } = useElementBounding(headerElement)
const document = ref(globalThis.window?.document.body || null)
const isLocked = useScrollLock(document)

const cookieSummerPopup = useCookie('summer-popup')
const cookieBlackFridayPopup = useCookie('BlackFriday-popup')
const isADVModalOpen = ref(false)
const isSummerModalOpen = ref(false)
const isBlackFridayModalOpen = ref(false)

// Computed
const isADV = computed(() => {
  let adv = false

  if (
    (route.query.utm_source == 'google' && route.query.utm_medium == 'cpc') ||
    route.query.gad_source == 1 ||
    route.query.gclid != undefined
  ) {
    adv = true
    toggleADVModal(true)
  }

  return adv
})

//Watcher

// Methods
const setBottomGap = () => {
  if (!layoutElement.value || !categoriesMenuElement.value) {
    return
  }

  getElement(layoutElement).style.setProperty(
    '--layout-bottom-gap',
    `${categoriesMenuElement.value.$el.offsetHeight}px`
  )
}

const setHeaderGap = () => {
  if (!layoutElement.value || !headerElement.value) {
    return
  }

  getElement(layoutElement).style.setProperty(
    '--layout-header-height',
    `${headerElement.value.$el.offsetHeight}px`
  )
}

const setFooterGap = () => {
  if (!layoutElement.value || !footerElement.value) {
    return
  }

  getElement(layoutElement).style.setProperty(
    '--layout-footer-height',
    `${footerElement.value.$el.offsetHeight}px`
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

const toggleADVModal = (status = null) => {
  isADVModalOpen.value = status !== null ? !!status : !isADVModalOpen.value
}

const toggleSummerModal = (status = null) => {
  if (status === false) cookieSummerPopup.value = 'closed'

  isSummerModalOpen.value =
    status !== null ? !!status : !isSummerModalOpen.value
}

const toggleBlackFridayModal = (status = null) => {
  if (status === false) cookieBlackFridayPopup.value = 'closed'

  isBlackFridayModalOpen.value =
    status !== null ? !!status : !isBlackFridayModalOpen.value
}

const temporizedPopup = (dataInizio, dataFine, callback) => {
  const now = new Date()

  const start = new Date(dataInizio)
  const end = new Date(dataFine)

  if (now < start || now > end)
    return false;

  callback();
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

.naturalee-promo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--color-yellow);
  overflow: hidden;
  width: 100%;
}
.naturalee-content {
  padding: 20px;
}
.naturalee-content .naturalee-codice-promo {
  color: var(--color-green);
  font-weight: var(--weight-bold);
  font-size: 3rem;
}
.naturalee-content p {
  margin-bottom: 10px;
  font-size: 17px;
}
.naturalee-content p img {
  margin-bottom: 20px;
}
.naturalee-content p span {
  color: var(--color-green);
  font-weight: var(--weight-bold);
}
.naturalee-image {
  width: 100%;
  position: relative;
}
.naturalee-image img {
  width: 80%;
  height: auto;
  float: right;
}
@media (min-width: 600px) {
  .naturalee-promo {
    flex-direction: row;
    text-align: left;
  }
  .naturalee-content p img {
    width: 60%;
    margin-bottom: 40px;
  }
  .naturalee-content {
    flex: 1;
  }
  .naturalee-image {
    flex: 1;
    max-width: 60%;
  }
  .naturalee-image img {
    width: 100%;
  }
}
</style>
