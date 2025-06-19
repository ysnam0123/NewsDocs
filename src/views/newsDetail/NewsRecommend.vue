<script setup>
import { ref, onMounted } from 'vue'
import supabase from '@/utils/supabase'
import { categoryNameMap } from '@/composables/useCategoryMap'

const props = defineProps({
  categoryId: { type: Number, required: true },
})

const recommendedList = ref([])

const parseCategory = (category) => {
  if (!category) return ''
  let value = category
  if (Array.isArray(category)) {
    value = category[0]
  } else if (typeof category === 'string' && value.startsWith('[')) {
    try {
      const arr = JSON.parse(value)
      value = Array.isArray(arr) ? arr[0] : value
    } catch (e) {
      console.log(e, '파싱실패...')
    }
  }
  return categoryNameMap[value] || value
}
onMounted(async () => {
  if (!props.categoryId) return
  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('category_id', props.categoryId)
    .limit(3) // 예: 10개 받아오기

  if (data && data.length > 0) {
    recommendedList.value = data
  }
  console.log('추천 뉴스 리스트:', recommendedList.value)
})
</script>

<template>
  <section class="mt-10 sticky top-[60px]">
    <div v-if="recommendedList.length > 0">
      <div
        v-for="news in recommendedList"
        :key="news.news_id"
        class="w-[307px] flex cursor-pointer mb-4"
      >
        <router-link :to="`/news/detail/${news.news_id}`" class="flex w-full">
          <div class="block">
            <span class="text-[13px] text-[#7F7F7F]">
              #{{ parseCategory(news.category) || '카테고리' }}
            </span>
            <h3
              class="text-[#191919] hover:text-[#8F8F8F] dark:text-[#DBDBDB] dark:hover:text-[#999999]"
            >
              {{ news.title }}
            </h3>
          </div>
          <img
            class="rounded-lg w-[80px] h-[60px] object-cover ml-2"
            :src="news.image_url"
            :alt="news.title"
          />
        </router-link>
      </div>
    </div>
    <div v-else>
      <span class="text-sm text-gray-400">추천할 뉴스가 없습니다.</span>
    </div>
  </section>
</template>
