<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import ProfileCard from '@/components/common/ProfileCard.vue'
import { ref } from 'vue'

const selectCategory = ref('전체')
const selectedSort = ref('최신순')
const handleCategory = (category) => {
  selectCategory.value = category
}
const handleSort = (sort) => {
  selectedSort.value = sort
}
</script>
<template>
  <div class="flex w-[1440px] mx-auto">
    <!-- 왼쪽 화면 -->
    <div class="w-[330px] pl-[100px] mt-[40px]">
      <div class="sticky top-[40px] w-full">
        <!-- 프로필 & 태그 -->
        <ProfileCard />
      </div>
    </div>

    <!-- 오른쪽 화면 -->
    <div class="flex flex-col mt-5 w-[1110px] pl-[60px] pr-[220px]">
      <div class="flex min-w-[834px] h-[54px] justify-between items-center">
        <!-- 배너 -->
        <div class="flex w-[514px] h-full">
          <button
            @click="handleCategory('전체')"
            :class="[
              'w-[102.8px] whitespace-nowrap items-center justify-center text-[16px] font-semibold cursor-pointer',
              selectCategory === '전체'
                ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
                : 'text-[#9D9D9D]',
            ]"
          >
            전체
          </button>
          <button
            @click="handleCategory('정치/경제')"
            :class="[
              'w-[102.8px] whitespace-nowrap items-center justify-center text-[16px] font-semibold cursor-pointer',
              selectCategory === '정치/경제'
                ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
                : 'text-[#9D9D9D]',
            ]"
          >
            정치/경제
          </button>
          <button
            @click="handleCategory('연예/스포츠')"
            :class="[
              'flex w-[102.8px] whitespace-nowrap items-center justify-center text-[16px] font-semibold cursor-pointer',
              selectCategory === '연예/스포츠'
                ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
                : 'text-[#9D9D9D]',
            ]"
          >
            연예/스포츠
          </button>
          <button
            @click="handleCategory('사회/문화')"
            :class="[
              'flex w-[102.8px] whitespace-nowrap items-center justify-center text-[16px] font-semibold cursor-pointer',
              selectCategory === '사회/문화'
                ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
                : 'text-[#9D9D9D]',
            ]"
          >
            사회/문화
          </button>
          <button
            @click="handleCategory('해외/기타')"
            :class="[
              'flex w-[102.8px] whitespace-nowrap items-center justify-center text-[16px] font-semibold cursor-pointer',
              selectCategory === '해외/기타'
                ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
                : 'text-[#9D9D9D]',
            ]"
          >
            해외/기타
          </button>
        </div>
        <!-- 정렬 -->
        <div class="flex min-w-24 h-[30px] items-center justify-end">
          <button
            @click="handleSort('최신순')"
            :class="[
              'w-12 h-[30px] flex items-center justify-center text-[12px] cursor-pointer',
              selectedSort === '최신순' ? 'underline-offset-3 text-[#191919]' : 'text-[#969696]',
            ]"
          >
            최신순
          </button>
          <button
            @click="handleSort('인기순')"
            :class="[
              'w-12 h-[30px] flex items-center justify-center text-[12px] cursor-pointer',
              selectedSort === '인기순' ? 'underline-offset-3 text-[#191919]' : 'text-[#969696]',
            ]"
          >
            인기순
          </button>
        </div>
      </div>
      <!-- 게시글 -->
      <div class="flex flex-col w-[835px]">
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
        <CommunityPost class="mb-[40px]" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
