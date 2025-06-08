<script setup>
import SleepDog from '@/components/icon/sleepDog.vue'
</script>
<template>
  <div
    class="flex flex-col items-center justify-center space-y-2 h-[244px] border-[1px] border-[#EBEBEB] rounded-[12px] mt-5"
  >
    <SleepDog />
    <div class="text-[16px] text-[#191919] font-semibold">아직 저장한 뉴스가 없어요!</div>
    <div class="relative">
      <button
        class="w-[106px] h-[36px] bg-[#7537E3] text-center rounded-[8px] text-sm text-[#FFFFFF] cursor-pointer"
      >
        뉴스 보러가기
      </button>
    </div>
  </div>

  <!-- <div class="justify-items-center space-y-5 mt-14">
      <SleepDog />
      <div class="text-[30px] text-[#6046CF] font-semibold">아직 글을 쓰지 않았어요!!</div>
      <div class="relative">
        <VioletBtn />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-[25px]"
        >
          글 쓰러가기
        </div>
      </div>
    </div> -->
</template>
<style scoped></style>
