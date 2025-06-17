import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => ({
    selectedNews: {
      title: '',
      description: '',
      image_url: '',
      pubData: '',
      source_name: '',
      keywords: [], // 빈 배열로 초기화
      article_id: '',
      link: '',
      view_count: 0,
    },
  }),
  // ...actions, getters 등
})
