<script setup></script>
<template>
  <div v-for="i in 2" :key="i">
    <div class="flex min-w-[830px] min-h-[58px] items-center mt-6 animate-pulse">
      <div class="w-[58px] h-[58px] rounded-full bg-gray-300"></div>
      <div class="flex flex-col ml-[17px]">
        <div class="ml-[14px] w-[132px] h-[21px] rounded-[8px] bg-gray-300"></div>
        <div class="ml-[14px] mt-[2px] w-[212px] h-[26px] rounded-[8px] bg-gray-300"></div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
