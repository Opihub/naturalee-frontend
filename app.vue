<template>
  <SVGDefinitions v-once />

  <NuxtLoadingIndicator />

  <Transition name="fade">
    <SiteLoader v-if="isLoading" />
  </Transition>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ClientOnly>
    <TransitionGroup id="notifications" name="fade" tag="div">
      <template v-if="notifications.length">
        <BaseNotification
          v-for="(notification, index) in notifications"
          :id="notification.id"
          :key="index"
          :status="notification.status"
          >{{ notification.message }}</BaseNotification
        >
      </template>
    </TransitionGroup>
  </ClientOnly>
</template>

<script setup>
// Imports
import { useCartStore } from '@/stores/cart'
import { useAccountStore } from '@/stores/account'
import { useNotificationsStore } from '@/stores/notifications'
import { useConfigurationStore } from '@/stores/configuration'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// Constants

// Define (Props, Emits, Page Meta)

// Composables
const { t } = useI18n()
const config = useRuntimeConfig()
const cartStore = useCartStore()
const notificationsStore = useNotificationsStore()
const accountStore = useAccountStore()
const configurationStore = useConfigurationStore()

// Data
const { notifications } = storeToRefs(notificationsStore)

const nuxtApp = useNuxtApp()
const isLoading = ref(true)

nuxtApp.hook('page:finish', () => {
  isLoading.value = false
})

/**
 * Carica la versione remota delle API
 */
if (process.client) {
  const alreadyLanded = useCookie('alreadyLanded', {
    default: () => false,
  })

  // Se l'utente atterra sul sito dopo aver chiuso tutte le sessioni senza il remember me,
  // allora pulisco i dati appena torna sul sito
  if (!alreadyLanded.value) {
    accountStore.validateAccount()
    alreadyLanded.value = true
  }
}

await configurationStore.load()

// Watcher

// Computed

// Methods

// Component life-cycle hooks
accountStore.$onAction(({ name }) => {
  if (name !== 'logout' && name !== 'forceLogout') {
    return
  }

  notify({
    status: 'warning',
    notification: t(
      name === 'forceLogout'
        ? 'notifications.forcedLogout'
        : 'notifications.logout'
    ),
  })
})

cartStore.$onAction(({ name, args, after, onError }) => {
  // Controlla se l'indice dell'argomento richiesto esiste e se è true
  // Se sì, allora non devo mostrare la notifica
  const isSilent = (index, args) => {
    return index !== false && args.length >= index + 1 && args[index]
  }

  after((result) => {
    let notification = false
    let silentArgument = false

    switch (name) {
      case 'clearCart':
        silentArgument = 0

        notification = {
          message: t('cart.cleared'),
          status: 'warning',
        }
        break
      case 'save':
        silentArgument = 1

        notification = {
          message: t('cart.updated'),
          status: 'success',
        }
        break
      default:
        break
    }
    console.debug(name)
    console.debug(result)
    console.info(args)

    if (!notification) {
      return
    }

    if (isSilent(silentArgument, args)) {
      return
    }

    notify(notification)
  })

  onError((error) => {
    console.warn(`Failed "${name}"\nError: ${error}.`)

    const notification = error.message
    const status = 'danger'
    const silentArgument = false

    switch (name) {
      default:
        break
    }
    console.debug(error.message, name)
    console.info(args)

    if (!notification) {
      return
    }

    if (isSilent(silentArgument, args)) {
      return
    }

    notify({
      message: notification,
      status,
    })
  })
})
</script>

<style lang="scss">
#notifications {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: get-var(z-notification);
  display: flex;
  flex-direction: column;
  align-items: center;

  @include set-local-vars(
    $prefix: 'notification',
    $map: (
      position: static,
    )
  );
}
</style>
