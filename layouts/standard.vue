<template>
  <ModalContainer
    v-if="isADVModalOpen"
    :max-width="800"
    :full-content="true"
    @close="toggleADVModal(false)"
  >
    <template #header>
      <BaseHeading tag="h5">Il tuo regalo di benvenuto su Naturalee</BaseHeading>
    </template>
    <div class="naturalee-promo"><div class="naturalee-content"><p><img src="https://api.naturalee.it/wp-content/uploads/2024/07/logo-naturalee-w.png"></p><p>Inserisci il codice</p><p class="naturalee-codice-promo">BENVENUTO10</p><p>nel carrello per ottenere un'esclusivo <span>sconto del 10% e la spedizione gratuita</span> sul tuo primo ordine.</p></div><div class="naturalee-image"><img src="https://api.naturalee.it/wp-content/uploads/2024/07/sfondo-popup.png"></div></div>
  </ModalContainer>
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

    <SiteFooter :class="{ 'u-mt-auto': !overrideLastElement }">
      <FooterNavigation :socials-menu="menu.socials" :menu="menu.footer" />

      <FooterCopyrights
        :copyright="layout.copyright"
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

  <ClientOnly>
    <div class="o-pwa" :class="{'open':isPWAPopupOpen}">
      <a class="o-pwa__close" href="#" @click.prevent="togglePWAPopup(false)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </a>
      <div v-if="!PWAShowInfo" class="o-pwa__content">
        <div>
          <NuxtImg
            ref="parallaxElement"
            src="/android-icon-36x36.png"
          />
        </div>
        <div>
          <strong>Naturalee.it</strong>
          <p>Scarica l'app sul tuo dispositivo</p>
        </div>
      </div>
      <div v-else>
        <p>{{ IstruzioniPWA }}</p>
      </div>
      <a v-if="!PWAShowInfo" class="o-button o-button--green" href="" @click.prevent="promptPWA()">Installa</a>
    </div>
  </ClientOnly>
</template>

<script setup>
// Imports
import { useElementBounding, useScrollLock } from '@vueuse/core'
import { useConfigurationStore } from '@/stores/configuration'

const { $pwa } = useNuxtApp()

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

  setTimeout(()=>{
    toggleADVModal(isADV.value)
    if(!$pwa.isPWAInstalled)
      togglePWAPopup(true) //$pwa?.showInstallPrompt
  },1000)

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log(e)
    deferredPrompt.value = e;
  });
})

onUnmounted(() => {
  window.removeEventListener('resize', setBottomGap)
  window.removeEventListener('resize', setHeaderGap)
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
const categoriesMenuElement = ref(null)
const isPostcodeModalOpen = ref(false)
const isMobileMenuOpen = ref(false)
const { top } = useElementBounding(headerElement)
const document = ref(globalThis.window?.document.body || null)
const isLocked = useScrollLock(document)


const isADVModalOpen = ref(false)
const isPWAPopupOpen = ref(false)
const PWAShowInfo = ref(false);

const deferredPrompt = ref(null);


// Computed
const isADV = computed(() => {
  let adv = false;

  if ((route.query.utm_source == "google" && route.query.utm_medium == "cpc")||route.query.gad_source == 1||route.query.gclid != undefined) {
    adv = true;
    toggleADVModal(true);
  }

  return adv
})

const checkDevice = computed(()=>{
  var userAgent = navigator.userAgent.toLowerCase();
  var isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
  var browser = '';

  if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edge') === -1 && userAgent.indexOf('opr') === -1) {
      browser = 'chrome';
  } else if (userAgent.indexOf('firefox') > -1) {
      browser = 'firefox';
  } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) {
      browser = 'safari';
  } else if (userAgent.indexOf('opr') > -1) {
      browser = 'opera';
  } else if (userAgent.indexOf('edg') > -1) {
      browser = 'edge';
  } else if (userAgent.indexOf('trident') > -1 || userAgent.indexOf('msie') > -1) {
      browser = 'ie';
  } else {
      browser = 'unknown';
  }

  return {
      isMobile: isMobile,
      browser: browser
  };
});

const IstruzioniPWA = computed(()=>{
  var deviceAndBrowser = checkDevice.value;
  var message = '';

  if (deviceAndBrowser.isMobile) {
    switch (deviceAndBrowser.browser) {
      case 'chrome':
        message = 'Per installare la PWA su Android, apri il menu (tre puntini in alto a destra) e seleziona "Aggiungi a schermata Home".';
        break;
      case 'safari':
        message = 'Per installare la PWA su iOS, apri il menu di condivisione (quadrato con una freccia verso l\'alto) e seleziona "Aggiungi a Home".';
        break;
      default:
        message = 'Per installare la PWA, cerca l\'opzione "Aggiungi a schermata Home" nel menu del browser.';
    }
  } else {
    switch (deviceAndBrowser.browser) {
      case 'chrome':
      case 'edge':
      case 'opera':
        message = 'Per installare la PWA su desktop, clicca sull\'icona del + nella barra degli indirizzi o cerca "Installa" nel menu del browser.';
        break;
      case 'firefox':
        message = 'Firefox non supporta ancora l\'installazione delle PWA su desktop in modo nativo.';
        break;
      case 'safari':
        message = 'Safari non supporta ancora l\'installazione delle PWA su desktop in modo nativo.';
        break;
      default:
        message = 'Per installare la PWA, cerca l\'opzione "Installa" nel menu del browser.';
    }
  }

  return message;
})

//Watcher

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

const toggleADVModal = (status = null) => {
  isADVModalOpen.value =
    status !== null ? !!status : !isADVModalOpen.value
}

const togglePWAPopup = (status = null) => {
  isPWAPopupOpen.value =
    status !== null ? !!status : !isPWAPopupOpen.value
}

const promptPWA = () => {
  if ($pwa?.showInstallPrompt) {
    $pwa.install();
  }else{
    PWAShowInfo.value= true;
  }
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

.naturalee-promo{display:flex;flex-direction:column;align-items:center;text-align:center;background-color:var(--color-yellow);overflow:hidden;width:100%}.naturalee-content{padding:20px}.naturalee-content .naturalee-codice-promo{color:var(--color-green);font-weight:var(--weight-bold);font-size:3rem}.naturalee-content p{margin-bottom:10px;font-size: 17px;}.naturalee-content p img{margin-bottom:20px}.naturalee-content p span{color:var(--color-green);font-weight:var(--weight-bold)}.naturalee-image{width:100%;position:relative}.naturalee-image img{width:80%;height:auto;float:right}@media (min-width:600px){.naturalee-promo{flex-direction:row;text-align:left}.naturalee-content p img{width:60%;margin-bottom:40px}.naturalee-content{flex:1}.naturalee-image{flex:1;max-width:60%}.naturalee-image img{width:100%}}

@include object('pwa'){
  position: fixed;
  left: 50%;
  bottom: -100px;
  padding: 10px 20px;
  background-color: #fff;
  margin: 10px;
  max-width: 767px;
  width: calc(100% - 20px);
  z-index: 999;
  box-shadow: 0 10px 10px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 20px;
  transform: translateX(-50%);
  transition: bottom .3s ease;

  @include until(desktop) {
      margin: 0;
  }

  &.open {
    bottom: 0;
    @include until(desktop) {
      bottom: 110px;
    }
  }

  @include element('close'){
    min-width: 20px;
    color: #000;
  }

  @include element('content'){
    gap: 10px;
    flex: 1;
    display: flex;
    align-items: center;

    img {
      min-width: 30px;
    }
  }

  .o-button {
    @include until(tablet){
      padding: var(--button-padding, 0.5rem 1rem);
    }
  }
}
</style>
