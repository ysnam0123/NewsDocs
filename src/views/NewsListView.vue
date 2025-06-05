<script setup>
// import { fetchKoreanNewsData } from '@/api/fetchNews'
import { getNewsList } from '@/api/getSupabaseNews'
import { useRouter } from 'vue-router'
// import { saveNewsToSupabase } from '@/api/saveNews'
import { onMounted, ref } from 'vue'

const newsList = ref([])
const router = useRouter()
// const handleFetchAndSave = async () => {
//   const KoreanNews = await fetchKoreanNewsData('연예')
//   await saveNewsToSupabase(KoreanNews, 'ko')
//   newsList.value = await getNewsList()
// }

const clickhandler = (newsItem) => {
  router.push(`/news/${newsItem.id}`)
}

onMounted(async () => {
  newsList.value = await getNewsList()

  // handleFetchAndSave()
})
</script>
<template>
  <div>
    <section class="justify-center item-center flex-1 mr-10">
      <div v-if="newsList.length">
        <div
          class="border-1 border-gray-300 rounded-2xl my-4 ml-4"
          v-for="news in newsList"
          :key="news.id"
        >
          <div class="flex justify-end">
            <button
              class="cursor-pointer text-sm text-gray-500 rounded-lg w-17.5 h-7.5 mt-2 mr-2"
              @click="clickhandler(news)"
            >
              원문 보기
            </button>
          </div>
          <img />
          <div class="text-left">
            <h1 class="text-2xl mt-6 mb-4 mx-10 overflow-hidden line-clamp-1 md:line-clamp-2">
              {{ news.title }}
            </h1>
            <p class="text-md break-words overflow-hidden line-clamp-2 md:line-clamp-3 mx-10">
              {{ news.description }}
            </p>
            <p class="text-xs mt-5 mr-3 mb-2 text-right">출처 : {{ news.source_name }}</p>
          </div>
        </div>
      </div>
      <p v-else>뉴스데이터가 없습니다.</p>
    </section>
  </div>
</template>
<style></style>
