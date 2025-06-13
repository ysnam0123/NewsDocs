<script setup>
import CommunityPost from '@/components/community/CommunityPost.vue'
import ProfileCard from '@/components/common/ProfileCard.vue'
import { onMounted, ref } from 'vue'
import { fetchPost } from '@/api/fetchPost'
import { useRouter } from 'vue-router'

const posts = ref([])
const router = useRouter()
const selectCategory = ref('전체')
const selectedSort = ref('최신순')
const categories = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']
const handleCategory = (category) => {
  selectCategory.value = category
}
const handleSort = (sort) => {
  selectedSort.value = sort
}
const goToPostDetail = (post_id) => {
  router.push(`/community/${post_id}`)
}
onMounted(async () => {
  try {
    posts.value = await fetchPost()
  } catch (e) {
    alert(e.message)
  }
})
</script>
<template>
  <div class="flex w-[1440px] mx-auto">
    <!-- 왼쪽 화면 -->
    <div class="w-[330px] pl-[100px] mt-[40px]">
      <div class="sticky top-[70px] w-full">
        <!-- 프로필 & 태그 -->
        <ProfileCard />
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
        <div v-for="post in posts" :key="post.post_id">
          <CommunityPost
            @click="goToPostDetail(post.post_id)"
            :postid="post.post_id"
            :title="post.title"
            :content="post.contents"
            :image="post.content_image"
            :categoryid="post.category_id"
            :userid="post.user_id"
            class="border-b border-b-gray-200 dark:border-b-gray-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
