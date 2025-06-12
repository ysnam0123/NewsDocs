<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import { computed, onMounted, ref } from 'vue'
import BackButton from '@/components/common/BackButton.vue'
import { fetchPost } from '@/api/fetchPost'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { useRoute } from 'vue-router'
import { fetchUserByNickname } from '@/api/fetchUserByNickname'

const activeTab = ref('전체')

const tabs = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']

const posts = ref([])
const currentUser = ref(null)
const route = useRoute()
const profileUser = ref(null)

const nicknameParam = route.params.nickname
const name = nicknameParam ? nicknameParam + '님이' : '내가'

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
  } catch (e) {
    alert(e.message)
  }
})

const myPosts = computed(() =>
  profileUser.value ? posts.value.filter((post) => post.user_id === profileUser.value.user_id) : [],
)
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
          class="flex border-[#9A9A9A] border-b-[0.5px] h-[52px] items-center text-center space-x-4 mb-5 relative dark:border-[#3C3C3C]"
        >
          <div
            v-for="tab in tabs"
            :key="tab"
            @click="
              () => {
                activeTab = tab
                console.log('activeTab:', activeTab)
              }
            "
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
      <div class="flex flex-col w-[735px]">
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
</template>
<style scoped></style>
