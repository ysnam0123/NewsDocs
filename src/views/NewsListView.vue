<script setup>
import { getNewsList } from '@/api/getSupabaseNews'
import { onMounted, ref } from 'vue'

const newsList = ref([])

onMounted(async () => {
  newsList.value = await getNewsList()
})
</script>
<template>
  <div>
    <section class="w-full block">
      <div class="flex w-auto justify-center item-center">
        <h1 className="text-[#d9d9d9] text-4xl">뉴스 data</h1>
        <ul v-if="newsList.length">
          <li v-for="news in newsList" :key="news.id">
            <h2>{{ news.title }}</h2>
            <p>{{ news.description }}</p>
            <a :href="news.url">원문 보기</a>
            <p class="text-[30px]">{{ news.source_name }}</p>
          </li>
        </ul>
        <p v-else>뉴스데이터가 없습니다.</p>
      </div>
    </section>
  </div>
</template>
<style></style>
