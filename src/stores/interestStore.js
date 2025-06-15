import { defineStore } from 'pinia'
import { ref } from 'vue'
import politicsIcon from '@/assets/icons/politicsIcon.svg'
import sportsIcon from '@/assets/icons/sportsIcon.svg'
import entertainmentIcon from '@/assets/icons/entertainmentIcon.svg'
import cultureIcon from '@/assets/icons/cultureIcon.svg'
import worldIcon from '@/assets/icons/worldIcon.svg'
import societyIcon from '@/assets/icons/societyIcon.svg'
import economyIcon from '@/assets/icons/economyIcon.svg'
import etcIcon from '@/assets/icons/etcIcon.svg'

export const useInterestStore = defineStore('interest', () => {
  const interestList = ref([
    { id: 'politics', label: '정치', icon: politicsIcon },
    { id: 'economy', label: '경제', icon: economyIcon },
    { id: 'society', label: '사회', icon: societyIcon },
    { id: 'culture', label: '문화', icon: cultureIcon },
    { id: 'sports', label: '스포츠', icon: sportsIcon },
    { id: 'entertainment', label: '연예', icon: entertainmentIcon },
    { id: 'world', label: '해외', icon: worldIcon },
    { id: 'etc', label: '그 외', icon: etcIcon },
  ])
  const interest = ref([])
  const favoriteInterest = ref('')

  return { interest, favoriteInterest, interestList }
})
