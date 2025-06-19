<script setup></script>
<template>
  <div
    class="relative flex items-center sm:flex-col sm:items-center sm:w-[170px] min-w-[203px] whitespace-nowrap sm:h-auto h-[78px] animate-pulse"
  >
    <!-- 프로필 -->
    <div class="w-full flex sm:flex-col sm:items-center">
      <div
        class="sm:w-[146px] sm:h-[146px] w-[78px] h-[78px] sm:mt-[15px] rounded-full bg-gray-300"
      />
      <div class="flex flex-col justify-center">
        <div class="sm:mt-4 ml-4 sm:ml-0 w-[109px] h-[21px] sm:h-6 rounded-[8px] bg-gray-300"></div>
        <div
          class="mt-[6px] ml-4 sm:ml-0 w-[109px] h-[16px] sm:h-[17px] rounded-[6px] bg-gray-300"
        ></div>
      </div>
    </div>

    <!-- 버튼 -->
    <button class="hidden sm:block mt-8 w-[170px] h-[50px] rounded-lg bg-gray-300"></button>
    <button class="hidden sm:block mt-[10px] w-[170px] h-[50px] rounded-lg bg-gray-300"></button>
  </div>
</template>
<style scoped></style>
