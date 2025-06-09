<script setup>
import ProfileCard from '@/components/common/ProfileCard.vue'
import CommunityPostDetail from '@/components/community/CommunityPostDetail.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, MessageSquare, MessageSquarePlus, ThumbsUp } from 'lucide-vue-next'
import CommunityComment from '@/components/community/CommunityComment.vue'
import CommunityMyComment from '@/components/community/CommunityMyComment.vue'
const isLiked = ref(false)
const router = useRouter()
const goToCommunity = () => {
  router.push('/community')
}
const toggleLike = () => {
  isLiked.value = !isLiked.value
}
</script>
<template>
  <div class="flex w-[1440px] mx-auto">
    <!-- 왼쪽 화면 -->
    <div class="w-[328px] pl-[100px] mt-[40px]">
      <div class="sticky top-[40px] w-full">
        <!-- 프로필 & 태그 -->
        <ProfileCard />
      </div>
    </div>

    <!-- 오른쪽 화면 -->
    <div class="flex flex-col mt-[40px] w-[1112px]">
      <div class="w-[888px] pl-[58px] min-h-screen">
        <button
          @click="goToCommunity"
          class="w-40 h-10 gap-[10px] flex items-center cursor-pointer"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center bg-[#F6F6F6] dark:bg-[#363636] dark:hover:bg-[#4A4A4A]"
          >
            <ChevronLeft class="w-[18px] h-[18px] text-[#191919] dark:text-[#FFFFFF]" />
          </div>
          <p class="flex items-center text-[#191919] dark:text-[#FFFFFF] text-[16px]">목록으로</p>
        </button>

        <!-- 게시글 -->
        <CommunityPostDetail class="mt-5" />
        <!-- 좋아요,댓글 개수 -->
        <div class="flex items-center mt-[30px] w-auto h-[22px]">
          <div
            @click="toggleLike"
            class="flex cursor-pointer items-center"
            :class="[
              isLiked
                ? 'text-[#7537E3] dark:text-[#7846D2]'
                : 'text-[#B7B7B7] dark:text-[#7A7A7A] hover:text-[#191919] dark:hover:text-[#C0C0C0]',
            ]"
          >
            <ThumbsUp class="w-5 h-5" />
            <div class="ml-[3px] text-[16px]">32</div>
          </div>
          <div class="flex items-center text-[#B7B7B7] dark:text-[#7A7A7A]">
            <MessageSquare class="ml-4 w-5 h-5" />
            <div class="ml-[3px] text-[16px]">124</div>
          </div>
        </div>
        <!-- 댓글입력 -->
        <div class="relative w-[830px] mt-5">
          <input
            class="w-full h-[50px] px-5 text-[16px] text-[#191919] dark:text-[#FFFFFF] placeholder-[#CECECE] border border-gray-200 dark:border-[#4D4D4D] rounded-[8px] outline-none"
            placeholder="댓글을 입력해주세요"
          />
          <MessageSquarePlus
            class="w-6 h-6 text-gray-400 dark:text-[#4D4D4D] cursor-pointer absolute top-1/2 right-4 -translate-y-1/2"
          />
        </div>
        <!-- 댓글 내용  -->
        <!-- 댓글1 -->
        <CommunityComment />
        <!-- 댓글2 -->
        <CommunityComment />
        <!-- <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
          <img
            src="../../assets/img/ChatImg.svg"
            alt="댓글 프로필 이미지"
            class="w-[58px] h-[58px]"
          />
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

        <!-- 댓글3 시작 -->
        <CommunityMyComment />
        <!-- 댓글 끝 -->

        <!-- 댓글 4 -->
        <CommunityComment />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
