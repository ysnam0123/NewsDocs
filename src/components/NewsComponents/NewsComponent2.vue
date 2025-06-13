<script setup>
import { ref } from 'vue'
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'
import ScrapNotOnImg from './children/ScrapNotOnImg.vue'
import router from '@/router'

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

const toDetailHandler = () => {
  router.push(`/news/detail/${props.news.article_id}`)
}
</script>
<template>
  <!-- 전체 -->
  <div v-if="props.news" class="flex gap-[15px] w-[414px] h-[132px] relative">
    <!-- 이미지 -->
    <div class="cursor-pointer w-[140px]" @mouseover="hoverHandler">
      <img :src="news.image_url" class="rounded-[20px] w-full h-full object-cover" />
    </div>
    <div class="flex flex-col max-h-[260px]">
      <!-- 기사 -->

      <div class="w-[211px] relative flex flex-col mb-[10px]">
        <div class="text-[var(--text-title)] font-bold text-[18px] max-h-[58px] line-clamp-2">
          {{ props.news.title }}
        </div>
        <div class="text-[#A8A8A8] text-[14px] pt-0.5 max-h-[48px] line-clamp-2">
          {{ props.news.description || '' }}
        </div>
      </div>

      <!-- 좋아요 박스 -->
      <div class="flex gap-2 text-[#A8A8A8] mb-16">
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

    <ScrapNotOnImg class="absolute right-[4px] top-[2px] z-20" />
    <!-- 호버했을때 나오는 창 -->
    <div
      v-show="!wantSummary"
      v-if="summaryHover"
      class="absolute w-[140px] h-[132px] inset-0 bg-black/30 rounded-[20px] flex items-center justify-center z-10 cursor-pointer"
      @click="summarizeHandler"
      @mouseleave="hoverOut"
    >
      <p class="text-white font-semibold text-[16px] z-20">요약보기</p>
    </div>
    <!-- 클릭했을 때 나오는 창 -->
    <transition name="fade">
      <div
        v-if="wantSummary"
        class="w-[414px] h-[132px] rounded-[20px] absolute top-0 overflow-hidden"
      >
        <!-- 배경용 블러 -->
        <div class="absolute inset-0 bg-black/80 blur-xs rounded-[20px] z-30"></div>

        <!-- 요약된 내용 -->
        <div class="flex relative z-30 h-full px-[32px] gap-[50px] items-center">
          <h1 class="w-[220px] h-[52px] text-[20px] font-semibold text-white">
            손흥민 첫 메이저 우승! <br />사우디로 가나?
          </h1>

          <button
            class="w-[81px] h-[33px] px-[16px] py-[8px] text-[14px] font-semibold bg-white rounded-[8px] flex items-center cursor-pointer hover:bg-[#D2D2D2]"
            @click.stop="toDetailHandler"
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
