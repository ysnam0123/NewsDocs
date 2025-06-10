<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import { ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const activeTab = ref('전체')

const tabs = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']

const postMock = [
  {
    post_id: 'post001',
    user_id: 'user001',
    category_id: 'ct1',
    created_at: '2025-06-10T12:00:00Z',
    title: '자바스크립트는 여전히 인기 1위',
    content: '테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용',
    published_at: '2025-06-09',
  },
  {
    post_id: 'post002',
    user_id: 'user002',
    category_id: 'ct1',
    created_at: '2025-06-10T12:00:00Z',
    title: '자바스크립트는 여전히 인기 2위',
    content: '테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용',
    published_at: '2025-06-09',
  },
  {
    post_id: 'post003',
    user_id: 'user003',
    category_id: 'ct1',
    created_at: '2025-06-10T12:00:00Z',
    title: '자바스크립트는 여전히 인기 3위',
    content: '테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용',
    published_at: '2025-06-09',
  },
  {
    post_id: 'post004',
    user_id: 'user004',
    category_id: 'ct1',
    created_at: '2025-06-10T12:00:00Z',
    title: '자바스크립트는 여전히 인기 4위',
    content: '테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용 테스트 내용',
    published_at: '2025-06-09',
  },
]
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-[735px] mx-auto mt-10">
      <div class="mb-4">
        <BackButton />
      </div>
      <div class="text-[28px] font-bold dark:text-white mb-8">내가 작성한 글</div>
      <div class="relative">
        <div
          class="flex border-[#9A9A9A] border-b-[0.5px] h-[52px] items-center text-center space-x-4 mb-5 relative dark:border-[#3C3C3C]"
        >
          <div
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="flex items-center justify-center w-[103px] h-full text-base cursor-pointer relative transition-all duration-300 dark:hover:text-[#A878FD] hover:text-[#7537E3]"
            :class="{
              'text-[#7537E3] dark:text-[#A878FD] font-semibold': activeTab === tab,
              'text-[#9D9D9D] dark:text-[#8F8F8F]': activeTab !== tab,
            }"
          >
            {{ tab }}
          </div>

          <div
            class="absolute bottom-[-1px] h-[2px] bg-[#7537E3] dark:bg-[#A878FD] transition-all duration-300"
            :style="{
              left: `${tabs.indexOf(activeTab) * 119}px`,
              width: '103px',
            }"
          />
        </div>
      </div>
      <div class="flex flex-col w-[735px]">
        <CommunityPost
          v-for="(item, itemIndex) in postMock"
          :key="item + '-' + itemIndex"
          :post="item"
          class="w-full border-b border-b-gray-200 dark:border-b-gray-500 last:border-b-0"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
