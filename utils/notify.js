import { useNotificationsStore } from '#imports'

export async function notify(notification, time = 3000) {
  const notifications = useNotificationsStore()

  const { notify } = notifications

  return notify(notification, time)
}
