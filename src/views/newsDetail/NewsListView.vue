<script setup>
// import { fetchKoreanNewsData } from '@/api/fetchNews'
import { getNewsList } from '@/api/getSupabaseNews'
// import { useRouter } from 'vue-router'
// import { saveNewsToSupabase } from '@/api/saveNews'
import { onMounted, ref } from 'vue'
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'

const newsList = ref([])
const categories = ref(['전체', '정치', '경제', '사회', '문화', '스포츠', '연예', '해외'])
const activeCategory = ref('전체')
// const router = useRouter()
// const handleFetchAndSave = async () => {
//   const KoreanNews = await fetchKoreanNewsData('연예')
//   await saveNewsToSupabase(KoreanNews, 'ko')
//   newsList.value = await getNewsList()
// }

const selectCategory = (category) => {
  activeCategory.value = category
}
// const clickhandler = (newsItem) => {
//   router.push(`/news/${newsItem.id}`)
// }

onMounted(async () => {
  newsList.value = await getNewsList()
  // handleFetchAndSave()
})
</script>
<template>
  <section class="w-full">
    <div class="w-full">
      <span
        v-for="category in categories"
        :key="category"
        class="text-black px-4 py-2.5 rounded-lg mr-4 cursor-pointer transition duration-300"
        :class="[activeCategory === category ? 'bg-black text-white' : 'bg-[#F3F3F3]']"
        @click="selectCategory(category)"
        >{{ category }}</span
      >

      <div class="pb-10">
        <div class="justify-center item-center flex-1 mr-10">
          <div>
            <NewsComponent2 />
            <NewsComponent6 />
          </div>
          <!-- <p v-else>뉴스데이터가 없습니다.</p> -->
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>
