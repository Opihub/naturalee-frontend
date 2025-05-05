import { defineStore, acceptHMRUpdate, ref, useI18n } from '#imports'
import { useTimeoutFn } from '@vueuse/core'

export const useNotificationsStore = defineStore('notifications', () => {
  const { t } = useI18n({ useScope: 'global' })

  const notifications = ref([])

  const notify = async (notification, time = 3000) => {
    const id = Date.now().toString()
    let formattedNotification;

    let { message } = notification

    // Passa tutti i parametri di message per tradurli
    if (Array.isArray(message)) {
      message = t(...message)
    }

    formattedNotification = {
      ...notification,
      id,
      message,
    }

    notifications.value.push(formattedNotification)

    if (time > 0) {
      await removeNotification(formattedNotification.id, time)
    }

    return formattedNotification.id
  }

  const removeNotification = async (id, time = 0) => {
    const callback = () => {
      notifications.value = notifications.value.filter((item) => item.id !== id)
    }

    if (time <= 0) {
      callback()

      return
    }

    const { start } = useTimeoutFn(callback, time)

    await start()
  }

  const clearAll = () => {
    notifications.value = []
  }

  return { notifications, notify, clearAll, removeNotification }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useNotificationsStore, import.meta.hot)
  )
}
