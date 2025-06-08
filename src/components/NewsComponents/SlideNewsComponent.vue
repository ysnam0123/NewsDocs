<script setup>
import ScrapImg from './children/ScrapImg.vue'
</script>
<template>
  <div class="rounded-[16px] w-[292px] h-[384px] relative">
    <img
      src="@/assets/img/exImage/slideImg.svg"
      alt="slide"
      class="w-[292px] h-[384px] rounded-[16px] relative"
    />
    <div
      class="flex flex-col px-[20px] absolute h-[187px] w-[292px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
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
    <ScrapImg class="absolute right-[8px] top-[10px]" />
  </div>
</template>
<style scoped></style>
