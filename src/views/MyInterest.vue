<script setup>
//import { fetchNewsData } from '@/api/fetchNews'
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
import { computed, nextTick, onMounted, ref } from 'vue'
import supabase from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { getFreshNews } from '@/composables/newsCache'
import { allCategoryMap } from '@/composables/useCategoryMap'
import IntroduceSection from '@/components/NewsComponents/introduce/IntroduceSection.vue'
import IntroduceSkel from '@/components/NewsComponents/introduce/IntroduceSkel.vue'

const user = ref(null)
const loading = ref(true)
const isLoggedIn = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const allNews = ref([])
const posts = ref([])
const router = useRouter()

// 각 인덱스별 존재 여부를 안전하게 체크하는 computed 변수들
const hasNews0 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 0)
const hasNews1 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 1)
const hasNews2 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 2)
const hasNews3 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 3)
const hasNews4 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 4)
const hasNews5 = computed(() => Array.isArray(allNews.value) && allNews.value.length > 5)

const matchedCategories = ref([])
const userInterestLoading = ref(true)
const introduceData = ref([])
const introduceLoading = ref(true)

onMounted(async () => {
  const {
    data: { user: supaUser },
  } = await supabase.auth.getUser()
  user.value = supaUser
  isLoggedIn.value = !!supaUser
  console.log('사용자 정보:', user.value)
  console.log('isLoggedIn:', isLoggedIn.value)
  console.log('userInterestLoading:', userInterestLoading.value)
  // 로그인 전
  if (!isLoggedIn.value) {
    const { data: beforeLoginData, error: introduceError } = await supabase
      .from('for_introduce')
      .select('*')
    if (introduceError) {
      console.error('소개 데이터 가져오기 에러:', introduceError)
    } else {
      introduceData.value = beforeLoginData
      console.log('소개 데이터:', introduceData)
    }
    introduceLoading.value = false
    return
  }

  // 로그인 후

  console.log('관심사 로드 시작:', userInterestLoading.value)
  // user 최대 관심사
  const { data: favoriteInterest, error: favoriteError } = await supabase
    .from('user_interests')
    .select('category_id')
    .eq('user_id', user.value.id)
    .eq('is_highest', true)

  // id 값만 추출
  const favoriteCategoryId = favoriteInterest?.[0]?.category_id

  if (favoriteError) {
    console.error('최대관심사 에러:', favoriteError)
  } else {
    console.log('최대관심사의 카테고리 id:', favoriteCategoryId)
  }

  // user_interests 에서 유저가 선택한 관심사 가져오기
  const { data: interestData, error: interestError } = await supabase
    .from('user_interests')
    .select('category_id')
    .eq('user_id', user.value.id)

  const userInterestArr = interestData.map((item) => item.category_id)

  if (interestError) {
    console.error('유저관심사 가져오기 실패:', interestError.message)
  } else {
    console.log('유저의 관심사:', userInterestArr) // [3,4,5] 이런식으로 저장됨
  }
  const finalInterestArr = [
    ...[favoriteCategoryId],
    ...userInterestArr.filter((id) => id !== favoriteCategoryId),
  ]
  console.log('finalInterestArr:', finalInterestArr)

  matchedCategories.value = finalInterestArr.map((num) =>
    allCategoryMap.find((item) => item.num === num),
  )
  // 영어 카테고리
  const matchedEnglishlabel = matchedCategories.value.map((item) => item.id)

  console.log('유저가 선택한 카테고리 객체배열:', matchedCategories)
  console.log(matchedCategories.value[0].icon)
  console.log('유저 카테고리 영어배열:', matchedEnglishlabel)

  userInterestLoading.value = false
  console.log('관심사 로딩 종료', userInterestLoading.value)
  nextTick()

  const storedUserInterestNews = localStorage.getItem('userInterestNews')
  if (storedUserInterestNews) {
    allNews.value = JSON.parse(storedUserInterestNews)
    console.log('로컬스토리지 - 유저 관심사 뉴스:', allNews.value)
    loading.value = false
    return
  }

  const newsResults = []

  if (isLoggedIn.value && userInterestArr.length > 0) {
    try {
      // 관심사가 없으면 관심사 수정하러 가라
      // 각 카테고리에 대해 뉴스 가져오기
      for (const category of matchedEnglishlabel) {
        console.log(`뉴스 가져오기: ${category}`)
        const result = await getFreshNews(category, 'ko')
        newsResults.push(result)
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
      allNews.value = newsResults
      localStorage.setItem('userInterestNews', JSON.stringify(allNews.value))
      console.log('로컬에 유저 관심사 뉴스 배열 저장:', allNews.value)
      console.log('allNews 결과:', allNews.value)
      loading.value = false
    } catch (error) {
      console.error('Error fetching news:', error)
      loading.value = false
    }
  } else {
    loading.value = false
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
    <!-- 로그인 된 상태 -->
    <div v-if="isLoggedIn">
      <!-- 관심사 있는 상태 -->
      <div v-if="!loading && allNews">
        <div>
          <!-- 최고 관심사 -->
          <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
            <h1 class="flex gap-[10px] items-center">
              <img v-if="matchedCategories[0]" :src="matchedCategories[0].icon" alt="firstLabel" />
              <p class="text-[30px] text-[var(--text-title)] font-bold">
                {{ matchedCategories[0].label }}
              </p>
            </h1>
            <div class="flex">
              <h2 class="text-[var(--text-sub-purple)] text-[16px]">내가 가장 관심있는</h2>
            </div>
            <div class="ml-auto cursor-pointer">
              <h3
                class="text-[16px] text-[var(--show-more)] underline underline-offset-2 font-medium select-none"
              >
                더보기
              </h3>
            </div>
          </div>
          <FavoriteSection v-if="hasNews0" :newsArr="allNews[0]" />

          <FavoriteSectionSkel v-else-if="loading" />
        </div>
        <!-- 커뮤니티 섹션 -->
        <div
          class="rounded-[24px] bg-[var(--section-contents-bg)] w-[1240px] h-[510px] px-[60px] py-[53px] mb-[60px]"
        >
          <h1 class="text-[30px] text-[var(--text-title)] font-bold mb-[32px] select-none">
            나의 관심사에 대해 사람들과 이야기해보세요!
          </h1>
          <div>
            <div class="flex flex-row justify-between gap-[24px]">
              <NewsComponentCommunity v-for="post in posts" :key="post.post_id" :post="post" />
            </div>
            <div v-if="loading" class="flex gap-6">
              <div class="w-[358px] h-[243px] rounded-[16px] animate-pulse bg-gray-300"></div>
              <div class="w-[358px] h-[243px] rounded-[16px] animate-pulse bg-gray-300"></div>
              <div class="w-[358px] h-[243px] rounded-[16px] animate-pulse bg-gray-300"></div>
            </div>
          </div>
          <button
            @click="router.push('/community')"
            class="select-none mx-auto mt-[42px] flex rounded-[8px] justify-center items-center w-[194px] h-[50px] text-white text-[16px] bg-[#7537E3] cursor-pointer hover:bg-[#601ED5 dark:bg-[#7846D2] dark:hover:bg-[#6524D9] transition duration-300"
          >
            글쓰러 가기
          </button>
        </div>
        <!-- 두번째 관심사 -->
        <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
          <h1 class="flex gap-[10px] items-center">
            <img :src="matchedCategories[1].icon" alt="secondLabel" />
            <p class="text-[30px] text-[var(--text-title)] font-bold">
              {{ matchedCategories[1].label }}
            </p>
          </h1>
          <div class="flex">
            <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
          </div>
          <div class="ml-auto cursor-pointer">
            <h3
              class="text-[16px] text-[var(--show-more)] underline underline-offset-2 font-medium select-none"
            >
              더보기
            </h3>
          </div>
        </div>
        <SecondSection v-if="hasNews1" :newsArr="allNews[1]" />
        <SecondSectionSkel v-else-if="loading" />

        <div class="flex gap-[72px] mb-[50px]">
          <!-- 세번째 관심사 -->
          <div>
            <div class="select-none w-[608px] flex items-center gap-[20px] font-semibold mb-[30px]">
              <h1 class="flex gap-[10px] items-center">
                <img :src="matchedCategories[2].icon" alt="thirdLabel" />
                <p class="text-[30px] text-[var(--text-title)] font-bold">
                  {{ matchedCategories[2].label }}
                </p>
              </h1>
              <div class="flex">
                <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
              </div>
              <div class="ml-auto cursor-pointer">
                <h3
                  class="text-[16px] text-[var(--show-more)] underline underline-offset-2 font-medium select-none"
                >
                  더보기
                </h3>
              </div>
            </div>

            <ThirdSection v-if="hasNews2" :newsArr="allNews[2]" />
            <ThirdSectionSkel v-else-if="loading" class="mt-[50px]" />
          </div>
          <!-- 오늘의 핫 독스 -->
          <div class="w-[560px]">
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
        <div class="flex gap-[40px] mb-[50px]">
          <div>
            <!-- 세 번째 관심사 -->
            <div class="select-none w-[608px] flex items-center gap-[20px] font-semibold mb-[30px]">
              <h1 class="flex gap-[10px] items-center">
                <img :src="matchedCategories[3].icon" alt="fourthLabel" />
                <p class="text-[30px] text-[var(--text-title)] font-bold">
                  {{ matchedCategories[3].label }}
                </p>
              </h1>
              <div class="flex">
                <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
              </div>
              <div class="ml-auto cursor-pointer">
                <h3
                  class="text-[16px] text-[var(--show-more)] underline underline-offset-2 font-medium select-none"
                >
                  더보기
                </h3>
              </div>
            </div>
            <!-- 섹션 6 -->
            <FourthSection v-if="hasNews3" :newsArr="allNews[3]" />
            <FourthSectionSkel v-else-if="loading" />
          </div>
          <!-- 네번째 관심사 -->
          <div v-if="matchedCategories.length > 4">
            <!-- 제목 -->
            <div class="select-none w-[608px] flex items-center gap-[20px] font-semibold mb-[30px]">
              <h1 class="flex gap-[10px] items-center">
                <img :src="matchedCategories[4].icon" alt="fifthsLabel" />
                <p class="text-[30px] text-[var(--text-title)] font-bold">
                  {{ matchedCategories[4].label }}
                </p>
              </h1>
              <div class="flex">
                <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
              </div>
              <div class="ml-auto cursor-pointer">
                <h3
                  class="text-[16px] text-[var(--show-more)] underline underline-offset-2 font-medium select-none"
                >
                  더보기
                </h3>
              </div>
            </div>
            <FifthSection
              :news-save-handler="newsSavedHandler"
              v-if="hasNews4"
              :newsArr="allNews[4]"
            />
            <FifthSecionSkel v-else-if="loading" class="mb-5" />
          </div>
        </div>

        <!-- 다섯번째 관심사 -->
        <div v-if="matchedCategories.length > 5">
          <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
            <h1 class="flex gap-[10px] items-center">
              <img :src="matchedCategories[5].icon" alt="fifthsLabel" />
              <p class="text-[30px] text-[var(--text-title)] font-bold">
                {{ matchedCategories[5].label }}
              </p>
            </h1>
            <div class="flex">
              <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
            </div>
            <div class="ml-auto cursor-pointer">
              <h3
                class="text-[16px] text-[var(--show-more)] underline underline-offset-2 font-medium select-none"
              >
                더보기
              </h3>
            </div>
          </div>
          <!-- 섹션 8 -->
          <SixthSection
            :news-save-handler="newsSavedHandler"
            v-if="hasNews5"
            :newsArr="allNews[5]"
          />
          <SixthSectionSkel v-else-if="loading" />
        </div>
      </div>

      <!-- 관심사 없는 상태 -->
      <div v-else>
        <h2 class="text-[24px] text-center">관심사를 설정해주세요!</h2>
        <p class="text-center mb-[20px]">관심사를 추가하면 맞춤 뉴스를 볼 수 있습니다.</p>
      </div>
    </div>

    <!-- 로그인 안 된 상태 -->
    <!-- 임시 예시 페이지 -->
    <div v-else class="mx-auto max-w-[1240px] select-none">
      <div>
        <h1 class="text-[25px] font-bold mb-3">newsDocs에 오신 것을 환영합니다!</h1>
        <h1 class="test-[20px] mb-10">뉴스를 클릭하고, 3줄 요약으로 빠르게 소식을 접해보세요</h1>
      </div>
      <div>
        <IntroduceSection v-if="!introduceLoading" :newsArr="introduceData" />
        <IntroduceSkel v-else class="mb-8" />
      </div>
      <p class="text-center mb-3">로그인 후 맞춤 뉴스와 커뮤니티를 이용할 수 있습니다.</p>
      <button
        @click="router.push('/login')"
        class="mx-auto flex rounded-[8px] justify-center items-center w-[194px] h-[50px] text-white text-[16px] bg-[#7537E3] cursor-pointer hover:bg-[#601ED5] transition duration-300"
      >
        로그인
      </button>
    </div>

    <!-- 탑으로 이동 버튼 -->
    <div v-if="isLoggedIn" class="mb-25">
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
