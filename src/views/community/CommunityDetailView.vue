<script setup>
import ProfileCard from '@/components/common/ProfileCard.vue'
import CommunityPostDetail from '@/components/community/CommunityPostDetail.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, MessageSquare, PawPrint, ThumbsUp } from 'lucide-vue-next'
import CommunityComment from '@/components/community/CommunityComment.vue'
import { fetchPostDetail } from '@/api/community/fetchPostDetail'
import { fetchCategory } from '@/api/community/fetchCategory'
import { fetchUser } from '@/api/fetchUser'
import { fetchLike } from '@/api/community/like'
import { isLikedByUser, likeUpload, unlikeUpload } from '@/api/community/like'
import { commentUpload, deleteComment, fetchComment, updateComment } from '@/api/community/comment'
import CommunityMyComment from '@/components/community/CommunityMyComment.vue'
import { getCurrentUser } from '@/api/getCurrentUser'
// import { notiUpload } from '@/api/community/notification'
import { useToast } from 'vue-toastification'
import CommunityDetailSkel from '@/components/community/skeleton/CommunityDetailSkel.vue'
import ProfileCardSkel from '@/components/community/skeleton/ProfileCardSkel.vue'
import CommunityCommentSkel from '@/components/community/skeleton/CommunityCommentSkel.vue'

const isLoading = ref(true)
const isLiked = ref(false)
const router = useRouter()
const route = useRoute()
const toast = useToast()
const postId = route.params.id
const post = ref('')
const category = ref('')
const likeCount = ref('')
const writer = ref(null)
const comments = ref('')
const inputContent = ref('') //작성한 댓글내용
const commentCount = ref('')
const authUserId = ref(null)
const currentUser = ref(null)

onMounted(async () => {
  if (!postId) return
  try {
    const user = await getCurrentUser()
    if (user) {
      authUserId.value = user?.id
      currentUser.value = await fetchUser(user?.id)
    }
    const [postData, likeData, commentData] = await Promise.all([
      fetchPostDetail(postId),
      fetchLike(postId),
      fetchComment(postId),
    ])
    post.value = postData
    likeCount.value = likeData.length //게시글 좋아요 리스트
    comments.value = commentData
    commentCount.value = commentData.length

    const [categoryData, writerData] = await Promise.all([
      fetchCategory(postData.category_id),
      fetchUser(postData.user_id),
    ])
    category.value = categoryData.title
    writer.value = writerData

    //로그인 사용자의 좋아요여부
    if (currentUser.value) {
      const liked = await isLikedByUser(postData.post_id, currentUser.value.user_id)
      isLiked.value = liked
    }
  } catch (err) {
    toast.error('상세페이지 불러오는데 실패했습니다.')
    console.error('상세페이지에서 불러오기 오류:', err)
  } finally {
    isLoading.value = false
  }
})

const goToCommunity = () => {
  router.push('/community')
}

//좋아요 추가,삭제
const toggleLike = async () => {
  if (!currentUser.value) {
    toast.warn('로그인이 필요합니다.')
    return
  }
  isLiked.value = !isLiked.value
  if (isLiked.value) likeCount.value += 1
  else likeCount.value -= 1
  try {
    if (isLiked.value) {
      await likeUpload(post.value.post_id, currentUser.value.user_id)
      try {
        // await notiUpload(currentUser.value.user_id, writer.value.user_id, postId, null, 'like')
      } catch (notiErr) {
        console.warn('좋아요 알림 전송 실패:', notiErr)
      }
      console.log('좋아요 성공!')
    } else {
      await unlikeUpload(post.value.post_id, currentUser.value.user_id)
    }
    //좋아요 삭제도 구현해야함
  } catch (err) {
    console.error('좋아요 업로드/삭제 에러', err)
  }
}

//댓글 추가
const commentSubmitHandler = async () => {
  // console.log('댓글 업로드 준비완료')
  if (!currentUser.value) {
    toast.warn('로그인이 필요합니다.')
    return
  } else if (!inputContent.value.trim()) return

  const tempComment = {
    post_id: post.value.post_id,
    user_id: currentUser.value.user_id,
    contents: inputContent.value,
    created_at: new Date().toISOString().replace('Z', '+00:00'),
  }
  comments.value.unshift(tempComment)
  commentCount.value += 1
  const saveContent = inputContent.value // 댓글 전송하자마자 input창 비우기 위함
  inputContent.value = ''

  try {
    // const commentUploaded = await commentUpload({
    await commentUpload({
      postId: post.value.post_id,
      userId: currentUser.value.user_id,
      content: saveContent,
    })

    // if (commentUploaded?.comments_id) {
    //   try {
    //     await notiUpload(
    //       currentUser.value.user_id,
    //       writer.value.user_id,
    //       postId,
    //       commentUploaded.comments_id,
    //       'comment',
    //     )
    //   } catch (notiErr) {
    //     console.warn('알림 등록 실패:', notiErr)
    //   }

    toast.success('댓글이 등록되었습니다.')
    // } else {
    //   throw new Error('댓글 업로드 되었지만 id가 없습니다.')
    // }
  } catch (err) {
    console.error('댓글 등록 에러', err)
    comments.value = comments.value.filter((c) => c.comments_id !== tempComment.comments_id)
    commentCount.value -= 1
    toast.error('댓글 등록에 실패했습니다.')
  }
}
//댓글 수정
const editCommentHandler = async ({ commentId, newContent }) => {
  try {
    await updateComment(commentId, newContent)
    const target = comments.value.find((c) => c.comments_id === commentId)
    if (target) target.contents = newContent
    toast.success('댓글이 수정되었습니다.')
  } catch (err) {
    toast.error('댓글 수정에 실패했습니다.')
    console.error(err)
  }
}
//댓글 삭제
const deleteCommentHandler = async (commentId) => {
  const target = comments.value.find((c) => c.comments_id === commentId)
  if (target?.isTemp) {
    // 임시저장해둔 댓글일경우 comments에서만 제외시킴
    comments.value = comments.value.filter((c) => c.comments_id !== commentId)
    commentCount.value -= 1
    return
  }
  //임시저장이아니면 실제 data에서 삭제
  try {
    await deleteComment(commentId)
    comments.value = comments.value.filter((c) => c.comments_id !== commentId)
    commentCount.value -= 1
    toast.success('댓글이 삭제되었습니다.')
  } catch (err) {
    toast.error('댓글 삭제에 실패했습니다.')
    console.error('댓글 삭제 실패', err)
  }
}
</script>
<template>
  <div class="flex w-[1440px] mx-auto">
    <!-- 왼쪽 화면 -->
    <div class="w-[328px] pl-[100px] mt-[40px]">
      <div class="sticky top-[40px] w-full">
        <!-- 프로필 & 태그 -->
        <ProfileCardSkel v-if="isLoading" />
        <ProfileCard v-else />
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
            class="w-10 h-10 rounded-full flex items-center justify-center bg-[#ffffff] hover:bg-[#F6F6F6] dark:bg-[#363636] dark:hover:bg-[#4A4A4A]"
          >
            <ChevronLeft class="w-[18px] h-[18px] text-[#191919] dark:text-[#FFFFFF]" />
          </div>
          <p class="flex items-center text-[#191919] dark:text-[#FFFFFF] text-[16px]">목록으로</p>
        </button>

        <!-- 게시글 -->
        <CommunityDetailSkel v-if="isLoading" />
        <div v-else>
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
            :currentUserId="currentUser.user_id"
            class="mt-5"
          />
        </div>
        <!-- 좋아요,댓글 개수 -->

        <div v-if="isLoading" class="flex items-center mt-[30px] gap-4 w-[109px] h-[22px]">
          <!-- 스켈레톤 -->
          <div class="w-[43px] h-[22px] rounded-[8px] bg-gray-300 animate-pulse"></div>
          <div class="w-[43px] h-[22px] rounded-[8px] bg-gray-300 animate-pulse"></div>
        </div>

        <div v-else class="flex items-center mt-[30px] w-auto h-[22px]">
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
            <div class="ml-[3px] text-[16px]">{{ comments?.length }}</div>
          </div>
        </div>
        <!-- 댓글입력 -->
        <label class="relative w-[830px] mt-[20px] inline-block">
          <input
            v-model="inputContent"
            @keyup.enter="commentSubmitHandler"
            class="w-full h-[50px] px-5 text-[16px] text-[#191919] dark:text-[#FFFFFF] placeholder-[#CECECE] border border-gray-200 dark:border-[#4D4D4D] rounded-[8px] focus:border-gray-400 focus:outline-none"
            placeholder="댓글을 입력해주세요"
          />
          <PawPrint
            @click="commentSubmitHandler"
            class="w-6 h-6 text-gray-400 dark:text-[#4D4D4D] hover:text-gray-300 dark:hover:text-[#CECECE] cursor-pointer absolute top-1/2 right-4 -translate-y-1/2"
          />
        </label>
        <!-- 댓글 내용  -->
        <div v-if="isLoading">
          <CommunityCommentSkel />
        </div>
        <div v-else>
          <div
            v-if="comments.length === 0"
            class="w-full h-[200px] flex items-center justify-center text-[#CECECE]"
          >
            아직 댓글이 없습니다.
          </div>
          <div v-else>
            <template v-for="comment in comments" :key="comment.comments_id">
              <!-- 댓글 -->
              <CommunityMyComment
                v-if="comment.user_id === currentUser?.user_id"
                :commentId="comment.comments_id"
                :userId="comment.user_id"
                :contents="comment.contents"
                :createdAt="comment.created_at"
                @delete="deleteCommentHandler"
                @edit="editCommentHandler"
              />
              <CommunityComment
                v-else
                :commentId="comment.comments_id"
                :userId="comment.user_id"
                :contents="comment.contents"
                :createdAt="comment.created_at"
              />
            </template>
            <div class="w-full h-[64px]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
