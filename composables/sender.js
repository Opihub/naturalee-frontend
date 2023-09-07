import { ref } from '#imports'

export function useSender(emit) {
  const sent = ref(false)
  const sending = ref(false)

  const send = async (callback) => {
    emit('api:start')

    sending.value = true
    sent.value = false

    const response = await callback()

    sending.value = false
    sent.value = true

    emit('api:end')

    return response
  }

  return {
    sent,
    sending,
    send,
  }
}
