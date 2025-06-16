<script setup>
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { fetchNewsData, fetchRandomNews, fetchShortDocs } from '@/api/fetchNews'

import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'
// import NewsComponent3 from '@/components/NewsComponents/NewsComponent3.vue'
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import economy from '@/assets/icons/communityDropdown/economy.svg'
import culture from '@/assets/icons/communityDropdown/culture.svg'
import celeb from '@/assets/icons/communityDropdown/celeb.svg'
import global from '@/assets/icons/communityDropdown/global.svg'
import moveTop from '@/assets/icons/moveToTop.svg'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import supabase from '@/utils/supabase'

import NewsComponent4 from '@/components/NewsComponents/NewsComponent4.vue'
import NewsComponent0 from '@/components/NewsComponents/NewsComponent0.vue'
import runDog from '@/assets/img/run_dog.png'
import NewsComponent9 from '@/components/NewsComponents/NewsComponent9.vue'
import NewsComponent7 from '@/components/NewsComponents/NewsComponent7.vue'

import { useInterestStore } from '@/stores/interestStore'
import NCSkel9 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel9.vue'
import NCSkel0 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel0.vue'
import NCSkel4 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel4.vue'
import SNCSkel from '@/components/NewsComponents/skeleton/NewsComponentSkel/SNCSkel.vue'
import NCSkel5 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel5.vue'
import NCSkel6 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel6.vue'
import NCSkel10 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel10.vue'
import NCSkel7 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel7.vue'

// const newsList = ref([])
// const randomNews = ref(null)
const router = useRouter()
// const categories = ref(['전체', '정치', '경제', '사회', '문화', '스포츠', '연예', '해외'])
// const activeCategory = ref('전체')
const swiperInstance = ref(null)
// const resetPoint = ref(0)
const posts = ref([])
// const cateGroupMap = {
//   전체: 0,
//   정치: 1,
//   스포츠: 2,
//   연예: 3,
//   문화: 4,
//   해외: 5,
//   사회: 6,
//   경제: 7,
// }

const interestStore = useInterestStore()
const interestList = computed(() => interestStore.interestList)
const allNews = ref([])
const loading = ref(true)
// const loading = true
const allRandomNews = ref([])
const shortDocs = ref([])

// 각 인덱스별 존재 여부를 안전하게 체크하는 computed 변수들

const hasShortDocs = computed(() => Array.isArray(shortDocs.value) && shortDocs.value.length > 0)
const hasRanNews = computed(
  () => Array.isArray(allRandomNews.value) && allRandomNews.value.length > 0,
)

const hasNews1 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 1)
const hasNews2 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 2)
const hasNews3 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 3)
const hasNews5 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 5)
const hasNews6 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 5)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
// category active, 그리고 카테고리에 맞게 뉴스refetch
// const selectCategory = async (category) => {
//   activeCategory.value = category

//   const fetchNews = await fetchNewsData(category === '전체' ? '' : category, 'ko')
//   newsList.value = fetchNews

//   if (fetchNews.length > 0) {
//     const randomIdx = Math.floor(Math.random() * fetchNews.length)
//     randomNews.value = fetchNews[randomIdx]
//   }

//   resetPoint.value++
// }

const getLikeCount = async (postId) => {
  const { count } = await supabase
    .from('like')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId)

  return count || 0
}

// watch(
//   () => activeCategory.value,
//   async (newCategory) => {
//     const categoryId = cateGroupMap[newCategory]

//     let query = supabase.from('post').select(
//       `
//         post_id,
//         title,
//         contents,
//         category_id,
//         profiles (
//           nickname,
//           profile_img
//         ),
//         comments!comments_post_id_fkey (
//           comments_id,
//           contents
//     )
//       `,
//     )

//     if (categoryId) {
//       query = query.in('category_id', categoryId)
//     }

//     const { data, error } = await query

//     if (error) {
//       console.error('post 불러오기 실패', error)
//       return
//     }

//     for (const post of data) {
//       const likeCount = await getLikeCount(post.post_id)
//       post.like_count = likeCount
//     }

//     posts.value = data
//     console.log('불러온 posts:', posts.value)
//   },
//   { immediate: true },
// )

// 1. 다른카테고리 뉴스 순차 로딩 (with delay)
const loadInterestNews = async () => {
  try {
    const newsResults = []
    for (const item of interestList.value) {
      const result = await fetchNewsData(item.id, 'ko')
      newsResults.push(result)
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
    allNews.value = newsResults
    console.log('관심 뉴스', allNews.value)
  } catch (error) {
    console.error('Error fetching news:', error)
  }
}

// 2. 랜덤 뉴스, 숏독스 병렬처리
const loadRandomAndShorDocs = async () => {
  try {
    const [randomResult, shortDocsResult] = await Promise.all([
      fetchRandomNews('ko'),
      fetchShortDocs('new', 'ko'),
    ])
    allRandomNews.value = [randomResult]
    shortDocs.value = shortDocsResult
    console.log('랜덤뉴스:', allRandomNews.value)
    console.log('숏독스:', shortDocs.value)
  } catch (error) {
    console.error('Error in random/shortDocs fetch:', error)
  }
}

onMounted(async () => {
  loading.value = true
  await loadInterestNews()
  await loadRandomAndShorDocs()
  loading.value = false
  console.log('로딩 종료:', loading.value)
})
</script>

<template>
  <section>
    <div class="mx-auto max-w-[1240px] pt-8">
      <div class="section1">
        <div v-if="!loading" class="flex gap-10 mb-20 items-center">
          <NewsComponent0 v-if="hasRanNews" :news="allRandomNews[0][0]" />
          <NewsComponent4 v-if="hasRanNews" :news="allRandomNews[0][1]" />
        </div>
        <div v-else class="flex gap-10 mb-20 items-center">
          <NCSkel0 />
          <NCSkel4 />
        </div>
        <div class="mb-10">
          <h3 class="text-[30px] font-semibold mb-8 dark:text-white">최신뉴스</h3>
          <div v-if="!loading" class="flex justify-between">
            <NewsComponent9 v-if="hasRanNews" :news="allRandomNews[0][2]" />
            <NewsComponent9 v-if="hasRanNews" :news="allRandomNews[0][3]" />
            <NewsComponent9 v-if="hasRanNews" :news="allRandomNews[0][4]" />
            <NewsComponent9 v-if="hasRanNews" :news="allRandomNews[0][5]" />
          </div>
          <NCSkel9 v-else />
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
              <swiper-slide v-for="(news, index) in shortDocs" :key="index" class="!w-[300px]">
                <SlideNewsComponent v-if="hasShortDocs" :news="news" />
              </swiper-slide>
            </swiper>
            <SNCSkel v-else />
          </div>
        </div>
      </div>
      <!-- 분야별 뉴스 -->
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
          <!-- 경제 -->
          <div class="flex flex-wrap">
            <div class="flex gap-2 mb-6">
              <img :src="economy" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">경제</span>
            </div>
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5 v-if="hasNews1" :news="allNews[1][0]" />
              <NewsComponent5 v-if="hasNews1" :news="allNews[1][1]" />
            </div>
            <NCSkel5 v-else />
          </div>
        </div>

        <div class="w-[608px] mt-19.5">
          <!-- 제목 -->
          <div class="flex flex-wrap">
            <div class="flex gap-2 mb-6">
              <img :src="culture" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">문화</span>
            </div>
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent6 v-if="hasNews3" :news="allNews[3][0]" />
              <NewsComponent6 v-if="hasNews3" :news="allNews[3][1]" />
            </div>
            <NCSkel6 v-else />
          </div>
        </div>
      </div>
      <!-- 연예 , 해외 -->
      <div class="flex gap-[40px] my-12.5">
        <div class="flex flex-wrap">
          <div class="flex gap-2 mb-6">
            <img :src="celeb" class="w-8 h-8 mt-0.5" />
            <span class="text-[26px] font-semibold dark:text-white">연예</span>
          </div>
          <div v-if="!loading" class="w-[600px] flex gap-4">
            <NewsComponent10 v-if="hasNews5" :news="allNews[5][0]" />
            <NewsComponent10 v-if="hasNews5" :news="allNews[5][1]" />
          </div>
          <NCSkel10 v-else />
        </div>
        <div class="w-[600px]">
          <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
            <h1 class="flex gap-[10px] items-center">
              <img :src="global" alt="global" class="w-8 h-8 mt-0.5" />
              <p class="text-[26px] font-semibold dark:text-white">해외</p>
            </h1>
          </div>
          <div v-if="!loading" class="flex flex-col gap-[15px]">
            <NewsComponent6 v-if="hasNews6" :news="allNews[6][0]" />
            <NewsComponent6 v-if="hasNews6" :news="allNews[6][1]" />
          </div>
          <NCSkel6 v-else />
        </div>
      </div>

      <!-- 사회 -->
      <div class="w-full mb-10">
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img :src="global" alt="global" class="w-8 h-8 mt-0.5" />
            <p class="text-[26px] font-semibold dark:text-white">사회</p>
          </h1>
        </div>
        <div v-if="!loading" class="flex gap-[30px]">
          <div class="flex flex-col gap-[15px]">
            <NewsComponent7 v-if="hasNews2" :news="allNews[2][0]" />

            <NewsComponent7 v-if="hasNews2" :news="allNews[2][1]" />
          </div>
          <div class="flex flex-col gap-[15px]">
            <NewsComponent7 v-if="hasNews2" :news="allNews[2][2]" />

            <NewsComponent7 v-if="hasNews2" :news="allNews[2][3]" />
          </div>
        </div>
        <NCSkel7 v-else />
      </div>

      <div
        class="rounded-3xl bg-[#F8F8F8] dark:bg-[#1F1F1F] dark:text-white w-[1240px] h-[510px] px-[60px] py-[53px] mb-[100px]"
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
