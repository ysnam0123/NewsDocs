<script setup>
import { ref } from 'vue'
import ScrapImg from './children/ScrapImg.vue'

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
</script>
<template>
  <div class="w-[292px] h-[384px] relative" @mouseover="hoverHandler">
    <div class="relative">
      <img
        src="@/assets/img/exImage/karina.png"
        alt="karina"
        class="w-[292px] h-[384px] rounded-3xl"
      />
      <div
        class="flex flex-col px-[20px] absolute h-[187px] w-[292px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
        v-if="!wantSummary"
      >
        <p class="font-bold text-[20px] text-[white] mt-auto">
          손흥민 사우디로 이적한답니다.. <br />꼭 가야만 할까요?
        </p>
        <!-- 좋아요 상자 -->
        <div class="flex gap-[8px] mb-[16px]">
          <div class="flex gap-[4px] items-center text-[13px] text-[#ffffff]">
            <img src="@/assets/img/Thumbs-up-white.svg" alt="likes" class="w-[18px] h-[18px]" />
            <p class="mt-[4px] text-[12px]">32</p>
          </div>

          <div class="flex gap-[4px] items-center text-[13px] text-[#ffffff]">
            <img src="@/assets/img/View-white.svg" alt="likes" class="w-[18px] h-[18px]" />
            <p class="mt-[4px] text-[12px]">32</p>
          </div>
        </div>
      </div>
    </div>
    <ScrapImg class="absolute right-[8px] top-[10px]" />

    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute w-[292px] h-[384px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeHandler"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>

    <!-- 클릭했을 때 나오는 창 -->
    <transition name="fade">
      <div
        v-if="wantSummary"
        class="w-[292px] h-[384px] rounded-[20px] absolute top-0 pt-[40px] pb-[32px] px-[32px] overflow-hidden"
      >
        <!-- 배경용 블러 -->
        <div class="absolute inset-0 bg-black/70 blur-xs rounded-[20px] z-30"></div>

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
