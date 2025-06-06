<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import supabase from '@/utils/supabase'
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'

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
  <section
    v-if="news"
    class="w-[90%] flex-1 ml-2 my-20 justify-center text-center border-1 border-gray-300 rounded-xl"
  >
    <div class="w-16 bg-[#7537E3] text-white mt-3 ml-4 px-3 py-0.5 text-center text-sm rounded-lg">
      <span># 연예</span>
    </div>
    <h1 class="text-3xl my-4 text-bold">{{ news.title }}</h1>
    <img :src="news.image_url" class="mx-auto mb-20 w-[800px] h-auto rounded-2xl px-20" />
    <p class="text-md mx-10 text-left">
      {{ news.description }}
    </p>
    <button class="cursor-pointer mb-10 text-gray-400">
      <a :href="news.url" target="_blank">원문보기</a>
    </button>
  </section>
  <section v-else>
    <p>로딩중...</p>
  </section>
  <section>
    <h2 class="text-xl mb-6">관심 가질만한 다른 뉴스</h2>
    <div class="flex sm:gap-2 md:gap-10 ml-14 mb-10">
      <NewsComponent2 class="border-1 border-gray-200 rounded-2xl" />
      <NewsComponent2 class="border-1 border-gray-200 rounded-2xl ml-10" />
    </div>
  </section>
  <section class="pb-10">
    <div class="mb-20">
      <div class="flex justify-between mb-10">
        <h2 class="text-xl">
          <strong class="text-[#6046CF]">'스포츠'</strong> 에 대한 다른 유저의 생각
        </h2>
        <button class="text-gray-300 text-sm cursor-pointer mt-0.5">더보기</button>
      </div>
      <!-- v-for="post in posts" :key="post.id" -->
      <div class="border-1 border-gray-200 rounded-2xl pt-5 pl-4 mb-4">
        <div class="flex h-26">
          <div class="flex">
            <img src="@/assets/img/logo.png" class="w-10 h-10 mr-2" />
          </div>
          <div class="block mt-1">
            <p class="text-lg text-gray-600">안녕하세여</p>
            <p class="mt-5">여러분 투표는 누구에게 하셨나여????????? 아무튼 화이팅</p>
          </div>
        </div>
      </div>
      <div class="border-1 border-gray-200 rounded-2xl pt-5 pl-4">
        <div class="flex h-26">
          <div class="flex">
            <img src="@/assets/img/logo.png" class="w-10 h-10 mr-2" />
          </div>
          <div class="block mt-1">
            <p class="text-lg text-gray-600">안녕하세여</p>
            <p class="mt-5">여러분 투표는 누구에게 하셨나여????????? 아무튼 화이팅</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
