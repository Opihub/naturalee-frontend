<template>
  <SVGDefinitions v-once />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

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
