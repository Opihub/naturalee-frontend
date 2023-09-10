import { useNotificationsStore } from '@/stores/notifications'

export async function notify(notification, time = 3000) {
  const notifications = useNotificationsStore()

  const { notify } = notifications

  return notify(notification, time)
}
