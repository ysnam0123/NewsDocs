import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSummaryStore = defineStore('summary', () => {
  const summaryMap = ref({})
  const isLoading = ref(false)
  const error = ref(null)

  const setSummary = (articleId, summary) => {
    summaryMap.value[articleId] = summary
  }

  const getSummary = (articleId) => {
    return summaryMap.value[articleId] || ''
  }

  const clearSummary = (articleId) => {
    delete summaryMap.value[articleId]
  }

  return {
    summaryMap,
    isLoading,
    error,
    setSummary,
    getSummary,
    clearSummary,
  }
})
