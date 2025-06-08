<script setup>
import ScrapImg from './children/ScrapImg.vue'
</script>
<template>
  <div class="flex w-[600px] h-[184px] relative">
    <img src="@/assets/img/exImage/dmz.svg" alt="dmz" class="rounded-[16px] w-[600px] h-[184px]" />
    <div
      class="flex items-center justify-between px-[20px] pt-[20px] absolute h-[83px] w-[600px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
    >
      <p class="font-bold text-[18px] text-[white]">
        손흥민 사우디로 이적한답니다... 꼭 가야만 할까요?
      </p>
      <!-- 좋아요 상자 -->
      <div class="flex gap-[8px]">
        <div class="flex gap-[4px] items-center text-[13px] text-[#ffffff]">
          <img src="@/assets/img/Thumbs-up-white.svg" alt="likes" class="w-[20px] h-[20px]" />
          <p class="mt-[4px] text-[15px]">32</p>
        </div>

        <div class="flex gap-[4px] items-center text-[13px] text-[#ffffff]">
          <img src="@/assets/img/View-white.svg" alt="likes" class="w-[20px] h-[20px]" />
          <p class="mt-[4px] text-[15px]">32</p>
        </div>
      </div>
    </div>
    <ScrapImg class="absolute right-[15px] top-[10px]" />
  </div>
</template>
<style scoped></style>
