<script setup></script>
<template>
  <div
    class="flex flex-col w-[830px] max-h-[846px] px-10 rounded-[16px] border border-gray-200 dark:bg-[#242424] dark:border-[#333333] animate-pulse"
  >
    <!-- 작성자 -->
    <div class="flex w-full justify-between mt-8">
      <div class="flex gap-[10px] items-center">
        <div class="w-12 h-12 rounded-full bg-gray-300" />
        <div class="ml-[10px] w-[83px] h-[23px] rounded-[8px] bg-gray-300"></div>
      </div>
      <div class="flex flex-col">
        <!-- 게시글 수정,삭제 -->
        <!-- <div v-if="props.currentUserId === props.userId">
          <CommunityPostModal :postId="props.postId" @delete="deleteHandler" @edit="editHandler" />
        </div> -->
        <div class="w-[38px] h-[21px] rounded-[8px] bg-gray-300"></div>
      </div>
    </div>
    <div class="mt-6 w-[750px] h-[361px] rounded-[12px] bg-gray-300"></div>
    <!-- 제목 -->
    <div class="mt-8 w-[151px] h-[34px] rounded-[8px] bg-gray-300"></div>
    <!-- 내용 -->
    <div class="w-[750px] h-[100px] mt-[14px] mb-10">
      <div class="w-[700px] h-[18px] rounded-[6px] mb-[5px] bg-gray-300"></div>
      <div class="w-[700px] h-[18px] rounded-[6px] mb-[5px] bg-gray-300"></div>
      <div class="w-[650px] h-[18px] rounded-[6px] mb-[5px] bg-gray-300"></div>
    </div>
  </div>
</template>
<style scoped></style>
