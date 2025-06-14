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

const tabs = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']
const tabsMap = {
  '정치/경제': [1, 7],
  '연예/스포츠': [2, 3],
  '사회/문화': [4, 6],
  '해외/기타': [5],
}
const currentUser = ref(null)
const route = useRoute()
const profileUser = ref(null)
const scrapNews = ref(null)
const userScrap = ref([])
const activeTab = ref('전체')

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
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-[735px] mx-auto mt-10">
      <div class="mb-4">
        <BackButton />
      </div>
      <div class="text-[28px] font-bold dark:text-white mb-8">{{ name }} 저장한 뉴스</div>
      <div class="relative">
        <div
          class="flex border-[#9A9A9A] border-b-[0.5px] h-[52px] items-center text-center space-x-4 mb-5 relative dark:border-[#3C3C3C]"
        >
          <div
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="flex items-center justify-center w-[103px] h-full text-base cursor-pointer relative transition-all duration-300 dark:hover:text-[#A878FD] hover:text-[#7537E3]"
            :class="{
              'text-[#7537E3] dark:text-[#A878FD] font-semibold': activeTab === tab,
              'text-[#9D9D9D] dark:text-[#8F8F8F]': activeTab !== tab,
            }"
          >
            {{ tab }}
          </div>

          <div
            class="absolute bottom-[-1px] h-[2px] bg-[#7537E3] dark:bg-[#A878FD] transition-all duration-300"
            :style="{
              left: `${tabs.indexOf(activeTab) * 119}px`,
              width: '103px',
            }"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <div>
          <div
            v-for="(row, rowIndex) in NewsList"
            :key="row + rowIndex"
            class="flex space-x-[24px] pt-5"
          >
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
</template>
<style scoped></style>
