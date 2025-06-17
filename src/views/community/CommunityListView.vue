<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import ProfileCard from '@/components/common/ProfileCard.vue'
import { computed, onMounted, ref } from 'vue'
import { fetchPost } from '@/api/fetchPost'
import { useRouter } from 'vue-router'
import { fetchLike } from '@/api/community/like'
import CommunityPostSkel from '@/components/community/skeleton/CommunityPostSkel.vue'
import ProfileCardSkel from '@/components/community/skeleton/ProfileCardSkel.vue'
import { Plus } from 'lucide-vue-next'

const posts = ref([])
const postsWithLike = ref([])
const router = useRouter()
const selectCategory = ref('전체')
const selectedSort = ref('최신순')
const isLoading = ref(true)
const isMobOpen = ref(false)
//1,7 2,3 4,6 else
const categories = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']
const cateGroupMap = {
  '정치/경제': [1, 7],
  '연예/스포츠': [2, 3],
  '사회/문화': [4, 6],
  '해외/기타': [5, 8],
}

const handleCategory = (category) => {
  selectCategory.value = category
}
const handleSort = (sort) => {
  selectedSort.value = sort
}

const goToPostDetail = (post_id) => {
  router.push(`/community/${post_id}`)
}
const mobPostHandler = () => {
  isMobOpen.value != isMobOpen.value
}

onMounted(async () => {
  try {
    posts.value = await fetchPost()
    postsWithLike.value = await Promise.all(
      posts.value.map(async (post) => {
        const like = (await fetchLike(post.post_id)).length
        return { ...post, like }
      }),
    )

    postsWithLike.value = postsWithLike.value.map((post) => {
      for (const [group, id] of Object.entries(cateGroupMap)) {
        if (id.includes(post.category_id)) {
          return { ...post, cateGroup: group }
        }
      }
      return { ...post, cateGroup: '해외/기타' }
    })
  } catch (e) {
    alert(e.message)
  } finally {
    isLoading.value = false
  }
})

const displayPost = computed(() => {
  const list = [...postsWithLike.value].sort((a, b) => {
    if (selectedSort.value === '인기순') {
      return b.like - a.like
    } else {
      return new Date(b.created_at) - new Date(a.created_at)
    }
  })
  if (selectCategory.value === '전체') return list
  return list.filter((post) => post.cateGroup === selectCategory.value)
})
</script>
<template>
  <div class="flex w-full sm:w-[1440px] sm:mx-auto">
    <!-- 왼쪽 화면 -->
    <div class="sm:block hidden sm:w-[330px] sm:pl-[100px] sm:mt-[40px]">
      <div class="sticky top-[70px] w-full">
        <!-- 프로필 & 태그 -->
        <ProfileCardSkel v-if="isLoading" />
        <ProfileCard v-else />
      </div>
    </div>
    <!-- 모바일 -->
    <div class="block sm:hidden w-full">
      <div class="ml-5">
        <ProfileCardSkel v-if="isLoading" />
        <ProfileCard v-else />
      </div>

      <!-- 모바일 배너 -->
      <div class="mt-4 flex overflow-x-auto whitespace-nowrap no-scrollbar">
        <template v-for="category in categories" :key="category">
          <button
            @click="handleCategory(category)"
            :class="[
              'w-[102.8px] h-[54px] flex-shrink-0 text-[16px] border-b-1 cursor-pointer transition-all duration-300',
              selectCategory === category
                ? ' border-b-[#7537E3] dark:border-b-[#A878FD] text-[#7537E3] dark:text-[#A878FD]'
                : 'border-b-transparent text-[#9D9D9D]',
            ]"
          >
            {{ category }}
          </button>
        </template>
      </div>

      <!-- 모바일 게시글 -->
      <div class="flex flex-col w-full min-h-[424px]">
        <div v-if="isLoading" class="flex flex-col">
          <CommunityPostSkel />
        </div>
        <div v-else>
          <div v-for="post in displayPost" :key="post.post_id">
            <CommunityPost
              @click="goToPostDetail(post.post_id)"
              :postid="post.post_id"
              :title="post.title"
              :content="post.contents"
              :image="post.content_image"
              :categoryid="post.category_id"
              :userid="post.user_id"
              :like="post.like"
              class="border-b border-b-gray-200 dark:border-b-gray-500"
            />
          </div>
        </div>
      </div>
      <button
        class="fixed bottom-[20px] right-[20px] z-50 flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#7A42DF] shadow-md hover:bg-[#6935c6] transition"
        @click="mobPostHandler"
      >
        <Plus class="w-6 h-6 text-[#FFFFFF]" />
      </button>
      <div v-if="isMobOpen" class="fixed flex flex-col inset-0 bg-[#000000]/30">
        <div class="py-[8px] w-[135px] h-[88px] rounded-[8px] bg-[#FFFFFF]">
          <!-- +버튼 모달부분 임시 -->
          <div class="px-[12px]"></div>
          <div class="px-[12px]"></div>
        </div>
      </div>
    </div>

    <!-- 오른쪽 화면 -->
    <div class="flex flex-col mt-5 w-[1110px] pl-[60px] pr-[220px]">
      <div class="flex min-w-[834px] h-[54px] justify-between items-center">
        <!-- 배너 -->
        <div class="flex w-[514px] h-full">
          <template v-for="category in categories" :key="category">
            <button
              @click="handleCategory(category)"
              :class="[
                'w-[102.8px] whitespace-nowrap items-center justify-center text-[16px] border-b-2 cursor-pointer transition-all duration-300',
                selectCategory === category
                  ? ' border-b-[#7537E3] dark:border-b-[#A878FD] text-[#7537E3] dark:text-[#A878FD]'
                  : 'border-b-transparent text-[#9D9D9D]',
              ]"
            >
              {{ category }}
            </button>
          </template>
        </div>
        <!-- 정렬 -->
        <div class="flex min-w-24 h-[30px] items-center justify-end">
          <button
            @click="handleSort('최신순')"
            :class="[
              'w-12 h-[30px] flex items-center justify-center text-[12px] cursor-pointer transition-all duration-300',
              selectedSort === '최신순'
                ? 'underline underline-offset-3 text-[#191919] dark:text-[#ffffff]'
                : 'text-[#969696] dark:text-[#6F6F6F]',
            ]"
          >
            최신순
          </button>
          <button
            @click="handleSort('인기순')"
            :class="[
              'w-12 h-[30px] flex items-center justify-center text-[12px] cursor-pointer transition-all duration-300',
              selectedSort === '인기순'
                ? ' underline underline-offset-3 text-[#191919] dark:text-[#ffffff]'
                : 'text-[#969696] dark:text-[#6F6F6F]',
            ]"
          >
            인기순
          </button>
        </div>
      </div>
      <!-- 게시글 -->
      <div class="flex flex-col w-[835px]">
        <div v-if="isLoading" class="flex flex-col py-[5px] px-[5px] items-center justify-center">
          <CommunityPostSkel v-for="i in 4" :key="i" />
        </div>
        <div v-else>
          <div v-for="post in displayPost" :key="post.post_id">
            <CommunityPost
              @click="goToPostDetail(post.post_id)"
              :postid="post.post_id"
              :title="post.title"
              :content="post.contents"
              :image="post.content_image"
              :categoryid="post.category_id"
              :userid="post.user_id"
              :like="post.like"
              class="border-b border-b-gray-200 dark:border-b-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
