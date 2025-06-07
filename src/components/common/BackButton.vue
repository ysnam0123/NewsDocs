<script setup>
import arrow from '@/assets/icons/Chevron--left.svg'
</script>
<template>
  <div class="mt-10 sticky top-[60px]">
    <div class="flex w-[170px] h-10 cursor-pointer">
      <div class="w-10 h-10 relative flex bg-[#F6F6F6] hover:bg-[#EDEDED] rounded-full mr-2.5">
        <img
          :src="arrow"
          class="w-4.5 h-4.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <span class="flex text-md items-center justify-center">돌아가기</span>
    </div>
  </div>
</template>
<style scoped></style>
