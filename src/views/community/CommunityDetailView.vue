<script setup>
import ProfileCard from '@/components/commons/ProfileCard.vue'
import CommunityPostDetail from '@/components/community/CommunityPostDetail.vue'
import { ref } from 'vue'

const selectCategory = ref('전체')
const searchQuery = ref('')
const handleCategory = (category) => {
  selectCategory.value = category
}
</script>
<template>
  <div class="w-[1440px] min-h-screen pl-[106px] mt-[40px] flex flex-col">
    <!-- 배너&검색 -->
    <div class="flex h-[40px] w-full">
      <button
        @click="handleCategory('전체')"
        :class="[
          'flex mr-[10px] min-w-[95px] w-autopx-[31px] py-[9px]  whitespace-nowrap items-center justify-center text-[20px] font-bold cursor-pointer',
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
          'flex mr-[10px] min-w-[95px] w-auto px-[31px] py-[9px] whitespace-nowrap items-center justify-center text-[20px] font-bold cursor-pointer',
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
          'flex mr-[10px] min-w-[95px] w-auto px-[31px] py-[9px] whitespace-nowrap items-center justify-center text-[20px] font-bold cursor-pointer',
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
          'flex mr-[10px] min-w-[95px] w-auto px-[31px] py-[9px] whitespace-nowrap items-center justify-center text-[20px] font-bold cursor-pointer',
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
          'flex mr-[10px] min-w-[95px] w-auto px-[31px] py-[9px] whitespace-nowrap items-center justify-center text-[20px] font-bold cursor-pointer',
          selectCategory === '해외/기타'
            ? 'border-b-2 border-b-[#7537E3] text-[#7537E3]'
            : 'text-[#727070]',
        ]"
      >
        해외/기타
      </button>
      <div class="ml-[150px] flex items-center w-[341px] h-10 rounded-[10px] border">
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
    <div class="flex mt-[27px]">
      <!-- 왼쪽 화면 -->
      <div class="w-[284px] min-h-screen">
        <div class="sticky top-[40px]">
          <!-- 프로필 & 태그 -->
          <ProfileCard />
        </div>
      </div>
      <!--오른쪽 화면 -->
      <div class="flex w-[1075px] h-full border-l border-l-[#D2D2D2]">
        <!-- 게시글 &댓글-->
        <div class="flex flex-col w-[934px] h-full ml-[57px]">
          <!-- 게시글 -->
          <CommunityPostDetail />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
