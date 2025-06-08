<script setup>
// import { fetchKoreanNewsData } from '@/api/fetchNews'
import { getNewsList } from '@/api/getSupabaseNews'
// import { useRouter } from 'vue-router'
// import { saveNewsToSupabase } from '@/api/saveNews'
import { onMounted, ref } from 'vue'
import NewsComponent1 from '@/components/NewsComponents/NewsComponent1.vue'
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
import NewsComponent3 from '@/components/NewsComponents/NewsComponent3.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'

const newsList = ref([])
// const router = useRouter()
// const handleFetchAndSave = async () => {
//   const KoreanNews = await fetchKoreanNewsData('연예')
//   await saveNewsToSupabase(KoreanNews, 'ko')
//   newsList.value = await getNewsList()
// }

// const clickhandler = (newsItem) => {
//   router.push(`/news/${newsItem.id}`)
// }

onMounted(async () => {
  newsList.value = await getNewsList()
  // handleFetchAndSave()
})
</script>
<template>
  <div class="pb-10">
    <section class="justify-center item-center flex-1 mr-10">
      <div>
        <NewsComponent1 />
        <NewsComponent2 />
        <NewsComponent3 />
        <NewsComponent6 />
      </div>
      <!-- <p v-else>뉴스데이터가 없습니다.</p> -->
    </section>
  </div>
</template>
<style></style>
