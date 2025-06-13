<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import ProfileDog from '@/components/icon/profileDog.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent82.vue'
import SleepDog from '@/components/profile/SleepDog.vue'
import { computed, onMounted, ref } from 'vue'
import { fetchPost } from '@/api/fetchPost'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { fetchUserByNickname } from '@/api/fetchUserByNickname'
import { fetchInterest } from '@/api/fetchInterest'
import { useRoute } from 'vue-router'
import { fetchUserScrap } from '@/api/fetchUserScrap'
import { fetchScrapNews } from '@/api/fetchScrapNews'

const posts = ref([])
const route = useRoute()
const profileUser = ref(null)
const currentUser = ref(null)
const interest = ref(null)
const categorys = ref([])
const scrapNews = ref(null)
const userScrap = ref([])

const nicknameParam = route.params.nickname
const isMyProfile = computed(() => {
  return currentUser.value?.user_id === profileUser.value?.user_id
})

onMounted(async () => {
  try {
    posts.value = await fetchPost()
    const user = await getCurrentUser()
    currentUser.value = await fetchUser(user?.id)

    profileUser.value = nicknameParam ? await fetchUserByNickname(nicknameParam) : currentUser.value

    userScrap.value = await fetchUserScrap(profileUser.value.user_id)

    const scrapNewsId = userScrap.value.map((item) => item.news_id)
    scrapNews.value = (await Promise.all(scrapNewsId.map((id) => fetchScrapNews(id)))).flat()

    interest.value = await fetchInterest(profileUser.value.user_id)
    categorys.value = interest.value?.map((item) => item.category_id) || []
  } catch (e) {
    alert(e.message)
  }
})

const myPosts = computed(() =>
  profileUser.value ? posts.value.filter((post) => post.user_id === profileUser.value.user_id) : [],
)

const name = nicknameParam ? nicknameParam + '님이' : '내가'
const myNews = computed(() => userScrap.value)
const categoryNames = ['정치', '스포츠', '연예', '문화', '해외', '사회', '경제']
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex justify-between">
        <div class="flex space-x-5 mt-5">
          <ProfileDog />
          <div class="flex flex-col justify-center ml-3">
            <div class="text-[24px] font-semibold mb-1 dark:text-white">
              {{ profileUser?.nickname || '닉네임을 지어주세요' }}
            </div>
            <div class="flex space-x-2">
              <div
                v-for="category in categorys"
                :key="category.category_id"
                class="text-[#8F8F8F] text-sm"
              >
                # {{ categoryNames[category - 1] }}
              </div>
            </div>
            <div class="mt-3">
              <RouterLink v-if="isMyProfile" to="/profile/edit">
                <button
                  class="w-[106px] h-[36px] bg-[#F6F6F6] text-center rounded-[8px] text-sm cursor-pointer hover:bg-[#EDEDED] dark:bg-[#363636] dark:text-white dark:hover:bg-[#4A4A4A]"
                >
                  내 정보 수정
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold dark:text-white">{{ name }} 저장한 뉴스</div>
          <RouterLink :to="isMyProfile ? '/profile/news' : `/profile/${nicknameParam}/news`">
            <button class="text-[#191919] text-base cursor-pointer underline dark:text-white">
              더보기
            </button>
          </RouterLink>
        </div>
        <div>
          <SleepDog
            content="아직 저장한 뉴스가 없어요!"
            btnText="뉴스 보러가기"
            v-if="myNews.length === 0"
          />
          <div v-else-if="myNews.length !== 0" class="flex pt-12 space-x-[24px] w-full">
            <NewsComponent8
              v-for="(item, itemIndex) in scrapNews"
              :key="item.news_id + '-' + itemIndex"
              :newsObj="item"
              class="w-[229px]"
            />
          </div>
        </div>
      </div>

      <div class="mt-10 w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold dark:text-white">{{ name }} 작성한 글</div>
          <RouterLink :to="isMyProfile ? '/profile/write' : `/profile/${nicknameParam}/write`">
            <button class="text-[#191919] text-base cursor-pointer underline dark:text-white">
              더보기
            </button>
          </RouterLink>
        </div>
        <div>
          <SleepDog
            content="아직 작성한 글이 없어요!"
            btnText="글 쓰러가기"
            v-if="myPosts.length === 0"
          />
          <div v-else-if="myPosts.length !== 0" class="flex flex-col w-[735px]">
            <div v-for="post in myPosts" :key="post.post_id">
              <CommunityPost
                :title="post.title"
                :content="post.contents"
                :image="post.content_image"
                :categoryid="post.category_id"
                :userid="post.user_id"
                class="border-b border-b-gray-200 dark:border-b-gray-500 last:border-b-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
