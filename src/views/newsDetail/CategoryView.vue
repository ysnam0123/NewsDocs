<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { fetchNewsData } from '@/api/fetchNews'

import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'
// import NewsComponent3 from '@/components/NewsComponents/NewsComponent3.vue'
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'

import economy from '@/assets/icons/communityDropdown/economy.svg'
import culture from '@/assets/icons/communityDropdown/culture.svg'
import celeb from '@/assets/icons/communityDropdown/celeb.svg'
import global from '@/assets/icons/communityDropdown/global.svg'
import moveTop from '@/assets/icons/moveToTop.svg'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useNewsStore } from '@/stores/newsStore'
import supabase from '@/utils/supabase'

import NewsComponent4 from '@/components/NewsComponents/NewsComponent4.vue'
import NewsComponent0 from '@/components/NewsComponents/NewsComponent0.vue'
import runDog from '@/assets/img/run_dog.png'
// import NewsComponent9 from '@/components/NewsComponents/NewsComponent9.vue'
import NewsComponent7 from '@/components/NewsComponents/NewsComponent7.vue'

// const newsList = ref([])
// const randomNews = ref(null)
// const resetPoint = ref(null)
const router = useRouter()
const route = useRoute()
// const activeCategory = ref('전체')

const newsStore = useNewsStore()
const posts = ref([])

import NCSkel0 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel0.vue'
import NCSkel4 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel4.vue'
import SNCSkel from '@/components/NewsComponents/skeleton/NewsComponentSkel/SNCSkel.vue'
import NCSkel5 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel5.vue'
import NCSkel6 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel6.vue'
import NCSkel10 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel10.vue'
import NCSkel7 from '@/components/NewsComponents/skeleton/NewsComponentSkel/NCSkel7.vue'

const allNews = ref([])
const loading = ref(true)
const categoryNews = ref([])

// 각 인덱스별 존재 여부를 안전하게 체크하는 computed 변수들
const hasCategoryNews = computed(
  () => Array.isArray(categoryNews.value) && categoryNews.value.length > 1,
)
const hasNews1 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 1)
const hasNews2 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 2)
const hasNews3 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 3)
const hasNews5 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 5)
const hasNews6 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 5)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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

watch(
  () => route.params.categoryName,
  async (newVal) => {
    console.log('카테고리 변경됨:', newVal)

    loading.value = true
    await loadCategoryNews()
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
          <NewsComponent0
            v-if="hasCategoryNews"
            :news="categoryNews[0]"
            :news-save-handler="newsSavedHandler"
          />
          <NewsComponent4
            v-if="hasCategoryNews"
            :news-save-handler="newsSavedHandler"
            :news="categoryNews[1]"
          />
        </div>
        <div v-else class="flex gap-10 mb-20 items-center">
          <NCSkel0 />
          <NCSkel4 />
        </div>
        <div class="mb-10">
          <div class="flex gap-19">
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[2]"
              />
              <NewsComponent5
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[3]"
              />
            </div>
            <NCSkel5 v-else />
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[4]"
              />
              <NewsComponent5
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[5]"
              />
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
              <SlideNewsComponent
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[6]"
              />
              <SlideNewsComponent
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[7]"
              />
              <SlideNewsComponent
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[8]"
              />
              <SlideNewsComponent
                v-if="hasCategoryNews"
                :news-save-handler="newsSavedHandler"
                :news="categoryNews[9]"
              />
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
          <!-- 경제 -->
          <div class="flex flex-wrap">
            <div class="flex gap-2 mb-6">
              <img :src="economy" class="w-8 h-8 mt-0.5" />
              <span class="text-[26px] font-semibold dark:text-white">경제</span>
            </div>
            <div v-if="!loading" class="flex flex-col gap-4">
              <NewsComponent5
                v-if="hasNews1"
                :news-save-handler="newsSavedHandler"
                :news="allNews[1][0]"
              />
              <NewsComponent5
                v-if="hasNews1"
                :news-save-handler="newsSavedHandler"
                :news="allNews[1][1]"
              />
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
              <NewsComponent6
                v-if="hasNews3"
                :news-save-handler="newsSavedHandler"
                :news="allNews[3][0]"
              />
              <NewsComponent6
                v-if="hasNews3"
                :news-save-handler="newsSavedHandler"
                :news="allNews[3][1]"
              />
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
            <NewsComponent10
              v-if="hasNews5"
              :news-save-handler="newsSavedHandler"
              :news="allNews[5][0]"
            />
            <NewsComponent10
              v-if="hasNews5"
              :news-save-handler="newsSavedHandler"
              :news="allNews[5][1]"
            />
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
            <NewsComponent6
              v-if="hasNews6"
              :news-save-handler="newsSavedHandler"
              :news="allNews[6][0]"
            />
            <NewsComponent6
              v-if="hasNews6"
              :news-save-handler="newsSavedHandler"
              :news="allNews[6][1]"
            />
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
            <NewsComponent7
              v-if="hasNews2"
              :news-save-handler="newsSavedHandler"
              :news="allNews[2][0]"
            />

            <NewsComponent7
              v-if="hasNews2"
              :news-save-handler="newsSavedHandler"
              :news="allNews[2][1]"
            />
          </div>
          <div class="flex flex-col gap-[15px]">
            <NewsComponent7
              v-if="hasNews2"
              :news-save-handler="newsSavedHandler"
              :news="allNews[2][2]"
            />

            <NewsComponent7
              v-if="hasNews2"
              :news-save-handler="newsSavedHandler"
              :news="allNews[2][3]"
            />
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
