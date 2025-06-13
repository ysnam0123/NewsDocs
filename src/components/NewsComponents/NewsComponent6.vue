<script setup>
import { ref } from 'vue'
import ScrapImg from './children/ScrapImg.vue'
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'

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
  news: Object,
  newsSaveHandler: Function,
  newsDetail: Function,
})
</script>
<template>
  <div v-if="props.news" class="flex w-[600px] h-[184px] relative" @mouseover="hoverHandler">
    <div class="w-[600px] h-[184px]">
      <img :src="news.image_url" alt="dmz" class="rounded-[16px] w-full h-full object-cover" />
    </div>
    <div
      v-show="!wantSummary"
      class="flex items-center justify-between px-[20px] pt-[20px] absolute h-[83px] w-[600px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
    >
      <p class="font-bold w-[400px] text-[18px] text-[white]">
        {{ props.news.title }}
      </p>
      <!-- 좋아요 박스 -->
      <div class="flex gap-2 text-[#A8A8A8]">
        <div class="flex gap-1">
          <ThumbsUp class="w-4" />
          <span>23</span>
        </div>
        <div class="flex gap-1">
          <Eye class="w-4" />
          <span>300</span>
        </div>
      </div>
    </div>
    <ScrapImg class="absolute right-[15px] top-[10px] z-15" />
    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute w-[600px] h-[184px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeHandler"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>
    <!-- 클릭했을 때 나오는 창 -->
    <transition name="fade">
      <div
        v-if="wantSummary"
        class="w-[600px] h-[184px] rounded-[20px] absolute top-0 overflow-hidden"
      >
        <!-- 배경용 블러 -->
        <div class="absolute inset-0 bg-black/80 blur-xs rounded-[20px] z-30"></div>

        <!-- 요약된 내용 -->
        <div class="flex flex-row relative z-30 h-full px-[28px] py-[25px]">
          <div>
            <h1 class="text-[20px] font-semibold text-white mb-[16px]">세줄 요약</h1>
            <div class="ml-[16px]">
              <ul class="text-white leading-8 list-disc">
                <li>해일의 높이는 2,000m</li>
                <li>박은서, 기네스 기록 돒파</li>
                <li>박은서, 세계대회 우승</li>
              </ul>
            </div>
          </div>
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
