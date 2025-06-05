<script setup></script>
<template>
  <div class="flex gap-[24px] w-[919px] h-[253px] rounded-[20px] border py-6">
    <!-- 이미지 -->
    <div class="ml-[30px] w-[341px] h-[205px] bg-gray-300"></div>
    <div class="flex flex-col flex-grow">
      <!-- 태그 -->
      <div class="flex justify-end w-full h-[17px] text-[14px] mt-[15px] pr-[18px] text-[#8F8F8F]">
        스포츠
      </div>
      <!-- 게시글 내용 -->
      <div class="w-[445px] h-[172px]">
        <!-- 작성자 -->
        <div class="flex gap-[6px] items-center">
          <div class="w-10 h-10 rounded-[10px] bg-gray-300"></div>
          <div class="text-xl font-bold">userName</div>
        </div>

        <!-- 내용 -->
        <div class="mt-4">
          <div class="text-xl font-bold">제목입니달</div>
          <div class="mt-4 text-[15px] text-[#8E8D8D]">
            내용내용내용내용.내용내용내용내용내용내용내용내용내용내용내,
          </div>
        </div>
      </div>
      <!-- 좋아요,댓글 -->
      <div class="flex justify-end items-center mt-[5px] mr-[27px] w-auto h-[24px] gap-[9px]">
        <font-awesome-icon :icon="['far', 'heart']" class="text-[#9C9B9B]" />
        <div class="text-[#9C9B9B] font-bold text-[20px]">10</div>

        <font-awesome-icon :icon="['far', 'message']" class="text-[#9C9B9B]" />
        <div class="text-[#9C9B9B] font-bold text-[20px]">10</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
