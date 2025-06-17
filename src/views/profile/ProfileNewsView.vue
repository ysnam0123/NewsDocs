<script setup>
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import { computed, onMounted, ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'
import { useRoute } from 'vue-router'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { fetchUserByNickname } from '@/api/fetchUserByNickname'
import { fetchUserScrap } from '@/api/fetchUserScrap'
import { fetchScrapNews } from '@/api/fetchScrapNews'
import SleepDog from '@/components/profile/SleepDog.vue'
import News8Skel from '@/components/NewsComponents/skeleton/News8Skel.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const tabs = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']
const tabsMap = {
  '정치/경제': [1, 7],
  '연예/스포츠': [2, 3],
  '사회/문화': [4, 6],
  '해외/기타': [5, 8],
}
const currentUser = ref(null)
const route = useRoute()
const profileUser = ref(null)
const scrapNews = ref(null)
const userScrap = ref([])
const activeTab = ref('전체')
const isLoading = ref(true)

const nicknameParam = route.params.nickname
const name = nicknameParam ? nicknameParam + '님이' : '내가'
onMounted(async () => {
  try {
    const user = await getCurrentUser()
    currentUser.value = await fetchUser(user?.id)

    profileUser.value = nicknameParam ? await fetchUserByNickname(nicknameParam) : currentUser.value

    userScrap.value = await fetchUserScrap(profileUser.value.user_id)

    const scrapNewsId = userScrap.value.map((item) => item.news_id)
    scrapNews.value = (await Promise.all(scrapNewsId.map((id) => fetchScrapNews(id)))).flat()
    isLoading.value = false
  } catch (e) {
    alert(e.message)
  }
})

const filteredScrapNews = computed(() => {
  if (!scrapNews.value) return []

  if (activeTab.value === '전체') return scrapNews.value

  const categoryIds = tabsMap[activeTab.value] || []
  return scrapNews.value.filter((news) => categoryIds.includes(news.category_id))
})

const NewsList = computed(() => {
  const size = 3
  const result = []
  if (!filteredScrapNews.value) return result
  for (let i = 0; i < filteredScrapNews.value.length; i += size) {
    result.push(filteredScrapNews.value.slice(i, i + size))
  }
  return result
})

const MobNewsList = computed(() => {
  const size = 2
  const result = []
  if (!filteredScrapNews.value) return result
  for (let i = 0; i < filteredScrapNews.value.length; i += size) {
    result.push(filteredScrapNews.value.slice(i, i + size))
  }
  return result
})
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-full sm:max-w-[735px] mx-auto my-10">
      <div class="mb-4 ml-5 sm:ml-0">
        <BackButton />
      </div>
      <div class="text-[28px] font-bold dark:text-white mb-8 ml-5 sm:ml-0">
        {{ name }} 저장한 뉴스
      </div>
      <div class="relative">
        <Swiper :slides-per-view="'auto'" space-between="0" class="w-full sm:w-[735px]">
          <SwiperSlide v-for="tab in tabs" :key="tab" class="!w-auto">
            <div
              @click="activeTab = tab"
              class="flex items-center justify-center min-w-[147px] h-[52px] border-b-[1px] text-base cursor-pointer relative dark:border-[#3C3C3C] border-[#9A9A9A]"
              :class="{
                'text-[#7537E3] dark:text-[#A878FD] font-semibold border-b-2 border-[#7537E3] dark:border-[#A878FD]':
                  activeTab === tab,
                'text-[#9D9D9D] dark:text-[#8F8F8F]': activeTab !== tab,
              }"
            >
              {{ tab }}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="flex flex-col w-full max-w-[735px] px-5 sm:px-0">
        <News8Skel v-if="isLoading" class="pt-12" />
        <div v-else>
          <div v-if="filteredScrapNews.length === 0" class="pt-10">
            <SleepDog :content="name + ' 저장한 뉴스가 없습니다.'" class="mb-15 border-0" />
          </div>
          <div v-else>
            <!-- 2개 -->
            <div v-for="(row, rowIndex) in MobNewsList" :key="row + rowIndex">
              <div class="sm:hidden flex gap-[10px] py-5 w-full">
                <NewsComponent8
                  v-for="(item, itemIndex) in row"
                  :key="item.news_id + '-' + itemIndex"
                  :news="item"
                  class="mx-auto w-full"
                />
              </div>
            </div>
            <!-- 3개 -->
            <div v-for="(row, rowIndex) in NewsList" :key="row + rowIndex">
              <div class="hidden sm:flex gap-[20px] py-5 w-full">
                <NewsComponent8
                  v-for="(item, itemIndex) in row"
                  :key="item.news_id + '-' + itemIndex"
                  :news="item"
                  class="w-[229px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
