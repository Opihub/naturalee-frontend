<template>
  <div class="o-pwa" :class="{ open: isPWAPopupOpen }">
    <a class="o-pwa__close" href="#" @click.prevent="togglePWAPopup(false)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </a>
    <div v-if="!PWAShowInfo" class="o-pwa__content">
      <div>
        <NuxtImg ref="parallaxElement" src="/android-icon-36x36.png" />
      </div>
      <div>
        <strong>Naturalee.it</strong>
        <p>Scarica l'app sul tuo dispositivo</p>
      </div>
    </div>
    <div v-else>
      <p>{{ IstruzioniPWA }}</p>
    </div>
    <a
      v-if="!PWAShowInfo"
      class="o-button o-button--green"
      href=""
      @click.prevent="promptPWA()"
      >Installa</a
    >
  </div>
</template>

<script setup>
const isPWAPopupOpen = ref(false)
const PWAShowInfo = ref(false)

const { $pwa } = useNuxtApp()

const deferredPrompt = ref(null)

// Component life-cycle hooks
onMounted(() => {
  setTimeout(() => {
    if (!$pwa.isPWAInstalled) {
      togglePWAPopup(true)
      // $pwa?.showInstallPrompt
    }
  }, 1000)

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
  })
})

const checkDevice = computed(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent)
  let browser = ''

  if (
    userAgent.indexOf('chrome') > -1 &&
    userAgent.indexOf('edge') === -1 &&
    userAgent.indexOf('opr') === -1
  ) {
    browser = 'chrome'
  } else if (userAgent.indexOf('firefox') > -1) {
    browser = 'firefox'
  } else if (
    userAgent.indexOf('safari') > -1 &&
    userAgent.indexOf('chrome') === -1
  ) {
    browser = 'safari'
  } else if (userAgent.indexOf('opr') > -1) {
    browser = 'opera'
  } else if (userAgent.indexOf('edg') > -1) {
    browser = 'edge'
  } else if (
    userAgent.indexOf('trident') > -1 ||
    userAgent.indexOf('msie') > -1
  ) {
    browser = 'ie'
  } else {
    browser = 'unknown'
  }

  return {
    isMobile: isMobile,
    browser: browser,
  }
})

const IstruzioniPWA = computed(() => {
  const deviceAndBrowser = checkDevice.value
  let message = ''

  if (deviceAndBrowser.isMobile) {
    switch (deviceAndBrowser.browser) {
      case 'chrome':
        message =
          'Per installare la PWA su Android, apri il menu (tre puntini in alto a destra) e seleziona "Aggiungi a schermata Home".'
        break
      case 'safari':
        message =
          'Per installare la PWA su iOS, apri il menu di condivisione (quadrato con una freccia verso l\'alto) e seleziona "Aggiungi a Home".'
        break
      default:
        message =
          'Per installare la PWA, cerca l\'opzione "Aggiungi a schermata Home" nel menu del browser.'
    }
  } else {
    switch (deviceAndBrowser.browser) {
      case 'chrome':
      case 'edge':
      case 'opera':
        message =
          'Per installare la PWA su desktop, clicca sull\'icona del + nella barra degli indirizzi o cerca "Installa" nel menu del browser.'
        break
      case 'firefox':
        message =
          "Firefox non supporta ancora l'installazione delle PWA su desktop in modo nativo."
        break
      case 'safari':
        message =
          "Safari non supporta ancora l'installazione delle PWA su desktop in modo nativo."
        break
      default:
        message =
          'Per installare la PWA, cerca l\'opzione "Installa" nel menu del browser.'
    }
  }

  return message
})

const togglePWAPopup = (status = null) => {
  isPWAPopupOpen.value = status !== null ? !!status : !isPWAPopupOpen.value
  if(!status){
    trackCustomEvent("close_pwa","banner_pwa");
  }
}

const promptPWA = () => {
  if ($pwa?.showInstallPrompt) {
    $pwa.install()
  } else {
    PWAShowInfo.value = true
  }
  trackCustomEvent("install_pwa","banner_pwa");
}
</script>

<style lang="scss">
@include object('pwa') {
  position: fixed;
  left: 50%;
  bottom: -100px;
  padding: 10px 20px;
  background-color: #fff;
  margin: 10px;
  max-width: 767px;
  width: calc(100% - 20px);
  z-index: get-var(z-pwa-banner);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 20px;
  transform: translateX(-50%);
  transition: bottom 0.3s ease;

  @include until(desktop) {
    margin: 0;
  }

  &.open {
    bottom: 0;
    @include until(desktop) {
      bottom: 110px;
    }
  }

  @include element('close') {
    min-width: 20px;
    color: #000;
  }

  @include element('content') {
    gap: 10px;
    flex: 1;
    display: flex;
    align-items: center;

    img {
      min-width: 30px;
    }
  }

  .o-button {
    @include until(tablet) {
      padding: var(--button-padding, 0.5rem 1rem);
    }
  }
}
</style>
