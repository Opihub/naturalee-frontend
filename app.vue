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
import { StorageSerializers, useSessionStorage } from '@vueuse/core'
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
  const { data: cache } = await useFetch('/v1/auth/x-cache', {
    baseURL: config?.public?.endpoint,
  })

  /**
   * Carica la lista di tutte le API salvate
   */
  const apiKeys = useSessionStorage('apiKeys', [], {
    serializer: StorageSerializers.object,
  })
  /**
   * Carica la versione locale delle API
   */
  const cacheVersion = useSessionStorage('cacheVersion', null)

  /**
   * Confronta le due versioni delle API
   * se differenti, cancella tutte le API registrate, pulisce la lista
   * ed aggiorna la versione corrente delle API
   */
  if (cache.value !== cacheVersion.value) {
    apiKeys.value.forEach((key) => {
      window.sessionStorage.removeItem(key)
    })

    window.sessionStorage.removeItem('apiKeys')
    cacheVersion.value = cache.value
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
  after((result) => {
    let notification = false

    switch (name) {
      case 'clearCart':
        notification = {
          message: t('cart.cleared'),
          status: 'warning',
        }
        break;
      default:
        break;
    }
    console.debug(result, name)
    console.info(args)

    if (notification) {
      notify(notification)
    }
  })

  onError((error) => {
    console.warn(
      `Failed "${name}"\nError: ${error}.`
    )

    const notification = error.message
    const status = 'danger'

    switch (name) {
      default:
        break;
    }
    console.debug(error.message, name)
    console.info(args)

    if (notification) {
      notify({
        message: notification,
        status
      })
    }
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
