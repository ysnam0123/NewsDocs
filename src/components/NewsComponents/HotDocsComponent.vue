<script setup>
import { fetchHotDocs } from '@/api/fetchHotDocs'
import { ThumbsUp } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ViewCount from '../common/ViewCount.vue'

const hotDocs = ref([])
const router = useRouter()

const handleClick = (news) => {
  console.log(news)
  router.push(`/news/detail/${news.news_id}`)
}
onMounted(async () => {
  hotDocs.value = await fetchHotDocs()
})

onMounted(() => {
  console.log('hotNewsList:', hotDocs.value)
  hotDocs.value.forEach((news) => {
    console.log('각 news_id:', news.news_id)
  })
})
</script>
<template>
  <div
    class="flex flex-col text-[var(--text-title)] h-[790px] border-1 border-[#e0e0e0] dark:border-[#343434] rounded-[18px] px-[32px] pt-[28px]"
  >
    <div
      v-for="(news, index) in hotDocs"
      :key="news.news_id"
      @click="handleClick(news)"
      :class="[
        'flex gap-[20px] w-[496px] cursor-pointer',
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
          class="w-[151px] h-[151px] rounded-[20px] object-cover"
        />
        <div :class="['flex flex-col', index === 0 ? 'w-[325px]' : 'w-full']">
          <h1 class="mb-[11px] font-semibold text-[18px]">{{ news.title }}</h1>
          <span class="mb-[15px] text-[#7f7f7f] line-clamp-2">
            {{ news.description }}
          </span>
          <div class="flex gap-[8px]">
            <div class="flex gap-[4px] items-center text-[13px] text-[#939393]">
              <ThumbsUp class="w-4 mt-0.5 mr-1" />
              <p class="mt-[3px] mr-0.5">{{ news.like_count ?? 0 }}</p>
            </div>
            <div class="flex gap-[4px] items-center text-[13px] text-[#939393]">
              <ViewCount :news-id="news.news_id" />
              <p class="mt-[3px]">{{ news.view_count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
