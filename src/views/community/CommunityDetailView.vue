<script setup>
import ProfileCard from '@/components/common/ProfileCard.vue'
import CommunityPostDetail from '@/components/community/CommunityPostDetail.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
          <img src="../../assets/icons/backButton.svg" alt="목록으로" class="w-10 h-10" />
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
            <img src="../../assets/img/Thumbs-up.svg" class="w-5 h-5" />
            <div class="ml-[3px] text-[16px]">32</div>
          </div>
          <div class="flex items-center text-[#B7B7B7]">
            <img src="../../assets/img/Chat.svg" alt="댓글" class="ml-4 w-5 h-5" />
            <div class="ml-[3px] text-[16px]">124</div>
          </div>
        </div>
        <!-- 댓글입력 -->
        <div class="relative w-[830px] mt-5">
          <input
            class="w-full h-[50px] px-5 text-[16px] text-[#191919] placeholder-[#CECECE] border rounded-[8px] outline-none"
            placeholder="댓글을 입력하세요"
          />
          <img
            src="../../assets/icons/Add-comment.svg"
            class="w-6 h-6 cursor-pointer absolute top-1/2 right-4 -translate-y-1/2"
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
              <span class="font-semibold text-[16px] text-[#191919]">공허의 코끼리</span>
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
              <span class="font-semibold text-[16px] text-[#191919]">공허의 코끼리</span>
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
                <span class="font-semibold text-[16px] text-[#191919]">공허의 코끼리</span>
                <span class="text-[13px] ml-[8px]">방금 전</span>
              </div>
              <div class="relative">
                <button class="relative w-10 h-10 cursor-pointer group" @click="toggleCommentModal">
                  <img
                    src="../../assets/icons/commentModal.svg"
                    class="w-10 h-10 absolute top-0 left-0"
                    :class="[isCommentModalOpen ? 'opacity-0' : 'group-hover:opacity-0']"
                  />
                  <img
                    src="../../assets/icons/commentModalHover.svg"
                    class="w-10 h-10 absolute top-0 left-0"
                    :class="[
                      isCommentModalOpen ? 'opacity-100' : ' opacity-0 group-hover:opacity-100',
                    ]"
                  />
                </button>
                <div
                  v-if="isCommentModalOpen"
                  class="absolute top-[44px] right-[10px] w-[157px] min-h-[128px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.16)] rounded-[8px] z-40"
                >
                  <ul class="w-full text-[12px] text-[#C9C9C9]">
                    <span class="ml-3 mt-3 block">내 댓글</span>
                    <li
                      @click="toggleCommentModal"
                      class="flex items-center gap-[6px] w-full h-[46px] mt-[7px] px-3 py-[13px] cursor-pointer text-[14px] text-[#191919] hover:bg-[#C9C9C9]"
                    >
                      <img src="../../assets/icons/Edit.svg" class="w-4 h-4" />
                      수정하기
                    </li>
                    <li
                      @click="toggleCommentModal"
                      class="flex items-center gap-[6px] w-full h-[46px] px-3 py-[13px] cursor-pointer text-[14px] text-[#E03333] hover:bg-[#C9C9C9]"
                    >
                      <img src="../../assets/icons/Trash-can.svg" class="w-4 h-4" />
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
              <span class="font-semibold text-[16px] text-[#191919]">공허의 코끼리</span>
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
