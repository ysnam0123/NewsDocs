<script setup>
import ProfileCard from '@/components/common/ProfileCard.vue'
import CommunityPostDetail from '@/components/community/CommunityPostDetail.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronLeft,
  MessageSquare,
  MessageSquarePlus,
  ThumbsUp,
  EllipsisVertical,
  PencilLine,
  Trash2,
} from 'lucide-vue-next'
const isLiked = ref(false)
const isCommentModalOpen = ref(false)
const router = useRouter()
const goToCommunity = () => {
  router.push('/community')
}
const toggleLike = () => {
  isLiked.value = !isLiked.value
}
const toggleCommentModal = () => {
  isCommentModalOpen.value = !isCommentModalOpen.value
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
          <div class="w-10 h-10 rounded-full flex items-center justify-center bg-[#F6F6F6]">
            <ChevronLeft class="w-[18px] h-[18px] text-[#191919]" />
          </div>
          <p class="flex items-center text-[#191919] text-[16px]">목록으로</p>
        </button>

        <!-- 게시글 -->
        <CommunityPostDetail class="mt-5" />
        <!-- 좋아요,댓글 개수 -->
        <div class="flex items-center mt-[30px] w-auto h-[22px]">
          <div
            @click="toggleLike"
            class="flex cursor-pointer items-center"
            :class="[isLiked ? 'text-[#7537E3]' : 'text-[#B7B7B7] hover:text-[#191919]']"
          >
            <ThumbsUp class="w-5 h-5" />
            <div class="ml-[3px] text-[16px]">32</div>
          </div>
          <div class="flex items-center text-[#B7B7B7]">
            <MessageSquare class="ml-4 w-5 h-5" />
            <div class="ml-[3px] text-[16px]">124</div>
          </div>
        </div>
        <!-- 댓글입력 -->
        <div class="relative w-[830px] mt-5">
          <input
            class="w-full h-[50px] px-5 text-[16px] text-[#191919] placeholder-[#CECECE] border border-gray-200 rounded-[8px] outline-none"
            placeholder="댓글을 입력하세요"
          />
          <MessageSquarePlus
            class="w-6 h-6 text-gray-400 cursor-pointer absolute top-1/2 right-4 -translate-y-1/2"
          />
        </div>
        <!-- 댓글 내용  -->
        <!-- 댓글1 -->
        <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
          <img
            src="../../assets/img/ChatImg.svg"
            alt="댓글 프로필 이미지"
            class="w-[58px] h-[58px]"
          />
          <div class="flex flex-col ml-[17px]">
            <div class="ml-[14px] flex items-center">
              <span class="text-[16px] text-[#191919]">공허의 코끼리</span>
              <span class="text-[13px] ml-[8px]">방금 전</span>
            </div>
            <p class="ml-[14px] mt-[2px] text-[16px]">댓글내용은 댓글내용이 댓글내용.</p>
          </div>
        </div>

        <!-- 댓글2 -->
        <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
          <img
            src="../../assets/img/ChatImg.svg"
            alt="댓글 프로필 이미지"
            class="w-[58px] h-[58px]"
          />
          <div class="flex flex-col ml-[17px]">
            <div class="ml-[14px] flex items-center">
              <span class="text-[16px] text-[#191919]">공허의 코끼리</span>
              <span class="text-[13px] ml-[8px]">방금 전</span>
            </div>
            <p class="ml-[14px] mt-[2px] text-[16px]">댓글내용은 댓글내용이 댓글내용.</p>
          </div>
        </div>

        <!-- 댓글3 시작 -->
        <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
          <img
            src="../../assets/img/ChatImg.svg"
            alt="댓글 프로필 이미지"
            class="w-[58px] h-[58px]"
          />
          <div class="flex flex-col w-full ml-[17px]">
            <div class="pl-[14px] w-full flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-[16px] text-[#191919]">공허의 코끼리</span>
                <span class="text-[13px] ml-[8px]">방금 전</span>
              </div>
              <div class="relative">
                <button
                  class="relative w-10 h-10 rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer transition-all duration-300"
                  @click="toggleCommentModal"
                >
                  <div
                    class="flex items-center justify-center w-full h-full rounded-full transition-all duration-300"
                    :class="isCommentModalOpen ? 'bg-white' : 'group-hover:bg-[#F6F6F6]'"
                  >
                    <EllipsisVertical class="w-[20px] h-[20px] text-[#161616]" />
                  </div>
                </button>
                <div
                  v-if="isCommentModalOpen"
                  class="absolute top-[44px] right-[10px] w-[157px] min-h-[128px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.16)] rounded-[8px] z-40"
                >
                  <ul class="w-full text-[12px] text-[#C9C9C9]">
                    <span class="ml-3 mt-3 block">내 댓글</span>
                    <li
                      @click="toggleCommentModal"
                      class="flex items-center gap-[6px] w-full h-[46px] mt-[7px] px-3 py-[13px] cursor-pointer text-[14px] text-[#191919] hover:bg-gray-100 transition-all duration-300"
                    >
                      <PencilLine class="w-4 h-4" />
                      수정하기
                    </li>
                    <li
                      @click="toggleCommentModal"
                      class="flex items-center gap-[6px] w-full h-[46px] px-3 py-[13px] cursor-pointer text-[14px] text-[#E03333] hover:bg-gray-100 transition-all duration-300"
                    >
                      <Trash2 class="w-4 h-4" />
                      삭제하기
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p class="ml-[14px] mt-[2px] text-[16px]">댓글내용은 댓글내용이 댓글내용.</p>
          </div>
        </div>
        <!-- 댓글 끝 -->

        <!-- 댓글 4 -->
        <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
          <img
            src="../../assets/img/ChatImg.svg"
            alt="댓글 프로필 이미지"
            class="w-[58px] h-[58px]"
          />
          <div class="flex flex-col ml-[17px]">
            <div class="ml-[14px] flex items-center">
              <span class="text-[16px] text-[#191919]">공허의 코끼리</span>
              <span class="text-[13px] ml-[8px]">방금 전</span>
            </div>
            <p class="ml-[14px] mt-[2px] text-[16px]">댓글내용은 댓글내용이 댓글내용.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
