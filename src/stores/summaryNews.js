import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSummaryStore = defineStore('summary', () => {
  const summaryNews = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  return {
    summaryNews,
    isLoading,
    error,
  }
})
