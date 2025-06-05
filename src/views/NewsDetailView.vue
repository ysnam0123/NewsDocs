<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import supabase from '@/utils/supabase'

const route = useRoute()
const newsId = route.params.id
const news = ref(null)

onMounted(async () => {
  const { data, error } = await supabase.from('news_data').select('*').eq('id', newsId).single()

  if (error) {
    console.error('뉴스 가져오기 실패', error)
  } else {
    news.value = data
  }
})
</script>
<template>
  <div
    v-if="news"
    class="w-[90%] flex-1 ml-2 my-20 justify-center text-center border-1 border-gray-300 rounded-lg"
  >
    <div class="w-16 bg-[#7537E3] text-white mt-3 ml-4 px-3 py-0.5 text-center text-sm rounded-lg">
      <span># 연예</span>
    </div>
    <h1 class="text-3xl my-4 text-bold">{{ news.title }}</h1>
    <img :src="news.image_url" class="mx-auto mb-20 rounded-2xl" />
    <p class="text-md mx-20 text-left">
      {{ news.description }}
    </p>
    <button class="cursor-pointer mb-10"><a :href="news.url"></a>원문보기</button>
  </div>
  <p v-else>로딩중...</p>
</template>
