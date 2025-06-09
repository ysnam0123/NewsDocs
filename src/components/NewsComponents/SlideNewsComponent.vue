<script setup></script>
<template>
  <div class="w-[292px] h-[356px] relative">
    <div class="rounded-2xl">
      <img
        src="@/assets/img/exImage/slideImg.svg"
        alt="slide"
        class="w-[292px] h-[356px] rounded-2xl relative"
      />
    </div>
    <div
      class="flex flex-col px-2.5 absolute h-[187px] w-[292px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
    >
      <p class="text-[20px] text-white mt-auto break-words">
        손흥민 사우디로 이적한답니다..꼭 가야만 할까요?
      </p>
      <!-- 좋아요 상자 -->
      <div class="flex gap-2 mb-[16px]">
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
</template>
<style scoped></style>
