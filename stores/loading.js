import { defineStore, acceptHMRUpdate, ref } from '#imports'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(true)

  const setLoading = (state) => {
    loading.value = state;
  }

  return { loading, setLoading }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useLoadingStore, import.meta.hot)
  )
}
