<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { fetchNewsData } from '@/api/fetchNews'

import NewsComponent0 from '@/components/NewsComponents/NewsComponent0.vue'
import NewsComponent4 from '@/components/NewsComponents/NewsComponent4.vue'
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'
import NewsComponent7 from '@/components/NewsComponents/NewsComponent7.vue'
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'
import moveTop from '@/assets/icons/moveToTop.svg'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import runDog from '@/assets/img/run_dog.png'

// const newsList = ref([])
// const randomNews = ref(null)
const router = useRouter()
const route = useRoute()

const posts = ref([])
const interestStore = useInterestStore()
const interests = computed(() => interestStore.interestList)

import NCSkel0 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel0.vue'
import NCSkel4 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel4.vue'
import SNCSkel from '@/components/NewsComponents/skeleton/NewsComponentSkel/SNCSkel.vue'
import NCSkel5 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel5.vue'
import NCSkel6 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel6.vue'
import NCSkel10 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel10.vue'
import NCSkel7 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel7.vue'
import { getFreshNews } from '@/composables/newsCache'
import { useInterestStore } from '@/stores/interestStore'

const allNews = ref()
const loading = ref(true)
const categoryNews = ref([])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const loadCategoryNews = async () => {
  try {
    const response = await fetchNewsData(selectedCategory.value, 'ko')
    const newsResults = response
    categoryNews.value = newsResults
    console.log('관심 뉴스', categoryNews.value)
    console.log(categoryNews.value[0])
  } catch (error) {
    console.error('Error fetching news:', error)
  }
}

// const getLikeCount = async (postId) => {
//   const { count } = await supabase
//     .from('like')
//     .select('*', { count: 'exact', head: true })
//     .eq('post_id', postId)

//   return count || 0
// }

const selectedCategory = computed(() => route.params.categoryName || null)
const selectedCategoryIndex = computed(() => {
  return interests.value.findIndex((item) => item.id === selectedCategory.value)
})
const indexArr = [0, 1, 2, 3, 4, 5, 6, 7]
const otherIndexArr = computed(() => {
  return indexArr.filter((item) => item !== selectedCategoryIndex.value)
})
watch(
  () => route.params.categoryName,
  async (newVal) => {
    console.log('카테고리 변경됨:', newVal)

    console.log(indexArr)
    console.log(otherIndexArr.value)
    console.log(interests.value[otherIndexArr.value[0]].icon)
    console.log(selectedCategory.value)
    console.log(selectedCategoryIndex.value)
    console.log(interests.value)

    await loadCategoryNews()
    const storedNews = localStorage.getItem('allNews')
    if (storedNews) {
      allNews.value = JSON.parse(storedNews)
      console.log('로컬 스토리지 - 전체 카테고리 뉴스:', allNews.value)
      loading.value = false
      return
    } else {
      try {
        const newsResults = await Promise.all(
          interests.value.map((category) => getFreshNews(category, 'ko')),
        )
        allNews.value = newsResults
        // 모든 관심사 뉴스를 로컬스토리지에 저장
        localStorage.setItem('allNews', JSON.stringify(newsResults))
        console.log('로컬스토리지에 저장됨:', allNews.value)
        loading.value = false
      } catch (error) {
        console.error('Error fetching news:', error)
        loading.value = false
      }
    }

    loading.value = false
    console.log('로딩 종료:', loading.value)
  },
  { immediate: true },
)
</script>
<template>
  <section>
    <div class="mx-auto max-w-[1240px] pt-8">
      <div class="section1">
        <div v-if="!loading" class="flex gap-10 mb-20 items-center">
          <NewsComponent0 :news="allNews[selectedCategoryIndex][0]" class="w-[786px]" />
          <NewsComponent4 :news="allNews[selectedCategoryIndex][1]" />
        </div>
        <div v-else class="flex gap-10 mb-20 items-center">
          <NCSkel0 />
          <NCSkel4 />
        </div>
        <div class="mb-10">
          <div class="flex gap-19">
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5 :news="allNews[selectedCategoryIndex][2]" />

              <NewsComponent5 :news="allNews[selectedCategoryIndex][3]" />
            </div>
            <NCSkel5 v-else />

            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5 :news="allNews[selectedCategoryIndex][4]" />

              <NewsComponent5 :news="allNews[selectedCategoryIndex][5]" />
            </div>
            <NCSkel5 v-else />
          </div>
        </div>
      </div>
      <!-- 섹션 3 : 슬라이드 카드뉴스 -->
      <div class="h-[524px] relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
        <!-- 제목 -->
        <div class="max-w-[1240px] mx-auto h-[524px] mb-15">
          <div class="flex items-center pt-10 justify-between">
            <div v-if="!loading" class="flex gap-5">
              <SlideNewsComponent :news="allNews[selectedCategoryIndex][6]" class="w-[292px]" />
              <SlideNewsComponent :news="allNews[selectedCategoryIndex][7]" class="w-[292px]" />
              <SlideNewsComponent :news="allNews[selectedCategoryIndex][8]" class="w-[292px]" />
              <SlideNewsComponent :news="allNews[selectedCategoryIndex][9]" class="w-[292px]" />
            </div>
            <SNCSkel v-else />
          </div>
        </div>
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

      <!-- 분야별 뉴스 -->
      <div class="flex gap-10 mt-12.5">
        <div class="w-[608px]">
          <!-- 제목 -->
          <div class="select-none flex items-center gap-5 mb-7.5">
            <h3 class="flex gap-2.5 font-semibold text-[32px] dark:text-white">
              이런 뉴스는 어때요?
            </h3>
            <div class="flex">
              <h2 class="text-[#7A4EdF] dark:text-[#A878FD] text-[16px]">
                관심이 생기면 관심사로 등록해요
              </h2>
            </div>
          </div>
          <!-- 첫번째 주제 -->
          <div class="flex flex-wrap">
            <div v-if="otherIndexArr" class="flex gap-2 mb-6">
              <img :src="interests[otherIndexArr[0]].icon" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">{{
                interests[otherIndexArr[0]].label
              }}</span>
            </div>
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5 :news="allNews[otherIndexArr[0]][0]" />
              <NewsComponent5 :news="allNews[otherIndexArr[0]][1]" />
            </div>
            <NCSkel5 v-else />
          </div>
        </div>

        <div class="w-[608px] mt-19.5">
          <!-- 제목 -->
          <div class="flex flex-wrap">
            <div v-if="otherIndexArr" class="flex gap-2 mb-6">
              <img :src="interests[otherIndexArr[1]].icon" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">{{
                interests[otherIndexArr[1]].label
              }}</span>
            </div>
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent6 :news="allNews[otherIndexArr[1]][0]" />
              <NewsComponent6 :news="allNews[otherIndexArr[1]][1]" />
            </div>
            <NCSkel6 v-else />
          </div>
        </div>
      </div>
      <!-- 연예 , 해외 -->
      <div class="flex gap-[40px] my-12.5">
        <div class="flex flex-wrap">
          <div v-if="otherIndexArr" class="flex gap-2 mb-6">
            <img :src="interests[otherIndexArr[2]].icon" class="w-8 h-8 mt-0.5" />
            <span class="text-[26px] font-semibold dark:text-white">{{
              interests[otherIndexArr[2]].label
            }}</span>
          </div>
          <div v-if="!loading" class="w-[600px] flex gap-4">
            <NewsComponent10 :news="allNews[otherIndexArr[2]][0]" />
            <NewsComponent10 :news="allNews[otherIndexArr[2]][1]" />
          </div>
          <NCSkel10 v-else />
        </div>
        <div class="w-[600px]">
          <div v-if="otherIndexArr" class="flex gap-2 mb-6">
            <img :src="interests[otherIndexArr[3]].icon" class="w-8 h-8 mt-0.5" />
            <span class="text-[26px] font-semibold dark:text-white">{{
              interests[otherIndexArr[3]].label
            }}</span>
          </div>
          <div v-if="!loading" class="flex flex-col gap-[15px]">
            <NewsComponent6 :news="allNews[otherIndexArr[3]][0]" />
            <NewsComponent6 :news="allNews[otherIndexArr[3]][1]" />
          </div>
          <NCSkel6 v-else />
        </div>
      </div>

      <!-- 사회 -->
      <div class="w-full mb-10">
        <div v-if="otherIndexArr" class="flex gap-2 mb-6">
          <img :src="interests[otherIndexArr[4]].icon" class="w-8 h-8 mt-0.5" />
          <span class="text-[26px] font-semibold dark:text-white">{{
            interests[otherIndexArr[4]].label
          }}</span>
        </div>
        <div v-if="!loading" class="flex gap-[30px]">
          <div class="flex flex-col gap-[15px]">
            <NewsComponent7 :news="allNews[otherIndexArr[4]][0]" />

            <NewsComponent7 :news="allNews[otherIndexArr[4]][1]" />
          </div>
          <div class="flex flex-col gap-[15px]">
            <NewsComponent7 :news="allNews[otherIndexArr[4]][2]" />

            <NewsComponent7 :news="allNews[otherIndexArr[4]][3]" />
          </div>
        </div>
        <NCSkel7 v-else />
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
