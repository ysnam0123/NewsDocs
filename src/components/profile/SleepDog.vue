<script setup>
import SleepDog from '@/components/icon/sleepDog.vue'

defineProps({
  content: String,
  btnText: String,
})
</script>
<template>
  <div
    class="flex flex-col items-center justify-center space-y-4 h-[344px] border-[1px] border-gray-200 rounded-[12px] mt-5 dark:border-[#4D4D4D]"
  >
    <SleepDog />
    <div class="text-lg text-[#191919] dark:text-white">{{ content }}</div>
    <div class="relative">
      <router-link to="/news">
        <button
          class="w-[106px] h-[36px] bg-[#7537E3] text-center rounded-[8px] text-sm text-[#FFFFFF] cursor-pointer hover:bg-[#601ED5] dark:bg-[#7846D2] dark:hover:bg-[#6524D9]"
        >
          {{ btnText }}
        </button>
      </router-link>
    </div>
  </div>
</template>
<style scoped></style>
