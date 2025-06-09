<script setup>
import CommunityCommentModal from './CommunityCommentModal.vue'
</script>
<template>
  <!-- 내 댓글 -->
  <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
    <img src="../../assets/img/ChatImg.svg" alt="댓글 프로필 이미지" class="w-[58px] h-[58px]" />
    <div class="flex flex-col w-full ml-[17px]">
      <div class="pl-[14px] w-full flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-[16px] text-[#191919] dark:text-[#FFFFFF]">공허의 코끼리</span>
          <span class="text-[13px] ml-[8px] text-[#9A9A9A]">방금 전</span>
        </div>
        <CommunityCommentModal />
      </div>
      <p class="ml-[14px] mt-[2px] text-[16px] text-[#191919] dark:text-[#8F8F8F]">
        댓글내용은 댓글내용이 댓글내용.
      </p>
    </div>
  </div>
  <!-- 다른 사람 댓글 -->
  <!-- <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
    <img src="../../assets/img/ChatImg.svg" alt="댓글 프로필 이미지" class="w-[58px] h-[58px]" />
    <div class="flex flex-col ml-[17px]">
      <div class="ml-[14px] flex items-center">
        <span class="text-[16px] text-[#191919] dark:text-[#FFFFFF]">공허의 코끼리</span>
        <span class="text-[13px] ml-[8px] text-[#9A9A9A]">방금 전</span>
      </div>
      <p class="ml-[14px] mt-[2px] text-[16px] text-[#191919] dark:text-[#8F8F8F]">
        댓글내용은 댓글내용이 댓글내용.
      </p>
    </div>
  </div> -->
</template>
<style scoped></style>
