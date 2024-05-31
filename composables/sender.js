import { ref } from '#imports'

export function useSender(emit = null) {
  const sent = ref(false)
  const sending = ref(false)

  const send = async (callback) => {
    if (emit) {
      emit('api:start')
    }

    sending.value = true
    sent.value = false

    const { data: response } = await callback().catch((err) => {
      console.warn(err)

      return false
    })

    sending.value = false
    sent.value = response !== false

    if (emit) {
      emit('api:end')
    }

    return response
  }

  return {
    sent,
    sending,
    send,
  }
}
