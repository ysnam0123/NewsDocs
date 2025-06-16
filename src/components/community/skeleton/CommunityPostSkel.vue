<script setup></script>
<template>
  <div class="flex items-center gap-[24px] w-full h-[237px] animate-pulse">
    <!-- 이미지 -->
    <div class="flex items-center justify-center w-[232px] h-[171px] rounded-[12px]">
      <div class="w-full h-full rounded-[12px] bg-gray-300"></div>
    </div>
    <div class="flex flex-col flex-grow">
      <!-- 게시글 내용 -->
      <div class="flex flex-col justify-center w-full h-[172px]">
        <!-- 작성자&태그 -->
        <div class="w-full h-10 flex items-center justify-between">
          <!-- 작성자 -->
          <div class="w-[137px] h-full rounded-[12px] bg-gray-300"></div>
          <!-- 태그 -->
          <div class="w-[52px] h-[21px] rounded-[8px] bg-gray-300"></div>
        </div>
        <!-- 내용 -->
        <div class="w-[250px] h-7 mt-5 rounded-[8px] bg-gray-300"></div>
        <div class="mt-[6px] w-[200px] h-4 rounded-[6px] bg-gray-300"></div>
        <div class="mt-[4px] w-[200px] h-4 rounded-[6px] bg-gray-300"></div>
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
