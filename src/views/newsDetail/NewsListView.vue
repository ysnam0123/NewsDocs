<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { fetchKoreanData } from '@/api/fetchNews'
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

const news = ref(null)
const newsList = ref([])
const router = useRouter()
const categories = ref(['전체', '정치', '경제', '사회', '문화', '스포츠', '연예', '해외'])
const activeCategory = ref('전체')
const swiperInstance = ref(null)

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
// swiper 설정햣
const onSlideChange = () => {
  swiperInstance.value?.swiper
}

// category active
const selectCategory = (category) => {
  activeCategory.value = category
}

const newsDetailHandler = (news_id) => {
  router.push(`/news/detail/${news_id}`)
}

onMounted(async () => {
  const fetchNews = await fetchKoreanData('정치')
  console.log('뉴스 데이터', fetchNews)
  newsList.value = fetchNews
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
          <NewsComponent1 :news="news" :news-detail="newsDetailHandler" />
          <div class="flex flex-col gap-8.5">
            <NewsComponent2 :news="news" :news-detail="newsDetailHandler" />
            <NewsComponent2 />
            <NewsComponent2 />
          </div>
        </div>
        <div class="mb-10">
          <h3 class="text-[30px] font-semibold mb-8 dark:text-white">최신뉴스</h3>
          <div class="flex justify-between">
            <NewsComponent3 />
            <NewsComponent3 />
            <NewsComponent3 />
            <NewsComponent3 />
            <NewsComponent3 />
          </div>
        </div>
      </div>

      <!-- 섹션 3 : 슬라이드 카드뉴스 -->
      <div
        class="h-[524px] relative w-screen bg-[#F6F6F6] dark:bg-[#181818] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      >
        <!-- 제목 -->
        <div class="max-w-[1240px] mx-auto h-[524px] mb-15">
          <div class="flex items-center pt-10 justify-between">
            <div class="flex items-center">
              <h3 class="flex text-[30px] font-semibold dark:text-white">Shorts Docs</h3>
              <span class="text-[#7A42DF] dark:text-[#A878FD] text-md ml-4 justify-center"
                >3초만에 확인해요</span
              >
            </div>

            <section class="flex right-0 gap-2">
              <div
                @click="slidePrev"
                class="w-10 h-10 bg-white dark:bg-[#3C3C3C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E0E0E0] dark:hover:bg-[#4A4A4A] transition duration-300"
              >
                <ChevronLeft class="dark:stroke-white" stroke-width="1" />
              </div>
              <div
                @click="slideNext"
                class="w-10 h-10 bg-white dark:bg-[#3C3C3C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E0E0E0] dark:hover:bg-[#4A4A4A] transition duration-300"
              >
                <ChevronRight class="dark:stroke-white" stroke-width="1" />
              </div>
            </section>
          </div>
          <div class="flex w-full mt-4">
            <swiper
              ref="swiperRef"
              :slides-per-view="5"
              :centered-slides="false"
              :space-between="20"
              :pagination="false"
              :navigation="false"
              :modules="[Navigation, Pagination]"
              @slideChange="onSlideChange"
              @swiper="onSwiper"
            >
              <swiper-slide v-for="n in 10" :key="n" class="!w-[300px]">
                <SlideNewsComponent />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <div class="flex gap-10 mt-12.5">
        <div class="w-[608px]">
          <!-- 제목 -->
          <div class="select-none flex items-center gap-5 mb-7.5">
            <h3 class="flex gap-2.5 font-semibold text-[32px] dark:text-white">분야별 뉴스</h3>
            <div class="flex">
              <h2 class="text-[#7A4EdF] dark:text-[#A878FD] text-[16px]">
                관심이 생기면 관심사로 등록해요
              </h2>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="flex gap-2 mb-6">
              <img :src="economy" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">경제</span>
            </div>
            <div class="flex flex-col gap-4">
              <NewsComponent5 />
              <NewsComponent5 />
            </div>
          </div>
        </div>
        <div class="w-[608px] mt-19.5">
          <!-- 제목 -->

          <div class="flex flex-wrap">
            <div class="flex gap-2 mb-6">
              <img :src="culture" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">문화</span>
            </div>
            <div class="flex flex-col gap-4">
              <NewsComponent6 />
              <NewsComponent6 />
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-[40px] my-12.5">
        <div class="flex flex-wrap">
          <div class="flex gap-2 mb-6">
            <img :src="celeb" class="w-8 h-8 mt-0.5" />
            <span class="text-[26px] font-semibold dark:text-white">연예</span>
          </div>
          <div class="flex gap-4">
            <NewsComponent10 />
            <NewsComponent10 />
          </div>
        </div>
        <div class="w-[600px]">
          <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
            <h1 class="flex gap-[10px] items-center">
              <img :src="global" alt="global" class="w-8 h-8 mt-0.5" />
              <p class="text-[26px] font-semibold dark:text-white">해외</p>
            </h1>
            <div class="ml-auto cursor-pointer">
              <h3 class="text-[16px] text-[#191919] underline font-medium select-none">더보기</h3>
            </div>
          </div>
          <div class="flex flex-col gap-[15px]">
            <NewsComponent6 />
            <NewsComponent6 />
          </div>
        </div>
      </div>

      <div
        class="rounded-3xl bg-[#F8F8F8] dark:bg-[#1F1F1F] dark:text-white w-[1240px] h-[510px] px-[60px] py-[53px] mb-[100px]"
      >
        <h1 class="text-[30px] font-semibold mb-[32px]">
          나의 관심사에 대해 사람들과 이야기해보세요!
        </h1>
        <div class="flex flex-row justify-between gap-[24px]">
          <NewsComponentCommunity />
          <NewsComponentCommunity />
          <NewsComponentCommunity />
        </div>
        <button
          @click="router.push('/community')"
          class="mx-auto mt-[42px] flex rounded-[8px] justify-center items-center w-[194px] h-[50px] text-white text-[16px] bg-[#7537E3] cursor-pointer hover:bg-[#601ED5] dark:bg-[#7846D2] dark:hover:bg-[#6524D9] transition duration-300"
        >
          글쓰러 가기
        </button>
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
