<script setup>
import { fetchCategory } from '@/api/community/fetchCategory'
import { fetchUser } from '@/api/community/fetchUser'
import { ThumbsUp, MessageSquare } from 'lucide-vue-next'

import { onMounted, ref } from 'vue'
import defaultImg from '../../assets/img/communityImg/newsdog4.svg'
import defaultProfile from '../../assets/img/communityImg/profileDefault.svg'
import { fetchLike } from '@/api/community/like'
import { fetchComment } from '@/api/community/comment'
const props = defineProps({
  postid: Number,
  title: String,
  content: String,
  image: String,
  categoryid: Number,
  userid: String,
})
console.log('사용자 이미지:', props.image)
const likeData = ref([])
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
    likeData.value = await fetchLike(props.postid)
    // console.log('좋아요개수:', likeData.value.length)
    commentData.value = await fetchComment(props.postid)
  } catch (err) {
    console.log('post렌더링에러:', err.message)
  }
})
</script>
<template>
  <div class="flex items-center gap-[24px] w-full h-[237px] group cursor-pointer">
    <!-- 이미지 -->
    <div
      class="flex items-center justify-center w-[232px] h-[171px] rounded-[12px] bg-[#F6F6F6] group-hover:opacity-80 transition-all duration-300"
    >
      <img
        :src="props.image ? props.image : defaultImg"
        alt="게시글 이미지"
        :class="props.image ? 'w-full h-full' : 'w-[144px] h-[93px] '"
      />
    </div>
    <div class="flex flex-col flex-grow">
      <!-- 게시글 내용 -->
      <div class="flex flex-col justify-center w-full h-[172px]">
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
            class="flex items-center text-[16px] text-[#7537E3] dark:text-[#A878FD]"
          >
            #{{ categoryData.title }}
          </p>
        </div>
        <!-- 내용 -->
        <div class="mt-5">
          <div
            class="text-xl group-hover:text-[#515151] text-[#191919] dark:text-[#ffffff] transition-all duration-300"
          >
            {{ props.title }}
          </div>
          <div
            class="mt-[6px] text-[14px] group-hover:text-[#515151] text-[#191919] dark:text-[#8F8F8F] transition-all duration-300"
          >
            {{ props.content }}
          </div>
        </div>

        <!-- 좋아요,댓글 -->
        <div class="flex items-center w-auto mt-auto h-[18px]">
          <ThumbsUp class="w-4 h-4 text-[#B7B7B7]" />
          <div class="text-[#B7B7B7] dark:text-[#7A7A7A] ml-[3px] text-[13px]">
            {{ likeData.length }}
          </div>

          <MessageSquare class="w-4 h-4 ml-[11px] text-[#B7B7B7]" />
          <div class="text-[#B7B7B7] dark:text-[#7A7A7A] ml-[3px] text-[13px]">
            {{ commentData.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
