<template>
  <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,700&family=Mulish:wght@400;700;800&display=swap" rel="stylesheet">
  </Head>

  <SVGDefinitions v-once />

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
import { useNotificationsStore } from '@/stores/notifications'

// Constants

// Define (Props, Emits, Page Meta)

// Component life-cycle hooks

// Composables
const store = useNotificationsStore()

// Data
const { notifications } = storeToRefs(store)

// Watcher

// Computed

// Methods
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
