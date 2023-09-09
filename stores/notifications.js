import { defineStore, acceptHMRUpdate, ref } from '#imports'
import { useTimeoutFn, promiseTimeout, useTimeout } from '@vueuse/core'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  const notify = async (notification, time = 3000) => {
    const id = Date.now().toString()

    notification = {
      id,
      ...notification,
    }

    notifications.value.push(notification)

    console.debug(notification, time)

    if (time > 0) {
      await removeNotification(notification, time)
    }
  }

  const removeNotification = async (notification, time = 3000) => {
    const { start } = useTimeoutFn(() => {
      console.debug(notification)

      notifications.value = notifications.value.filter(
        (item) => item.id !== notification.id
      )
      console.debug(notifications.value)
    }, time)

    start()

    // const ready = useTimeout(time)
    // await promiseTimeout(time)

    // console.debug(notification)

    // notifications.value = notifications.value.filter(
    //   (item) => item !== notification
    // )
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
