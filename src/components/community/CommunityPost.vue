<script setup>
import { fetchCategory } from '@/api/community/fetchCategory'
import { fetchUser } from '@/api/fetchUser'
import { ThumbsUp, MessageSquare } from 'lucide-vue-next'

import { onMounted, ref } from 'vue'
import defaultImg from '../../assets/img/communityImg/newsdog4.svg'
import defaultProfile from '../../assets/img/communityImg/profileDefault.svg'

import { fetchComment } from '@/api/community/comment'
const props = defineProps({
  postid: Number,
  title: String,
  content: String,
  image: String,
  categoryid: Number,
  userid: String,
  like: Number,
})

const categoryData = ref(null)
const userData = ref(null)
const commentData = ref('')

onMounted(async () => {
  if (props.categoryid) {
    const categoryres = await fetchCategory(props.categoryid)
    categoryData.value = categoryres
  }
  if (props.userid) {
    const userres = await fetchUser(props.userid)
    userData.value = userres
  }
  try {
    commentData.value = await fetchComment(props.postid)
  } catch (err) {
    console.log('post렌더링에러:', err.message)
  }
})
</script>
<template>
  <div
    class="flex flex-col sm:flex-row justify-center sm:items-center gap-[16px] sm:gap-[24px] w-full sm:h-[237px] py-6 sm:py-0 group cursor-pointer"
  >
    <!-- 이미지 -->
    <div
      class="w-full sm:w-[232px] min-h-[236px] sm:h-[171px] flex items-center justify-center overflow-hidden rounded-[12px] bg-[#F6F6F6] group-hover:opacity-80 transition-all duration-300"
    >
      <img
        :src="props.image ? props.image : defaultImg"
        alt="게시글 이미지"
        :class="
          props.image
            ? 'w-full h-full object-cover sm:rounded-[12px]'
            : 'w-[90px] sm:w-[172px] h-[48px] sm:h-[91px]'
        "
      />
    </div>

    <div class="flex flex-col flex-grow">
      <!-- 게시글 내용 -->
      <div class="flex flex-col justify-center w-full h-[172px] px-5 sm:px-0">
        <!-- 작성자&태그 -->
        <div class="w-full h-10 flex items-center justify-between">
          <!-- 작성자 -->
          <div class="flex gap-[9.5px] items-center">
            <img
              :src="userData?.profile_img ? userData.profile_img : defaultProfile"
              alt="작성자 프로필 이미지"
              class="w-10 h-10 rounded-full bg-gray-300"
            />
            <div class="text-[16px] dark:text-[#ffffff]">{{ userData?.nickname }}</div>
          </div>
          <!-- 태그 -->
          <p
            v-if="categoryData"
            class="flex items-center text-[14px] sm:text-[16px] text-[#7537E3] dark:text-[#A878FD]"
          >
            #{{ categoryData.title }}
          </p>
        </div>

        <!-- 내용 -->
        <div class="mt-4 sm:mt-5 w-full sm:max-w-[574px]">
          <div
            class="text-xl group-hover:text-[#515151] text-[#191919] dark:text-[#ffffff] transition-all duration-300 truncate overflow-hidden whitespace-nowrap"
          >
            {{ props.title }}
          </div>
          <div
            class="mt-[6px] text-[14px] group-hover:text-[#515151] text-[#191919] dark:text-[#8F8F8F] transition-all duration-300 line-clamp-2 overflow-hidden"
          >
            {{ props.content }}
          </div>
        </div>

        <!-- 좋아요,댓글 -->
        <div class="flex items-center w-auto mt-auto h-[18px]">
          <ThumbsUp class="w-4 h-4 text-[#B7B7B7]" />
          <div class="text-[#B7B7B7] dark:text-[#7A7A7A] ml-[1px] sm:ml-[3px] text-[13px]">
            {{ props.like }}
          </div>

          <MessageSquare class="w-4 h-4 ml-[11px] text-[#B7B7B7]" />
          <div class="text-[#B7B7B7] dark:text-[#7A7A7A] ml-[1px] sm:ml-[3px] text-[13px]">
            {{ commentData.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
