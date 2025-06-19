<script setup>
import { fetchHotDocs } from '@/api/fetchHotDocs'
import { Eye, ThumbsUp } from 'lucide-vue-next'
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const newsList = ref([])
const isLoading = ref(true)

// 조회수 상위 5개만 보여줌
const hotDocs = computed(() => {
  return [...newsList.value].sort((a, b) => b.view_count - a.view_count).slice(0, 5)
})
const handleClick = (news) => {
  console.log(hotDocs)
  router.push(`/news/detail/${news.news_id}`)
}

onMounted(async () => {
  newsList.value = await fetchHotDocs()
  console.log('hotNewsList:', newsList.value)
  isLoading.value = false
})
</script>
<template>
  <div
    v-if="!isLoading"
    class="flex flex-col text-[var(--text-title)] h-[790px] border-1 border-[#e0e0e0] dark:border-[#343434] rounded-[18px] px-[32px] pt-[28px]"
  >
    <div
      v-for="(news, index) in hotDocs"
      :key="news.news_id"
      @click="handleClick(news)"
      :class="[
        'flex gap-[20px] sm:w-[496px] min-w-[300] cursor-pointer',
        index === 0
          ? 'h-[151px] mb-5'
          : 'py-[23px] border-t-1 border-t-[#E0E0E0] dark:border-t-[#343434] h-[146px]',
      ]"
    >
      <div class="flex gap-[20px]">
        <img
          v-if="index === 0"
          :src="news.image_url"
          alt="news image"
          class="sm:w-[151px] sm:h-[151px] w-[120px] h-[120px] rounded-[20px] object-cover"
        />
        <div :class="['flex flex-col', index === 0 ? 'sm:w-[325px] w-[170px]' : 'w-full']">
          <h1 class="sm:mb-[11px] mb-0 font-semibold sm:text-[18px] text-[13px]">
            {{ news.title }}
          </h1>
          <span
            class="mb-[15px] min-h-[35px] sm:text-[15px] text-[12px] text-[#7f7f7f] line-clamp-2"
          >
            {{ news.description }}
          </span>
          <div class="flex gap-[8px]">
            <div class="flex gap-[4px] items-center sm:text-[13px] text-[#939393]">
              <ThumbsUp class="w-4 mt-0.5 mr-1" />
              <p class="mt-[3px] mr-0.5">{{ news.like.length ?? 0 }}</p>
            </div>
            <div class="flex gap-[4px] items-center text-[13px] text-[#939393]">
              <Eye class="w-4 mt-0.5 mr-1" />
              <p class="mt-[3px]">{{ news.view_count ?? 0 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div
      class="flex flex-col text-[var(--text-title)] h-[790px] border-1 border-[#e0e0e0] dark:border-[#343434] rounded-[18px] px-[32px] pt-[28px]"
    >
      <div class="relative w-[580px] flex flex-col gap-[24px]"></div>
      <div class="flex">
        <div class="w-[150px] h-[150px] bg-gray-300 rounded-[20px]"></div>
        <div>
          <div class="w-[350px] h-[35px] mt-3 ml-5 bg-gray-300 rounded-[20px]"></div>
          <div class="w-[350px] h-[22px] mt-5 ml-5 bg-gray-300 rounded-[20px]"></div>
          <div class="w-[350px] h-[22px] mt-2 ml-5 bg-gray-300 rounded-[20px]"></div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="w-[450px] h-[35px] mt-3 bg-gray-300 rounded-[20px]"></div>
        <div class="w-[350px] h-[22px] mt-5 bg-gray-300 rounded-[20px]"></div>
        <div class="flex gap-3 mt-3">
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="w-[450px] h-[35px] mt-3 bg-gray-300 rounded-[20px]"></div>
        <div class="w-[350px] h-[22px] mt-5 bg-gray-300 rounded-[20px]"></div>
        <div class="flex gap-3 mt-3">
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="w-[450px] h-[35px] mt-3 bg-gray-300 rounded-[20px]"></div>
        <div class="w-[350px] h-[22px] mt-5 bg-gray-300 rounded-[20px]"></div>
        <div class="flex gap-3 mt-3">
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="w-[450px] h-[35px] mt-3 bg-gray-300 rounded-[20px]"></div>
        <div class="w-[350px] h-[22px] mt-5 bg-gray-300 rounded-[20px]"></div>
        <div class="flex gap-3 mt-3">
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
          <div class="w-[20px] h-[20px] mt-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
