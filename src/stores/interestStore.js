import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInterestStore = defineStore('interest', () => {
  const interest = ref([])
  const favoriteInterest = ref('')

  return { interest, favoriteInterest }
})
