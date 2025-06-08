<script setup>
import ScrapImg from './children/ScrapImg.vue'
</script>
<template>
  <div class="w-[300px] h-[385px] relative">
    <div class="w-[300px] h-[217px] mb-[16px]">
      <img src="@/assets/img/exImage/ronaldo.svg" class="w-full h-full object-cover" />
    </div>
    <div class="mb-[12px]">
      <div class="text-xl font-bold mb-[10px] max-h-[56px]">
        폭탄 제안! 이 정도로 진심이다...호날두와 극적 재계약
      </div>
      <div class="text-sm text-[#A8A8A8] max-h-[40px]">
        기사내용입니다. 기사내용입니다. 기사내용 인데 기사내용인데기사내용인데기사내용인데
        기사내용...
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
    <ScrapImg class="absolute right-[8px] top-[10px]" />
  </div>
</template>
<style scoped></style>
