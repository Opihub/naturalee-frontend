<template>
  <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,700&family=Mulish:wght@400;700;800&display=swap"
      rel="stylesheet"
    />
  </Head>

  <SVGDefinitions v-once />

  <NuxtLoadingIndicator />

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
import { useAccountStore } from '@/stores/account'
import { useNotificationsStore } from '@/stores/notifications'
import { StorageSerializers, useSessionStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// Constants

// Define (Props, Emits, Page Meta)

// Composables
const { t } = useI18n()
const config = useRuntimeConfig()
const notificationsStore = useNotificationsStore()
const accountStore = useAccountStore()

// Data
const { notifications } = storeToRefs(notificationsStore)

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

// Watcher

// Computed

// Methods

// Component life-cycle hooks
accountStore.$onAction(({ name }) => {
  console.debug(name)
  if (name !== 'logout' && name !== 'forceLogout') {
    return
  }

  notify({
    status: 'warning',
    notification: t(
      name === 'forceLogout' ? 'notifications.forcedLogout' : 'notifications.logout'
    ),
  })
})
</script>

<style lang="scss">
#notifications {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: get-var(z-notification);
  display: flex;
  flex-direction: column;
  align-items: center;

  @include from(desktop) {
    left: auto;
    right: 0;
    transform: none;
    align-items: flex-end;
  }

  @include set-local-vars(
    $prefix: 'notification',
    $map: (
      position: static,
    )
  );
}
</style>
