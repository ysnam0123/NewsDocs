<script setup>
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import { computed, ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'

const activeTab = ref('전체')

const tabs = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']

const userScrapNewsMock = [
  {
    news_id: 'nws001',
    created_at: '2025-06-10T12:00:00Z',
    News_API: {
      title: '자바스크립트는 여전히 인기 1위',
      url: 'https://example.com/news/102',
      published_at: '2025-06-09',
    },
  },
  {
    news_id: 'nws002',
    created_at: '2025-06-08T10:00:00Z',
    News_API: {
      title: 'OpenAI, GPT-5 출시 임박',
      url: 'https://example.com/news/101',
      published_at: '2025-06-07',
    },
  },
  {
    news_id: 'nws003',
    created_at: '2025-06-08T10:00:00Z',
    News_API: {
      title: 'OpenAI, GPT-5 출시 임박',
      url: 'https://example.com/news/101',
      published_at: '2025-06-07',
    },
  },
  {
    news_id: 'nws004',
    created_at: '2025-06-08T10:00:00Z',
    News_API: {
      title: 'OpenAI, GPT-5 출시 임박',
      url: 'https://example.com/news/101',
      published_at: '2025-06-07',
    },
  },
]

const NewsList = computed(() => {
  const size = 3
  const result = []
  for (let i = 0; i < userScrapNewsMock.length; i += size) {
    result.push(userScrapNewsMock.slice(i, i + size))
  }
  return result
})
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-[735px] mx-auto mt-10">
      <div class="mb-4">
        <BackButton />
      </div>
      <div class="text-[28px] font-bold dark:text-white mb-8">내가 저장한 뉴스</div>
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
      <div class="flex flex-col">
        <div>
          <div
            v-for="(row, rowIndex) in NewsList"
            :key="'row-' + rowIndex"
            class="flex space-x-[24px] pt-5"
          >
            <NewsComponent8
              v-for="(item, itemIndex) in row"
              :key="item.news_id + '-' + itemIndex"
              :news="item"
              class="w-[229px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
