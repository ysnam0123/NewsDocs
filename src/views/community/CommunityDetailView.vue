<script setup>
import ProfileCard from '@/components/common/ProfileCard.vue'
import CommunityPostDetail from '@/components/community/CommunityPostDetail.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, MessageSquare, MessageSquarePlus, ThumbsUp } from 'lucide-vue-next'
import CommunityComment from '@/components/community/CommunityComment.vue'
import CommunityMyComment from '@/components/community/CommunityMyComment.vue'
import { fetchPostDetail } from '@/api/community/fetchPostDetail'
import { fetchCategory } from '@/api/community/fetchCategory'
import { fetchUser } from '@/api/community/fetchUser'
import { fetchLike } from '@/api/community/like'
import { isLikedByUser, likeUpload, unlikeUpload } from '@/api/community/like'
import { userAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { fetchComment } from '@/api/community/comment'
const isLiked = ref(false)
const router = useRouter()
const route = useRoute()
const postId = route.params.id
const post = ref('')
const category = ref('')
const likeCount = ref('')
const writer = ref(null)
const comment = ref('')
const auth = userAuthStore()
const { user } = storeToRefs(auth)
// console.log('상세페이지 사용자정보:', user.value.user_id)
onMounted(async () => {
  if (!postId) return
  try {
    const postData = await fetchPostDetail(postId)
    post.value = postData
    // console.log('포스트정보:', post.value)

    const categoryData = await fetchCategory(postData.category_id)
    category.value = categoryData.title
    // console.log('카테고리 정보:', category.value)

    const writerData = await fetchUser(postData.user_id)
    writer.value = writerData
    // console.log('작성자 정보:', writer.value.user_id)
    // console.log('작성자 닉네임:', user)

    //게시글 좋아요 리스트
    const likeData = await fetchLike(postData.post_id)
    likeCount.value = likeData.length

    //로그인 사용자의 좋아요여부
    const liked = await isLikedByUser(postData.post_id, user.value.user_id)
    isLiked.value = liked

    const commentData = await fetchComment(postData.post_id)
    comment.value = commentData
  } catch (err) {
    console.error('상세페이지에서 불러오기 오류:', err)
  }
})
const goToCommunity = () => {
  router.push('/community')
}
const toggleLike = async () => {
  if (!user.value?.user_id) {
    alert('로그인이 필요합니다')
    return
  }
  isLiked.value = !isLiked.value
  if (isLiked.value) likeCount.value += 1
  else likeCount.value -= 1
  try {
    if (isLiked.value) {
      await likeUpload(post.value.post_id, user.value.user_id)
    } else {
      await unlikeUpload(post.value.post_id, user.value.user_id)
    }
    //좋아요 삭제도 구현해야함
  } catch (err) {
    console.error('좋아요 업로드/삭제 에러', err)
  }
}
// const toggleLike = async () => {
//   if (!user.value?.user_id) {
//     alert('로그인이 필요합니다')
//     return
//   } else if (!post.value?.post_id) return
//   try {
//     if (isLiked.value) {
//       await unlikeUpload(post.value.post_id, user.value.user_id)
//       isLiked.value = false
//     } else {
//       await likeUpload(post.value.post_id, user.value.user_id)
//       isLiked.value = true
//     }
//     //좋아요 삭제도 구현해야함
//   } catch (err) {
//     console.error(err)
//   }
// }
</script>
<template>
  <div class="flex w-[1440px] mx-auto">
    <!-- 왼쪽 화면 -->
    <div class="w-[328px] pl-[100px] mt-[40px]">
      <div class="sticky top-[40px] w-full">
        <!-- 프로필 & 태그 -->
        <ProfileCard />
      </div>
    </div>

    <!-- 오른쪽 화면 -->
    <div class="flex flex-col mt-[40px] w-[1112px]">
      <div class="w-[888px] pl-[58px] min-h-screen">
        <button
          @click="goToCommunity"
          class="w-40 h-10 gap-[10px] flex items-center cursor-pointer"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center bg-[#F6F6F6] dark:bg-[#363636] dark:hover:bg-[#4A4A4A]"
          >
            <ChevronLeft class="w-[18px] h-[18px] text-[#191919] dark:text-[#FFFFFF]" />
          </div>
          <p class="flex items-center text-[#191919] dark:text-[#FFFFFF] text-[16px]">목록으로</p>
        </button>

        <!-- 게시글 -->
        <CommunityPostDetail
          v-if="writer && post"
          :postId="postId"
          :img="post.content_image"
          :title="post.title"
          :content="post.contents"
          :category="category"
          :userId="writer.user_id"
          :userName="writer.nickname"
          :userImg="writer.profile_img"
          class="mt-5"
        />
        <!-- 좋아요,댓글 개수 -->
        <div class="flex items-center mt-[30px] w-auto h-[22px]">
          <div
            @click="toggleLike"
            class="flex cursor-pointer items-center"
            :class="[
              isLiked
                ? 'text-[#7537E3] dark:text-[#7846D2]'
                : 'text-[#B7B7B7] dark:text-[#7A7A7A] hover:text-[#191919] dark:hover:text-[#C0C0C0]',
            ]"
          >
            <ThumbsUp class="w-5 h-5" />
            <div class="ml-[3px] text-[16px]">{{ likeCount }}</div>
          </div>
          <div class="flex items-center text-[#B7B7B7] dark:text-[#7A7A7A]">
            <MessageSquare class="ml-4 w-5 h-5" />
            <div class="ml-[3px] text-[16px]">{{ comment?.length }}</div>
          </div>
        </div>
        <!-- 댓글입력 -->
        <div class="relative w-[830px] mt-5">
          <input
            class="w-full h-[50px] px-5 text-[16px] text-[#191919] dark:text-[#FFFFFF] placeholder-[#CECECE] border border-gray-200 dark:border-[#4D4D4D] rounded-[8px] outline-none"
            placeholder="댓글을 입력해주세요"
          />
          <MessageSquarePlus
            class="w-6 h-6 text-gray-400 dark:text-[#4D4D4D] cursor-pointer absolute top-1/2 right-4 -translate-y-1/2"
          />
        </div>
        <!-- 댓글 내용  -->
        <!-- 댓글1 -->
        <CommunityComment />
        <!-- 댓글2 -->
        <CommunityComment />
        <!-- <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
          <img
            src="../../assets/img/ChatImg.svg"
            alt="댓글 프로필 이미지"
            class="w-[58px] h-[58px]"
          />
          <div class="flex flex-col ml-[17px]">
            <div class="ml-[14px] flex items-center">
              <span class="text-[16px] text-[#191919] dark:text-[#FFFFFF]">공허의 코끼리</span>
              <span class="text-[13px] ml-[8px] text-[#9A9A9A]">방금 전</span>
            </div>
            <p class="ml-[14px] mt-[2px] text-[16px] text-[#191919] dark:text-[#8F8F8F]">
              댓글내용은 댓글내용이 댓글내용.
            </p>
          </div>
        </div> -->

        <!-- 댓글3 시작 -->
        <CommunityMyComment />
        <!-- 댓글 끝 -->

        <!-- 댓글 4 -->
        <CommunityComment />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
