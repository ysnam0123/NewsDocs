<script setup>
import { fetchNewsData } from '@/api/fetchNews'
import FavoriteSectionSkel from '@/components/NewsComponents/skeleton/FavoriteSectionSkel.vue'
import FifthSecionSkel from '@/components/NewsComponents/skeleton/FifthSecionSkel.vue'
import FourthSectionSkel from '@/components/NewsComponents/skeleton/FourthSectionSkel.vue'
import SecondSectionSkel from '@/components/NewsComponents/skeleton/SecondSectionSkel.vue'
import SixthSectionSkel from '@/components/NewsComponents/skeleton/SixthSectionSkel.vue'
import ThirdSectionSkel from '@/components/NewsComponents/skeleton/ThirdSectionSkel.vue'
import HotDocsComponent from '@/components/NewsComponents/HotDocsComponent.vue'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'
import FavoriteSection from '@/components/NewsComponents/section/FavoriteSection.vue'
import FifthSection from '@/components/NewsComponents/section/FifthSection.vue'
import FourthSection from '@/components/NewsComponents/section/FourthSection.vue'
import SecondSection from '@/components/NewsComponents/section/SecondSection.vue'
import SixthSection from '@/components/NewsComponents/section/SixthSection.vue'
import ThirdSection from '@/components/NewsComponents/section/ThirdSection.vue'
import { useInterestStore } from '@/stores/interestStore'
import { useNewsStore } from '@/stores/newsStore'
import { computed, onMounted, ref } from 'vue'
import supabase from '@/utils/supabase'
import { useRouter } from 'vue-router'

const interestStore = useInterestStore()
const interestList = computed(() => interestStore.interestList)
const newsStore = useNewsStore()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const allNews = ref([])
const loading = ref(true)
const posts = ref([])
const router = useRouter()

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
    console.log('뉴스가 저장되었습니다.')
  } else {
    console.log('이미 저장된 뉴스입니다:', news.title)
  }
}

// 각 인덱스별 존재 여부를 안전하게 체크하는 computed 변수들
const hasNews0 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 0)
const hasNews1 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 1)
const hasNews2 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 2)
const hasNews3 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 3)
const hasNews4 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 4)
const hasNews5 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 5)

const getLikeCount = async (postId) => {
  const { count } = await supabase
    .from('like')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId)

  return count || 0
}
onMounted(async () => {
  const checkToken = localStorage.getItem('accessToken')
  console.log(`로그인 토큰 : ${checkToken}`)

  const newsResults = []

  if (interestList.value.length > 0) {
    try {
      for (const item of interestList.value) {
        const result = await fetchNewsData(item.id, 'ko')
        newsResults.push(result)
        await new Promise((resolve) => setTimeout(resolve, 300)) // 200ms 쉬기
      }
      allNews.value = newsResults
      console.log(allNews.value)
      console.log(allNews.value[0])
      console.log(allNews.value[1])
      loading.value = false
      console.log(loading.value)
    } catch (error) {
      console.error('Error fetching news:', error)
    }
  }

  // post 불러오기
  const { data, error } = await supabase
    .from('post')
    .select(
      `
    post_id,
    title,
    contents,
    category_id,
    profiles (
    nickname,
    profile_img
    ),
    comments!comments_post_id_fkey (
      comments_id,
      contents
  )
      `,
    )
    .order('created_at', { ascending: true })
    .limit(3)

  if (error) {
    console.error('post 불러오기 실패', error)
    return
  }
  for (const post of data) {
    const likeCount = await getLikeCount(post.post_id)
    post.like_count = likeCount
  }

  posts.value = data
})
</script>

<template>
  <div class="mx-auto max-w-[1240px] pt-[50px]">
    <!-- 섹션 1: 스포츠 -->
    <FavoriteSection v-if="hasNews0" :news-save-handler="newsSavedHandler" :newsArr="allNews[0]" />
    <FavoriteSectionSkel v-else-if="loading" />
    <!-- 섹션 2 : 커뮤니티로 접근 -->
    <div
      class="rounded-[24px] bg-[var(--section-contents-bg)] w-[1240px] h-[510px] px-[60px] py-[53px] mb-[60px]"
    >
      <h1 class="text-[30px] text-[var(--text-title)] font-bold mb-[32px] select-none">
        나의 관심사에 대해 사람들과 이야기해보세요!
      </h1>
      <div class="flex flex-row justify-between gap-[24px]">
        <NewsComponentCommunity v-for="post in posts" :key="post.post_id" :post="post" />
      </div>
      <button
        @click="router.push('/community')"
        class="select-none mx-auto mt-[42px] flex rounded-[8px] justify-center items-center w-[194px] h-[50px] text-white text-[16px] bg-[#7537E3] cursor-pointer hover:bg-[#601ED5 dark:bg-[#7846D2] dark:hover:bg-[#6524D9] transition duration-300"
      >
        글쓰러 가기
      </button>
    </div>

    <!-- 섹션 3 : 슬라이드 카드뉴스 -->
    <SecondSection :news-save-handler="newsSavedHandler" v-if="hasNews1" :newsArr="allNews[1]" />
    <SecondSectionSkel v-else-if="loading" />

    <!-- 섹션 4,5 연예, 핫독스 -->
    <div class="flex gap-[72px] mb-[50px]">
      <!-- 섹션 4 : 연예 -->
      <ThirdSection :news-save-handler="newsSavedHandler" v-if="hasNews2" :newsArr="allNews[2]" />
      <ThirdSectionSkel v-else-if="loading" class="mt-[50px]" />
      <!-- 섹션 5 : 오늘의 핫 독스 -->
      <div class="w-[560px]">
        <!-- 제목 -->
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img src="../assets/icons/hotDocsIcon.svg" alt="hotDocs" />
            <p class="text-[30px] text-[var(--text-title)] font-bold">오늘의 핫 독스</p>
          </h1>
          <div class="flex">
            <h2 class="text-[var(--text-sub-purple)] text-[16px]">세상은 지금</h2>
          </div>
        </div>
        <HotDocsComponent />
      </div>
    </div>
    <!-- 섹션 6, 7 -->
    <div class="flex gap-[40px] mb-[50px]">
      <!-- 섹션 6: 경제 -->
      <FourthSection :news-save-handler="newsSavedHandler" v-if="hasNews3" :newsArr="allNews[3]" />
      <FourthSectionSkel v-else-if="loading" />
      <!-- 섹션 7 : 문화 -->
      <FifthSection :news-save-handler="newsSavedHandler" v-if="hasNews4" :newsArr="allNews[4]" />
      <FifthSecionSkel v-else-if="loading" />
    </div>

    <!-- 섹션 8: 해외 -->
    <SixthSection :news-save-handler="newsSavedHandler" v-if="hasNews5" :newsArr="allNews[5]" />
    <SixthSectionSkel v-else-if="loading" />

    <!-- 탑으로 이동 버튼 -->
    <div class="mb-25">
      <img
        src="@/assets/icons/moveToTop.svg"
        alt="move to top Button"
        class="cursor-pointer fixed bottom-0 right-[30px]"
        @click="scrollToTop"
      />
    </div>
  </div>
</template>

<style scoped></style>
