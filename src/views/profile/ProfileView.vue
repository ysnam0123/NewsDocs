<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import ProfileDog from '@/components/icon/profileDog.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import SleepDog from '@/components/profile/SleepDog.vue'
import ProfileSkel from '@/components/NewsComponents/skeleton/ProfileSkel.vue'
import ProfileTitleSkel from '@/components/NewsComponents/skeleton/ProfileTitleSkel.vue'
import ProfileContentSkel from '@/components/NewsComponents/skeleton/ProfileContentSkel.vue'
import News8Skel from '@/components/NewsComponents/skeleton/News8Skel.vue'
import CommunityPostSkel from '@/components/NewsComponents/skeleton/CommunityPostSkel.vue'
import { computed, onMounted, ref } from 'vue'
import { fetchPost } from '@/api/fetchPost'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { fetchUserByNickname } from '@/api/fetchUserByNickname'
import { fetchInterest } from '@/api/fetchInterest'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { fetchUserScrap } from '@/api/fetchUserScrap'
import { fetchScrapNews } from '@/api/fetchScrapNews'

const posts = ref([])
const route = useRoute()
const router = useRouter()
const profileUser = ref(null)
const currentUser = ref(null)
const interest = ref(null)
const categorys = ref([])
const scrapNews = ref(null)
const userScrap = ref([])
const isLoading = ref(true)

const nicknameParam = route.params.nickname
const isMyProfile = computed(() => {
  return currentUser.value?.user_id === profileUser.value?.user_id
})

const goToPostDetail = (post_id) => {
  router.push(`/community/${post_id}`)
}

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
    isLoading.value = false
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
    <div class="max-w-full sm:max-w-[1200px] mx-5 sm:mx-auto">
      <div class="flex justify-between">
        <div class="mx-auto sm:mx-0 sm:flex sm:space-x-5 sm:mt-5">
          <profileSkel v-if="isLoading" />
          <ProfileDog v-else class="mx-auto sm:mx-0 mt-5 sm:mt-0" />
          <div class="flex flex-col justify-center sm:ml-[23px]">
            <div class="mx-auto sm:mx-0 text-[24px] font-semibold mb-1 dark:text-white">
              <ProfileTitleSkel v-if="isLoading" class="w-3xs h-11 pb-2" />
              <div v-else class="mt-4 sm:mt-0">
                {{ profileUser?.nickname || '닉네임을 지어주세요' }}
              </div>
            </div>
            <div class="flex space-x-2 mx-auto sm:mx-0">
              <template v-if="isLoading">
                <ProfileContentSkel class="w-[200px] h-[24px]" />
              </template>
              <template v-else>
                <div
                  v-for="category in categorys"
                  :key="category.category_id"
                  class="text-[#8F8F8F] text-sm"
                >
                  # {{ categoryNames[category - 1] }}
                </div>
              </template>
            </div>
            <div class="mt-3 w-[106px] mx-auto sm:mx-0">
              <ProfileContentSkel v-if="isLoading" class="w-full h-[24px]" />
              <div v-else>
                <RouterLink v-if="isMyProfile" to="/profile/edit">
                  <button
                    class="mx-auto items-center w-full h-[36px] bg-[#F6F6F6] text-center rounded-[8px] text-sm cursor-pointer hover:bg-[#EDEDED] dark:bg-[#363636] dark:text-white dark:hover:bg-[#4A4A4A]"
                  >
                    내 정보 수정
                  </button>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 w-full sm:w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold dark:text-white">{{ name }} 저장한 뉴스</div>
          <RouterLink :to="isMyProfile ? '/profile/news' : `/profile/${nicknameParam}/news`">
            <button
              v-if="myNews.length !== 0"
              class="text-[#191919] text-base cursor-pointer underline dark:text-white pt-[3px] mr-5 sm:mr-0"
            >
              더보기
            </button>
          </RouterLink>
        </div>
        <div class="w-full">
          <News8Skel v-if="isLoading" class="pt-5 sm:pt-12" />
          <div v-else>
            <div v-if="myNews.length === 0">
              <SleepDog
                class="border-[1px] border-gray-200 rounded-[12px] dark:border-[#4D4D4D]"
                :content="name + ' 스크랩한 뉴스가 없습니다.'"
                :btnText="isMyProfile ? '뉴스 보러가기' : null"
                to="/news"
              />
            </div>
            <div
              v-else-if="myNews.length !== 0"
              class="flex pt-5 sm:pt-12 sm:space-x-[24px] w-full"
            >
              <News8Skel v-if="isLoading" />
              <template v-else>
                <!-- 모바일용 (최대 2개) -->
                <div class="sm:hidden flex gap-[10px] sm:space-x-6 w-full">
                  <NewsComponent8
                    v-for="(item, index) in scrapNews.slice(0, 2)"
                    :key="'mobile-' + item.news_id + '-' + index"
                    :news="item"
                    class="w-full sm:w-[229px] mx-auto"
                  />
                </div>

                <!-- 데스크탑용 (최대 3개) -->
                <div class="hidden sm:flex space-x-6 w-full">
                  <NewsComponent8
                    v-for="(item, index) in scrapNews.slice(0, 3)"
                    :key="'desktop-' + item.news_id + '-' + index"
                    :news="item"
                    class="w-[229px]"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 w-full sm:w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold dark:text-white">{{ name }} 작성한 글</div>
          <RouterLink :to="isMyProfile ? '/profile/write' : `/profile/${nicknameParam}/write`">
            <button
              v-if="myPosts.length !== 0"
              class="text-[#191919] text-base cursor-pointer underline dark:text-white pt-[3px] mr-5 sm:mr-0"
            >
              더보기
            </button>
          </RouterLink>
        </div>
        <CommunityPostSkel v-if="isLoading" class="pt-12 mb-15" />
        <div v-else>
          <div v-if="myPosts.length === 0">
            <SleepDog
              class="border-[1px] border-gray-200 rounded-[12px] dark:border-[#4D4D4D] mb-15"
              :content="name + ' 작성한 글이 없습니다.'"
              :btnText="isMyProfile ? '글 쓰러가기' : null"
              to="/community"
            />
          </div>
          <div
            v-else-if="myPosts.length !== 0"
            class="flex flex-col w-full sm:w-[735px] sm:pt-6 mb-15"
          >
            <div v-for="post in myPosts.slice(0, 2)" :key="post.post_id">
              <CommunityPost
                @click="goToPostDetail(post.post_id)"
                :postid="post.post_id"
                :title="post.title"
                :content="post.contents"
                :image="post.content_image"
                :categoryid="post.category_id"
                :userid="post.user_id"
                :like="post.like"
                class="border-b-0 border-b-gray-200 dark:border-b-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
