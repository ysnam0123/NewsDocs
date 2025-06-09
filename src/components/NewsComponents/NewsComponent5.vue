<script setup>
import ScrapImg from './children/ScrapImg.vue'
</script>
<template>
  <div
    class="relative flex gap-[22px] w-[600px] h-[184px] border-1 border-[#EBEBEB] dark:bg-[#1F1F1F] dark:border-[#343434] rounded-[16px]"
  >
    <img
      src="@/assets/img/exImage/trump.png"
      class="w-[200px] h-[182px] rounded-l-[15px] object-cover"
    />

    <div class="flex flex-col gap-[10px] py-[18px] h-[184px]">
      <h1 class="font-bold text-[18px] w-[272px] dark:text-white">
        트럼프, “나는 미국에 자신이 없어 발언.. 수많은 미국인들 자괴감에 빠져”
      </h1>
      <span class="text-sm text-[#8F8F8F] w-[240px]">
        트럼프가 양심없는 발언을 하여 논란이 되었다. 이날 트럼프는 미국은 평균 이하라며 말도 안되는
        소리를 연이어 토해내어...
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
    <ScrapImg class="absolute right-[5px] top-[5px]" />
  </div>
</template>
<style scoped></style>
