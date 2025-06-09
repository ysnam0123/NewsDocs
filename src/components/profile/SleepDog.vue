<script setup>
import SleepDog from '@/components/icon/sleepDog.vue'
</script>
<template>
  <div
    class="flex flex-col items-center justify-center space-y-4 h-[344px] border-[1px] border-gray-200 rounded-[12px] mt-5 dark:border-[#4D4D4D]"
  >
    <SleepDog />
    <div class="text-lg text-[#191919] dark:text-white">아직 저장한 뉴스가 없어요!</div>
    <div class="relative">
      <router-link to="/news">
        <button
          class="w-[106px] h-[36px] bg-[#7537E3] text-center rounded-[8px] text-sm text-[#FFFFFF] cursor-pointer hover:bg-[#601ED5] dark:bg-[#7846D2] dark:hover:bg-[#6524D9]"
        >
          뉴스 보러가기
        </button>
      </router-link>
    </div>
  </div>
</template>
<style scoped></style>
