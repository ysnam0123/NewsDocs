<script setup>
import { ref } from 'vue'
import ScrapImg from './children/ScrapImg.vue'
// import { fetchNews } from '@/api/fetchNewsPractice'

const summaryHover = ref(false)
const hoverHandler = () => {
  summaryHover.value = true
}
const hoverOut = () => {
  summaryHover.value = false
}
const wantSummary = ref(false)
const summarizeHandler = () => {
  wantSummary.value = !wantSummary.value
}

const props = defineProps({
  newsObj: {
    type: Object,
    required: true,
  },
})

console.log('newsObj in NewsComponent8:', props.newsObj)
</script>
<template>
  <div v-if="newsObj" class="w-[383px] h-[470px] relative">
    <div class="w-[383px] h-[300px] cursor-pointer">
      <img
        :src="newsObj.image_url"
        class="w-full h-full object-cover rounded-[20px] space-y-0.5"
        @mouseover="hoverHandler"
      />
    </div>
    <div>
      <div class="px-[10px]">
        <div class="text-[var(--text-title)] text-[20px] font-bold mt-[12px] mb-[5px] line-clamp-2">
          {{ newsObj.title || '' }}
        </div>
        <div class="text-[16px] text-[#A8A8A8] mb-[5px] line-clamp-2">
          {{ newsObj.description || '' }}
        </div>
        <div class="flex gap-[8px] mb-[16px]">
          <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
            <img src="@/assets/img/Thumbs-up-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
            <p class="mt-[4px] text-[12px]">32</p>
          </div>
          <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
            <img src="@/assets/img/View-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
            <p class="mt-[4px] text-[12px]">32</p>
          </div>
        </div>
      </div>

      <!-- 클릭했을 때 나오는 창 -->
      <transition name="fade">
        <div
          v-if="wantSummary"
          class="w-full h-[470px] rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px] overflow-hidden"
        >
          <!-- 배경용 블러 -->
          <div class="absolute inset-0 bg-black/80 blur-xs rounded-[20px] z-30"></div>

          <!-- 요약된 내용 -->
          <div class="flex flex-col relative z-30 h-full">
            <h1 class="text-[20px] font-semibold text-white mb-[32px]">세줄 요약</h1>
            <ul class="text-white leading-8">
              <li>해일의 높이는 2,000m</li>
              <li>박은서, 기네스 기록 돒파</li>
              <li>박은서, 세계대회 우승</li>
            </ul>
            <button
              class="w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] mt-auto ml-auto flex items-center cursor-pointer hover:bg-[#D2D2D2]"
              @click="summarizeHandler"
            >
              원문보기
            </button>
          </div>
        </div>
      </transition>
    </div>
    <!-- 스크랩 이미지 -->
    <ScrapImg class="absolute right-[15px] top-[10px] z-25" />

    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute h-[300px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeHandler"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>
  </div>

  <div v-else class="animate-pulse">
    <div class="w-[383px] h-[300px] bg-gray-300 rounded-[20px]"></div>
    <div class="px-[10px] mt-[12px] space-y-2">
      <div class="h-[24px] bg-gray-300 rounded"></div>
      <div class="h-[20px] bg-gray-200 rounded w-5/6"></div>
      <div class="flex gap-[8px] mt-[10px]">
        <div class="w-[60px] h-[18px] bg-gray-200 rounded"></div>
        <div class="w-[60px] h-[18px] bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
