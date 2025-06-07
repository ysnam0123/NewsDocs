<script setup>
import ProfileCard from '@/components/common/ProfileCard.vue'
import CommunityPostDetail from '@/components/community/CommunityPostDetail.vue'
import { ref } from 'vue'

const selectCategory = ref('전체')
const searchQuery = ref('')
const handleCategory = (category) => {
  selectCategory.value = category
}
</script>
<template>
  <div class="w-[1440px] min-h-screen mt-[40px] flex flex-col items-center">
    <!-- 배너&검색 -->
    <div class="flex w-[1282px] h-[40px] justify-between">
      <div class="flex gap-[3px] w-[512px]">
        <button
          @click="handleCategory('전체')"
          :class="[
            'w-25 whitespace-nowrap items-center justify-center text-[18px] font-semibold cursor-pointer',
            selectCategory === '전체'
              ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
              : 'text-[#727070]',
          ]"
        >
          전체
        </button>
        <button
          @click="handleCategory('정치/경제')"
          :class="[
            'w-25 whitespace-nowrap items-center justify-center text-[18px] font-semibold cursor-pointer',
            selectCategory === '정치/경제'
              ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
              : 'text-[#727070]',
          ]"
        >
          정치/경제
        </button>
        <button
          @click="handleCategory('연예/스포츠')"
          :class="[
            'flex w-25 whitespace-nowrap items-center justify-center text-[18px] font-semibold cursor-pointer',
            selectCategory === '연예/스포츠'
              ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
              : 'text-[#727070]',
          ]"
        >
          연예/스포츠
        </button>
        <button
          @click="handleCategory('사회/문화')"
          :class="[
            'flex w-25 whitespace-nowrap items-center justify-center text-[18px] font-semibold cursor-pointer',
            selectCategory === '사회/문화'
              ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
              : 'text-[#727070]',
          ]"
        >
          사회/문화
        </button>
        <button
          @click="handleCategory('해외/기타')"
          :class="[
            'flex w-25 whitespace-nowrap items-center justify-center text-[18px] font-semibold cursor-pointer',
            selectCategory === '해외/기타'
              ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
              : 'text-[#727070]',
          ]"
        >
          해외/기타
        </button>
      </div>
      <div class="flex items-center w-[341px] h-10 rounded-[10px] border">
        <input
          v-model="searchQuery"
          class="ml-[30px] w-[287px]"
          type="text"
          placeholder="게시글 검색하기"
        />
        <button class="mr-[23px]">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="w-[26px] h-[26px]" />
        </button>
      </div>
    </div>
    <div class="flex w-[1272px] mt-[27px]">
      <!-- 왼쪽 화면 -->
      <div class="flex">
        <div class="w-[272px] min-h-screen">
          <div class="sticky top-[40px]">
            <!-- 프로필 & 태그 -->
            <ProfileCard />
          </div>
        </div>
      </div>

      <!-- 오른쪽 화면 -->
      <div class="flex w-[1075px] h-full">
        <!-- 게시글 -->
        <div class="flex flex-col ml-[70px]">
          <!-- 게시글 태그 -->
          <!-- 게시글 -->
          <CommunityPostDetail />
          <!-- 좋아요,댓글 개수 -->
          <div class="flex items-center mt-4 w-auto h-[26px]">
            <font-awesome-icon :icon="['far', 'heart']" class="ml-4 w-[22px] h-[22px] font-bold" />
            <div class="ml-[6px] font-bold text-[20px]">10</div>

            <font-awesome-icon
              :icon="['far', 'message']"
              class="ml-[27px] w-[22px] h-[22px] font-bold"
            />
            <div class="ml-[6px] font-bold text-[20px]">10</div>
          </div>

          <!-- 댓글입력 -->
          <input
            class="w-[934px] h-[75px] mt-[17px] px-[19px] font-bold text-6 text-[#909090] border rounded-[10px]"
            placeholder="댓글을 입력하세요"
          />

          <!-- 댓글 내용  -->
          <div class="flex min-w-[260px] min-h-[59px] items-center mt-[27px]">
            <div class="w-[50px] h-[50px] rounded-[10px] bg-gray-300"></div>
            <div class="flex flex-col ml-[17px]">
              <div class="flex items-center">
                <span class="font-bold text-xl">userName</span>
                <span class="text-[15px] ml-[43px]">방금 전</span>
              </div>
              <p class="mt-[17px] text-[15px]">댓글내용은 댓글내용이 댓글내용.</p>
            </div>
          </div>

          <div class="flex min-w-[260px] min-h-[59px] items-center mt-[27px]">
            <div class="w-[50px] h-[50px] rounded-[10px] bg-gray-300"></div>
            <div class="flex flex-col ml-[17px]">
              <div class="flex items-center">
                <span class="font-bold text-xl">userName</span>
                <span class="text-[15px] ml-[43px]">방금 전</span>
              </div>
              <p class="mt-[17px] text-[15px]">댓글내용은 댓글내용이 댓글내용.</p>
            </div>
          </div>

          <div class="flex min-w-[260px] min-h-[59px] items-center mt-[27px]">
            <div class="w-[50px] h-[50px] rounded-[10px] bg-gray-300"></div>
            <div class="flex flex-col ml-[17px]">
              <div class="flex items-center">
                <span class="font-bold text-xl">userName</span>
                <span class="text-[15px] ml-[43px]">방금 전</span>
              </div>
              <p class="mt-[17px] text-[15px]">댓글내용은 댓글내용이 댓글내용.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
