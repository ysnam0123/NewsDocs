<script setup>
import { fetchHotDocs } from '@/api/fetchHotDocs'
import { Eye, ThumbsUp } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const hotDocs = ref([])
const router = useRouter()

const handleClick = (news) => {
  console.log(news)
  router.push(`/news/detail/${news.news_id}`)
}
onMounted(async () => {
  hotDocs.value = await fetchHotDocs()
})
</script>
<template>
  <div
    class="flex flex-col text-[var(--text-title)] sm:h-[790px] min-h-[578px] sm:w-full w-full border-1 border-[#e0e0e0] dark:border-[#343434] rounded-[18px] sm:px-[32px] px-3 sm:pt-[28px] pt-3"
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
              <p class="mt-[3px] mr-0.5">{{ news.like_count ?? 0 }}</p>
            </div>
            <div class="flex gap-[4px] items-center text-[13px] text-[#939393]">
              <Eye class="w-4.5 mt-0.5 mr-1" />
              <p class="mt-[3px]">{{ news.view_count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
