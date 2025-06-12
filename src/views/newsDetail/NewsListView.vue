<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { fetchNewsData } from '@/api/fetchNews'
import NewsComponent1 from '@/components/NewsComponents/NewsComponent1.vue'
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'
import NewsComponent3 from '@/components/NewsComponents/NewsComponent3.vue'
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import economy from '@/assets/icons/communityDropdown/economy.svg'
import culture from '@/assets/icons/communityDropdown/culture.svg'
import celeb from '@/assets/icons/communityDropdown/celeb.svg'
import global from '@/assets/icons/communityDropdown/global.svg'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useNewsStore } from '@/stores/newsStore'
import supabase from '@/utils/supabase'

const newsList = ref([])
const randomNews = ref(null)
const router = useRouter()
const categories = ref(['전체', '정치', '경제', '사회', '문화', '스포츠', '연예', '해외'])
const activeCategory = ref('전체')
const swiperInstance = ref(null)
const newsStore = useNewsStore()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// swiper btn
const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}
// swiper btn
const slideNext = () => {
  swiperInstance.value?.slideNext()
}
// swiper 설정
const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}
// swiper 설정
const onSlideChange = () => {
  swiperInstance.value?.swiper
}
// category active
const selectCategory = (category) => {
  activeCategory.value = category
}

// 뉴스를 전역과 동시에 supabase db에 저장
const newsSavedHandler = async (news) => {
  newsStore.selectedNews = news

  const { data: savedNews, error } = await supabase
    .from('news')
    .select('news_id')
    .eq('news_id', news.article_id)
    .maybeSingle()

  if (error) {
    console.error('뉴스 저장 실패', error)
    return
  }

  if (!savedNews) {
    const { error: insertError } = await supabase.from('news').insert([
      {
        news_id: news.article_id,
        category_id: news.category_id,
        title: news.title,
        link: news.link,
        keywords: news.keywords,
        description: news.description,
        pub_date: news.pub_date,
        image_url: news.image_url,
        source_name: news.source_name,
        category: news.category,
      },
    ])
    if (insertError) {
      console.error('뉴스 저장 실패함', insertError)
    }
  }
}

onMounted(async () => {
  const fetchNews = await fetchNewsData('경제', 'ko')
  console.log('뉴스 데이터', fetchNews)
  newsList.value = fetchNews

  if (fetchNews.length > 0) {
    const randomIdx = Math.floor(Math.random() * fetchNews.length)
    randomNews.value = fetchNews[randomIdx]
  }
})
</script>
<template>
  <section class="w-full mt-6">
    <div class="w-full">
      <ul class="flex items-center">
        <li
          v-for="category in categories"
          :key="category"
          class="text-black px-4 py-2 rounded-lg mr-3 cursor-pointer transition duration-300"
          :class="[
            activeCategory === category
              ? 'bg-black text-white  dark:bg-[#7846D2] '
              : 'bg-[#F3F3F3]  dark:bg-[#363636] dark:text-white',
          ]"
          @click="selectCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
    </div>
  </section>
  <section>
    <div class="mx-auto max-w-[1240px] pt-8">
      <div class="section1">
        <div class="flex gap-10 mb-20">
          <NewsComponent1 :news-save-handler="newsSavedHandler" :news="randomNews" />

          <div class="flex flex-col gap-8.5">
            <NewsComponent2 :news-save-handler="newsSavedHandler" :news="randomNews" />
            <NewsComponent2 :news-save-handler="newsSavedHandler" :news="randomNews" />
            <NewsComponent2 :news-save-handler="newsSavedHandler" :news="randomNews" />
          </div>
        </div>
        <div class="mb-10">
          <h3 class="text-[30px] font-semibold mb-8 dark:text-white">최신뉴스</h3>
          <div class="flex justify-between">
            <NewsComponent3 :news-save-handler="newsSavedHandler" :news="randomNews" />
            <NewsComponent3 :news-save-handler="newsSavedHandler" :news="randomNews" />
            <NewsComponent3 :news-save-handler="newsSavedHandler" :news="randomNews" />
            <NewsComponent3 :news-save-handler="newsSavedHandler" :news="randomNews" />
            <NewsComponent3 :news-save-handler="newsSavedHandler" :news="randomNews" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <img
        src="@/assets/icons/moveToTop.svg"
        alt="move to top Button"
        class="cursor-pointer fixed bottom-0 right-[30px]"
        @click="scrollToTop"
      />
    </div>
  </section>
</template>
<style></style>
