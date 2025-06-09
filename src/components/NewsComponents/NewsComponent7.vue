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
</script>
<template>
  <div class="relative" @mouseover="hoverHandler">
    <div class="w-[600px] h-[118px] rounded-[16px] p-[20px] border-1 border-[#EBEBEB]">
      <div class="flex flex-col gap-[12px]">
        <h1 class="w-[425px] text-[18px] font-bold text-[var(--text-title)]">
          NH농협은행, 예금금리 최고 0.3%p 내려…"시장금리 반영"
        </h1>
        <div class="flex">
          <p class="text-[#8f8f8f] text-[14px] font-medium w-[425px]">
            NH농협은행은 이날 홈페이지에서 거치식 예금 금리를 이날부터 0.25~0.30%포인트(p)
            인하한다고 고객들에게 안내했다. 아울러 적립식 예
          </p>
          <!-- 좋아요 박스 -->
          <div class="flex gap-[5px] ml-auto mt-auto">
            <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
              <img src="@/assets/img/Thumbs-up-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
              <p class="mt-[4px] text-[12px]">32</p>
            </div>
            <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
              <img src="@/assets/img/View-opacity.svg" alt="likes" class="w-[19px] h-[19px]" />
              <p class="mt-[4px] text-[12px]">32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ScrapNotOnImg class="absolute right-[20px] top-[20px] z-15" />
    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute w-[600px] h-[118px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeHandler"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>
    <!-- 클릭했을 때 나오는 창 -->
    <transition name="fade">
      <div
        v-if="wantSummary"
        class="w-[600px] h-[118px] rounded-[20px] absolute top-0 overflow-hidden"
      >
        <!-- 배경용 블러 -->
        <div class="absolute inset-0 bg-black/80 blur-xs rounded-[20px] z-30"></div>

        <!-- 요약된 내용 -->
        <div class="flex relative z-30 h-full px-[32px] gap-[50px] items-center">
          <h1 class="w-[220px] h-[52px] text-[20px] font-semibold text-white">
            손흥민 첫 메이저 우승! <br />사우디로 가나?
          </h1>

          <button
            class="w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] ml-auto flex items-center cursor-pointer hover:bg-[#D2D2D2]"
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
