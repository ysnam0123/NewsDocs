<script setup>
import ScrapImg from './children/ScrapImg.vue'
</script>
<template>
  <!-- 전체 -->
  <div class="flex gap-[15px] w-[414px] h-[132px] relative">
    <!-- 이미지 -->
    <div class="min-w-[140px] min-h-[132px]">
      <img src="@/assets/img/exImage/newscomponent2.svg" class="rounded-[20px]" />
    </div>
    <div class="flex flex-col max-h-[260px]">
      <!-- 기사 -->
      <div class="w-[211px] relative flex flex-col mb-[14px]">
        <h2 class="text-[18px] max-h-[58px] dark:text-white">
          손흥민 유로파 리그 우승, 다음 행보는 어디일까요??
        </h2>
        <div class="text-[#A8A8A8] text-[14px] pt-0.5 max-h-[48px]">
          기사내용입니다.기사내용입니다.기사내용...기사내용입니다.기사내용입니다.
        </div>
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
    <ScrapImg class="absolute top-0 right-0" />
  </div>
</template>
<style scoped></style>
