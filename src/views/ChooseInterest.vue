<script setup>
import InterestCard from '@/components/interest/InterestCard.vue'
import { useInterestStore } from '@/stores/interestStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import politicsIcon from '@/assets/icons/politicsIcon.svg'
import sportsIcon from '@/assets/icons/sportsIcon.svg'
import entertainmentIcon from '@/assets/icons/entertainmentIcon.svg'
import cultureIcon from '@/assets/icons/cultureIcon.svg'
import worldIcon from '@/assets/icons/worldIcon.svg'
import societyIcon from '@/assets/icons/societyIcon.svg'
import economyIcon from '@/assets/icons/economyIcon.svg'
import etcIcon from '@/assets/icons/etcIcon.svg'
import { userAuthStore } from '@/stores/authStore'

const store = useInterestStore()
const auth = userAuthStore()
const name = ref(auth.user?.name || '사용자')
const interests = [
  { id: 'politics', label: '정치', icon: politicsIcon },
  { id: 'sports', label: '스포츠', icon: sportsIcon },
  { id: 'entertain', label: '연예', icon: entertainmentIcon },
  { id: 'culture', label: '문화', icon: cultureIcon },
  { id: 'abroad', label: '해외', icon: worldIcon },
  { id: 'society', label: '사회', icon: societyIcon },
  { id: 'economy', label: '경제', icon: economyIcon },
  { id: 'etc', label: '그 외', icon: etcIcon },
]

//관심사 추가
const addInterest = (item) => {
  // 관심사가 이미 선택되어있는지 확인
  const selectedInterest = store.interest.some((interest) => interest.id === item.id)
  // 이미 선택된거 -> 제거
  if (selectedInterest) {
    store.interest = store.interest.filter((interest) => interest.id !== item.id)
    //console.log(`${item.id}가 삭제됨!`)
  } else {
    //전역 상태 저장
    store.interest.push(item)
  }
  //console.log(store.interest)
}

const router = useRouter()
const chooseFavorite = () => {
  if (store.interest.length >= 3) {
    router.push('/interest/fav')
  }
}
const pageMounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    pageMounted.value = true
  }, 300)
})
</script>
<template>
  <transition name="fade">
    <div v-if="pageMounted" class="fixed inset-0 flex justify-center items-center">
      <div class="flex flex-col w-[500px] min-h-[400px]">
        <div class="flex gap-[50px] mb-[24px]">
          <h1 class="text-[18px] font-bold">
            {{ name }}님의 <span class="text-[#7537E3]">관심사</span>를 선택해주세요
            <span class="text-[#8b8b8b] text-[14px] font-medium">(최소 3개)</span>
          </h1>
        </div>
        <div>
          <div class="flex flex-col w-[500px] justify-center items-center gap-[12px]">
            <div class="flex flex-col gap-[12px]">
              <div class="flex gap-[12px]">
                <InterestCard
                  v-for="item in interests.slice(0, 4)"
                  :key="item.id"
                  :id="item.id"
                  :label="item.label"
                  :icon="item.icon"
                  :isSelected="store.interest.some((interest) => interest.id === item.id)"
                  @select="addInterest"
                />
              </div>
              <div class="flex gap-[12px]">
                <InterestCard
                  v-for="item in interests.slice(4)"
                  :key="item.id"
                  :id="item.id"
                  :label="item.label"
                  :icon="item.icon"
                  :isSelected="store.interest.some((interest) => interest.id === item.id)"
                  @select="addInterest"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          :disabled="store.interest.length < 3"
          :class="[
            'flex items-center select-none justify-center w-[140px] h-[50px] text-[16px] font-semibold mt-[40px] rounded-[8px] ml-auto cursor-pointer ease-in-out duration-200 hover:scale-[1.025]',
            store.interest.length >= 3 && store.interest.length <= 4
              ? 'bg-[#7537e3] text-white'
              : 'bg-[#f2f2f2] text-[#b3b3b3] cursor-not-allowed',
          ]"
          @click="chooseFavorite"
        >
          다음
        </button>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.clicked {
  background-color: #f5f2fa;
  border: 1px solid #7537e3;
}
.clicked:hover {
  background-color: #ede4fd;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
.fade-enter-active {
  animation: fadeIn 0.5s ease forwards;
}
.fade-leave-active {
  animation: fadeOut 0.3s ease forwards;
}
</style>
