import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsStore = defineStore('news', () => {
  const newsList = ref([])

  const setNews = (news) => {
    newsList.value = news
  }

  const clearNews = () => {
    newsList.value = []
  }

  return { newsList, setNews, clearNews }
})
