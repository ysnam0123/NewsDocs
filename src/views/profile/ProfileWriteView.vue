<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import { computed, onMounted, ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'
import { fetchPost } from '@/api/fetchPost'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { useRoute } from 'vue-router'
import { fetchUserByNickname } from '@/api/fetchUserByNickname'
import SleepDog from '@/components/profile/SleepDog.vue'
import CommunityPostSkel from '@/components/NewsComponents/skeleton/CommunityPostSkel.vue'
import { useRouter } from 'vue-router'

const tabs = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']
const tabsMap = {
  '정치/경제': [1, 7],
  '연예/스포츠': [2, 3],
  '사회/문화': [4, 6],
  '해외/기타': [5, 8],
}
const posts = ref([])
const currentUser = ref(null)
const route = useRoute()
const profileUser = ref(null)
const activeTab = ref('전체')
const isLoading = ref(true)
const router = useRouter()

const nicknameParam = route.params.nickname
const name = nicknameParam ? nicknameParam + '님이' : '내가'

const goToPostDetail = (post_id) => {
  router.push(`/community/${post_id}`)
}

onMounted(async () => {
  try {
    posts.value = await fetchPost()
    const user = await getCurrentUser()
    currentUser.value = await fetchUser(user?.id)

    if (nicknameParam) {
      profileUser.value = await fetchUserByNickname(nicknameParam)
    } else {
      profileUser.value = currentUser.value
    }
    isLoading.value = false
  } catch (e) {
    alert(e.message)
  }
})

const filteredPosts = computed(() => {
  if (!profileUser.value) return []
  const userPosts = posts.value.filter((post) => post.user_id === profileUser.value.user_id)

  if (activeTab.value === '전체') return userPosts

  const categoryIds = tabsMap[activeTab.value] || []
  return userPosts.filter((post) => categoryIds.includes(post.category_id))
})
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-[735px] mx-auto mt-10">
      <div class="mb-4">
        <BackButton />
      </div>
      <div class="text-[28px] font-bold dark:text-white mb-8">{{ name }} 작성한 글</div>
      <div class="relative">
        <div
          class="flex border-[#9A9A9A] border-b-[0.5px] h-[52px] items-center text-center mb-5 relative dark:border-[#3C3C3C]"
        >
          <div
            v-for="tab in tabs"
            :key="tab"
            @click="
              () => {
                activeTab = tab
              }
            "
            class="flex items-center justify-center w-[147px] h-full text-base cursor-pointer relative transition-all duration-300 dark:hover:text-[#A878FD] hover:text-[#7537E3]"
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
              left: `${tabs.indexOf(activeTab) * 147}px`,
              width: '147px',
            }"
          />
        </div>
      </div>

      <div class="flex flex-col w-[735px]">
        <CommunityPostSkel v-if="isLoading" />
        <div v-else>
          <div v-if="filteredPosts.length === 0">
            <SleepDog class="mb-15 border-0" :content="name + ' 작성한 글이 없습니다.'" />
          </div>
          <div v-else>
            <div v-for="post in filteredPosts" :key="post.post_id">
              <CommunityPost
                @click="goToPostDetail(post.post_id)"
                :postid="post.post_id"
                :title="post.title"
                :content="post.contents"
                :image="post.content_image"
                :categoryid="post.category_id"
                :userid="post.user_id"
                :like="post.like"
                class="border-b border-b-gray-200 dark:border-b-gray-500 w-[735px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
