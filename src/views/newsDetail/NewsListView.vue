<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import politicsIcon from '@/assets/icons/politicsIcon.svg'
import sportsIcon from '@/assets/icons/sportsIcon.svg'
import entertainmentIcon from '@/assets/icons/entertainmentIcon.svg'
import cultureIcon from '@/assets/icons/cultureIcon.svg'
import worldIcon from '@/assets/icons/worldIcon.svg'
import moveTop from '@/assets/icons/moveToTop.svg'
import runDog from '@/assets/img/run_dog.png'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import NewsComponent0 from '@/components/NewsComponents/NewsComponent0.vue'
import NewsComponent4 from '@/components/NewsComponents/NewsComponent4.vue'
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'
import NewsComponent7 from '@/components/NewsComponents/NewsComponent7.vue'
import NewsComponent9 from '@/components/NewsComponents/NewsComponent9.vue'
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'
import NCSkel9 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel9.vue'
import NCSkel0 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel0.vue'
import NCSkel4 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel4.vue'
import SNCSkel from '@/components/NewsComponents/skeleton/NewsComponentSkel/SNCSkel.vue'
import NCSkel5 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel5.vue'
import NCSkel6 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel6.vue'
import NCSkel10 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel10.vue'
import NCSkel7 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel7.vue'
import supabase from '@/utils/supabase'
import { getFreshNews, getFreshRamdomNews } from '@/composables/newsCache'

const user = ref(null)
const loading = ref(true)
const isLoggedIn = ref(false)
const interests = [
  'politics',
  'sports',
  'entertainment',
  'culture',
  'world',
  'society',
  'economy',
  'other',
]

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const allNews = ref()
const posts = ref([])
const router = useRouter()
const swiperInstance = ref(null)
const randomResult = ref()

// swiper left
const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}
// swiper right
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

onMounted(async () => {
  const {
    data: { user: supaUser },
  } = await supabase.auth.getUser()
  user.value = supaUser
  isLoggedIn.value = !!supaUser
  console.log('isLoggedIn:', isLoggedIn.value)

  const storedRandom = localStorage.getItem('randomResult')
  if (storedRandom) {
    randomResult.value = JSON.parse(storedRandom)
    console.log('로컬스토리지에서 불러온 랜덤뉴스:', randomResult.value)
  } else {
    const randomData = await getFreshRamdomNews('ko')
    randomResult.value = randomData
    localStorage.setItem('randomResult', JSON.stringify(randomResult.value))
    console.log('새로 받아온 랜덤뉴스:', randomResult.value)
  }

  const storedNews = localStorage.getItem('allNews')
  if (storedNews) {
    allNews.value = JSON.parse(storedNews)
    console.log('로컬스토리지에서 불러온 뉴스:', allNews.value)
    loading.value = false
    return
  }

  loading.value = true

  try {
    // 각 카테고리에 대해 뉴스 가져오기
    // const newsResults = []
    // for (const category of interests) {
    //   console.log(`뉴스 가져오기: ${category}`)
    //   const result = await getFreshNews(category, 'ko')
    //   newsResults.push(result)
    //   await new Promise((resolve) => setTimeout(resolve, 300))
    // }
    const newsResults = await Promise.all(interests.map((category) => getFreshNews(category, 'ko')))
    allNews.value = newsResults
    // 모든 관심사 뉴스를 로컬스토리지에 저장
    localStorage.setItem('allNews', JSON.stringify(newsResults))
    console.log('로컬스토리지에 저장됨:', allNews.value)
    loading.value = false
  } catch (error) {
    console.error('Error fetching news:', error)
    loading.value = false
  }

  console.log('로딩 종료:', loading.value)
})
</script>

<template>
  <section>
    <div class="mx-auto max-w-[1240px] pt-8">
      <div class="sm:flex sm:flex-col hidden">
        <div v-if="!loading && randomResult" class="flex gap-10 mb-20 items-center">
          <NewsComponent0 :news="randomResult[0]" class="w-[786px]" />
          <NewsComponent4 :news="randomResult[1]" />
        </div>
        <div v-else class="flex gap-10 mb-15 items-center">
          <NCSkel0 />
          <NCSkel4 />
        </div>
        <div class="mb-10">
          <h3 class="text-[30px] font-semibold mb-8 dark:text-white">최신뉴스</h3>
          <div v-if="!loading" class="flex justify-between overflow-x-auto">
            <NewsComponent9 :news="randomResult[2]" />
            <NewsComponent9 :news="randomResult[3]" />
            <NewsComponent9 :news="randomResult[4]" />
            <NewsComponent9 :news="randomResult[5]" />
          </div>
          <NCSkel9 v-else />
        </div>
      </div>
      <div class="section1 sm:hidden block ml-4 gap-4 overflow-x-auto">
        <h3 class="text-2xl font-semibold mb-4 dark:text-white">최신뉴스</h3>

        <div v-if="!loading && randomResult" class="flex gap-4 mb-20 items-center">
          <NewsComponent9 :news="randomResult[0]" />
          <NewsComponent9 :news="randomResult[1]" />
          <NewsComponent9 :news="randomResult[2]" />
          <NewsComponent9 :news="randomResult[3]" />
          <NewsComponent9 :news="randomResult[4]" />
          <NewsComponent9 :news="randomResult[5]" />
        </div>
        <div v-else>
          <NCSkel9 />
        </div>
      </div>
      <div
        class="section2 hidden sm:flex h-[524px] relative w-screen bg-[#F6F6F6] dark:bg-[#181818] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      >
        <div class="max-w-[1240px] mx-auto h-[524px] mb-15">
          <div class="flex items-center pt-10 justify-between">
            <div class="flex items-center">
              <h3 class="flex text-[30px] font-semibold dark:text-white">Shorts Docs</h3>
              <span class="text-[#7A42DF] dark:text-[#A878FD] text-md ml-4 justify-center"
                >3초만에 확인해요
              </span>
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
              v-if="!loading"
              ref="swiperRef"
              :slides-per-view="4"
              :centered-slides="false"
              :space-between="20"
              :pagination="false"
              :navigation="false"
              :modules="[Navigation, Pagination]"
              @slideChange="onSlideChange"
              @swiper="onSwiper"
            >
              <swiper-slide
                v-for="(news, index) in randomResult.slice(6)"
                :key="index"
                class="!w-[292px]"
              >
                <SlideNewsComponent :news="news" />
              </swiper-slide>
            </swiper>
            <SNCSkel v-else />
          </div>
        </div>
      </div>
      <div class="section2 flex sm:hidden w-screen bg-[#F6F6F6]">
        <div class="mx-auto h-[524px] ml-4 mb-15">
          <div class="flex items-center pt-15 justify-between">
            <div class="flex items-center">
              <h3 class="flex text-[30px] font-semibold dark:text-white">Shorts Docs</h3>
              <span class="text-[#7A42DF] dark:text-[#A878FD] text-md ml-4 justify-center"
                >3초만에 확인해요
              </span>
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
              v-if="!loading"
              ref="swiperRef"
              :slides-per-view="4"
              :centered-slides="false"
              :space-between="20"
              :pagination="false"
              :navigation="false"
              :modules="[Navigation, Pagination]"
              @slideChange="onSlideChange"
              @swiper="onSwiper"
            >
              <swiper-slide
                v-for="(news, index) in randomResult.slice(6)"
                :key="index"
                class="!w-[292px]"
              >
                <SlideNewsComponent :news="news" />
              </swiper-slide>
            </swiper>
            <SNCSkel v-else />
          </div>
        </div>
      </div>

      <div class="section3 sm:flex hidden gap-10 mt-12.5">
        <div class="w-[608px]">
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
              <img :src="politicsIcon" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">정치</span>
            </div>
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5 :news="allNews[0][0]" />
              <NewsComponent5 :news="allNews[0][1]" />
            </div>
            <NCSkel5 v-else />
          </div>
        </div>

        <div class="w-[608px] mt-19.5">
          <div class="flex flex-wrap">
            <div class="flex gap-2 mb-6">
              <img :src="sportsIcon" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">스포츠</span>
            </div>
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent6 :news="allNews[1][0]" />
              <NewsComponent6 :news="allNews[1][1]" />
            </div>
            <NCSkel6 v-else />
          </div>
        </div>
      </div>

      <div class="section3 flex sm:hidden gap-10 mt-12.5">
        <div class="w-[608px]">
          <div class="select-none flex items-center gap-5 mb-7.5">
            <h3 class="flex gap-2.5 font-semibold text-[32px] dark:text-white">분야별 뉴스</h3>
            <div class="flex">
              <h2 class="text-[#7A4EdF] dark:text-[#A878FD] text-[16px]">
                관심이 생기면 관심사로 등록해요
              </h2>
            </div>
          </div>
          <div class="sm:flex sm:flex-col">
            <div class="flex-wrap">
              <div class="flex gap-2 mb-6">
                <img :src="politicsIcon" class="w-8 h-8 mt-0.5" />
                <span class="text-[26px] font-semibold dark:text-white">정치</span>
              </div>
              <div v-if="!loading" class="flex flex-col gap-4">
                <NewsComponent5 :news="allNews[0][0]" />
                <NewsComponent5 :news="allNews[0][1]" />
              </div>
              <NCSkel5 v-else />
            </div>
          </div>

          <div class="w-[608px] mt-19.5">
            <div class="flex flex-wrap">
              <div class="flex gap-2 mb-6">
                <img :src="sportsIcon" class="w-8 h-8 mt-0.5" />
                <span class="text-[26px] font-semibold dark:text-white">스포츠</span>
              </div>
              <div v-if="!loading" class="flex flex-col gap-4">
                <NewsComponent6 :news="allNews[1][0]" />
                <NewsComponent6 :news="allNews[1][1]" />
              </div>
              <NCSkel6 v-else />
            </div>
          </div>
        </div>
      </div>

      <div class="sm:flex block gap-[40px] my-12.5">
        <div class="flex flex-wrap">
          <div class="flex gap-2 mb-6">
            <img :src="entertainmentIcon" class="w-8 h-8 mt-0.5" />
            <span class="text-[26px] font-semibold dark:text-white">연예</span>
          </div>
          <div v-if="!loading" class="w-[600px] flex gap-4">
            <NewsComponent10 :news="allNews[2][0]" />
            <NewsComponent10 :news="allNews[2][1]" />
          </div>
          <NCSkel10 v-else />
        </div>
        <div class="w-[600px]">
          <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
            <h1 class="flex gap-[10px] items-center">
              <img :src="cultureIcon" alt="culture" class="w-8 h-8 mt-0.5" />
              <p class="text-[26px] font-semibold dark:text-white">문화</p>
            </h1>
          </div>
          <div v-if="!loading" class="flex flex-col gap-[15px]">
            <NewsComponent6 :news="allNews[3][0]" />
            <NewsComponent6 :news="allNews[3][1]" />
          </div>
          <NCSkel6 v-else />
        </div>
      </div>

      <div class="w-full mb-10">
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img :src="worldIcon" alt="global" class="w-8 h-8 mt-0.5" />
            <p class="text-[26px] font-semibold dark:text-white">해외</p>
          </h1>
        </div>
        <div v-if="!loading" class="flex gap-10">
          <div class="flex flex-col gap-[15px]">
            <NewsComponent7 :news="allNews[4][0]" />

            <NewsComponent7 :news="allNews[4][1]" />
          </div>
          <div class="flex flex-col gap-[15x]">
            <NewsComponent7 :news="allNews[4][2]" />

            <NewsComponent7 :news="allNews[4][3]" />
          </div>
        </div>
        <NCSkel7 v-else />
      </div>

      <div
        class="sm:rounded-3xl bg-[#F8F8F8] dark:bg-[#1F1F1F] dark:text-white w-full sm:w-[1240px] rounded-none h-[510px] px-[60px] py-[53px] mb-[100px]"
      >
        <h1 class="text-[30px] font-semibold mb-[32px]">
          나의 관심사에 대해 사람들과 이야기해보세요!
        </h1>
        <template v-if="posts.length > 0">
          <div class="flex justify-between gap-[24px]">
            <NewsComponentCommunity
              v-for="post in posts.slice(0, 3)"
              :key="post.post_id"
              :post="post"
            />
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col items-center justify-center mt-8">
            <img :src="runDog" alt="강아지 이미지" class="w-[200px] h-[200px]" />
            <span class="text-lg text-[#8F8F8F]"
              >게시글을 등록하고 다양한 의견을 나누어보세요!</span
            >
          </div>
        </template>
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
        :src="moveTop"
        alt="move to top Button"
        class="cursor-pointer fixed bottom-0 right-[30px]"
        @click="scrollToTop"
      />
    </div>
  </section>
</template>
<style></style>
