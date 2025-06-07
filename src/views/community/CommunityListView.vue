<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import ProfileCard from '@/components/common/ProfileCard.vue'
import { ref } from 'vue'

const selectCategory = ref('전체')
const selectedSort = ref('최신순')
const searchQuery = ref('')
const handleCategory = (category) => {
  selectCategory.value = category
}
const handleSort = (sort) => {
  selectedSort.value = sort
}
</script>
<template>
  <div class="w-[1440px] min-h-screen mt-[40px] flex flex-col items-center m-auto">
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
      <div class="flex items-center w-[341px] h-10 rounded-[10px] border ml-auto">
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
    <div class="flex w-[1332px] mt-[27px]">
      <!-- 왼쪽 화면 -->
      <div class="flex">
        <div class="w-[272px] min-h-screen mt-[43px]">
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

          <!-- 정렬 -->
          <div class="flex flex-row gap-3">
            <button
              @click="handleSort('최신순')"
              :class="[
                'text-[16px] font-semibold underline cursor-pointer',
                selectedSort === '최신순' ? 'text-[#7537E3]' : 'text-[#969696]',
              ]"
            >
              최신순
            </button>
            <button
              @click="handleSort('인기순')"
              :class="[
                'text-[16px] font-semibold underline cursor-pointer',
                selectedSort === '인기순' ? 'text-[#7537E3]' : 'text-[#969696]',
              ]"
            >
              인기순
            </button>
          </div>

          <!-- 게시글들 -->
          <div class="w-full mt-4">
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
    </div>
  </div>
</template>
<style scoped></style>
