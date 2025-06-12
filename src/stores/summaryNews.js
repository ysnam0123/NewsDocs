import { fetchOpenAi } from '@/api/fetchOpenAi'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSummaryStore = defineStore('summary', () => {
  const summaryNews = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const summarize = async (description) => {
    if (isLoading.value) return
    try {
      isLoading.value = true
      error.value = null
      const result = await fetchOpenAi(description)
      summaryNews.value = result
    } catch (err) {
      console.error('요약에 실패했습니다', err)
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    summarize,
    summaryNews,
    isLoading,
    error,
  }
})
