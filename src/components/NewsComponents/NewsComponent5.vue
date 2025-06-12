<script setup>
import { ref } from 'vue'
import ScrapNotOnImg from './children/ScrapNotOnImg.vue'

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
</script>
<template>
  <div class="relative flex gap-[22px] w-[600px] h-[184px] rounded-[16px]">
    <div class="w-[200px] h-[184px]">
      <img
        :src="newsObj.image_url"
        class="w-full h-full object-cover rounded-l-[16px]"
        @mouseover="hoverHandler"
      />
    </div>

    <div class="flex flex-col gap-[10px] py-[18px] h-[184px]">
      <div class="font-bold text-[18px] w-[272px] text-[var(--text-title)]">
        {{ newsObj.title }}
      </div>
      <span class="text-sm text-[var(--text-content)] w-[237px] line-clamp-2">
        {{ newsObj.description || '' }}
      </span>
      <!-- 좋아요 박스 -->
      <div class="flex gap-[8px]">
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
    <ScrapNotOnImg class="absolute right-[20px] top-[20px] z-20" />
    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute w-[200px] h-[184px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
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
