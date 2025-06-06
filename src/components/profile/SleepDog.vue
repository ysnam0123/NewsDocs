<script setup>
import SleepDog from '@/components/icon/sleepDog.vue'
import VioletBtn from '@/components/icon/violetBtn.vue'
</script>
<template>
  <div class="justify-items-center space-y-5 mt-14">
    <SleepDog />
    <div class="text-[30px] text-[#6046CF] font-semibold">아직 뉴스를 저장하지 않았어요!!</div>
    <div class="relative">
      <VioletBtn />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-[25px]"
      >
        뉴스 보러가기
      </div>
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
