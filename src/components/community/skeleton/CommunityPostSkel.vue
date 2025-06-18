<script setup></script>
<template>
  <div
    class="flex flex-col sm:flex-row justify-center sm:items-center gap-[16px] sm:gap-[24px] w-full sm:h-[237px] py-6 sm:py-0 animate-pulse"
  >
    <!-- 이미지 -->
    <div
      class="w-full sm:w-[232px] h-[236px] sm:h-[171px] flex items-center justify-center rounded-[12px]"
    >
      <div class="w-full h-full sm:rounded-[12px] bg-gray-300"></div>
    </div>

    <div class="flex flex-col flex-grow">
      <!-- 게시글 내용 -->
      <div class="flex flex-col justify-center w-full h-[172px] px-5 sm:px-0">
        <!-- 작성자&태그 -->
        <div class="w-full h-10 flex items-center justify-between">
          <!-- 작성자 -->
          <div class="flex gap-[9.5px] items-center">
            <div class="w-10 h-10 rounded-full bg-gray-300"></div>
            <div class="w-[87px] h-[21px] rounded-[12px] bg-gray-300"></div>
          </div>
          <!-- 태그 -->
          <div class="w-[45px] sm:w-[52px] h-[18px] sm:h-[21px] rounded-[8px] bg-gray-300"></div>
        </div>
        <!-- 내용 -->
        <div class="w-[200px] sm:w-[250px] h-7 mt-4 sm:mt-5 rounded-[8px] bg-gray-300"></div>
        <div class="mt-[6px] w-[150px] sm:w-[200px] h-3 sm:h-4 rounded-[6px] bg-gray-300"></div>
        <div class="mt-[4px] w-[150px] sm:w-[200px] h-3 sm:h-4 rounded-[6px] bg-gray-300"></div>
      </div>

      <!-- 좋아요,댓글 -->
      <div class="flex items-center w-[87px] h-[18px] gap-[11px]">
        <div class="w-[35px] h-full rounded-[6px] bg-gray-300"></div>
        <div class="w-[41px] h-full rounded-[6px] bg-gray-300"></div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
