import { defineStore, acceptHMRUpdate, ref } from '#imports'
import { useTimeoutFn } from '@vueuse/core'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  const notify = async (notification, time = 3000) => {
    const id = Date.now().toString()

    notification = {
      id,
      ...notification,
    }

    notifications.value.push(notification)

    if (time > 0) {
      await removeNotification(notification.id, time)
    }

    return notification.id
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
