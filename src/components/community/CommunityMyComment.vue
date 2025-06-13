<script setup>
import CommunityCommentModal from './CommunityCommentModal.vue'
import { fetchUser } from '@/api/fetchUser'
import { onMounted, ref } from 'vue'
import defaultImg from '@/assets/img/communityImg/profileDefault.svg'
import { Bone } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { userRelativeTime } from '@/composables/userRelativeTime'
const props = defineProps({
  commentId: Number,
  userId: String,
  contents: String,
  createdAt: String,
})
const router = useRouter()
const emit = defineEmits(['delete', 'emit'])
const user = ref(null)
const isEditing = ref(false)
const editContent = ref(props.contents)
const { timeDiffText, calculateDate } = userRelativeTime(props.createdAt)

const goToProfile = () => {
  router.push(`/profile/${props.userId}`)
}
const deleteHandler = (commentId) => {
  emit('delete', commentId)
}
const editHandler = () => {
  isEditing.value = true
  editContent.value = props.contents
}
const saveEdit = () => {
  emit('edit', {
    commentId: props.commentId,
    newContent: editContent.value,
  })
  isEditing.value = false
}
onMounted(async () => {
  const userData = await fetchUser(props.userId)
  user.value = userData
  calculateDate()
  //
})
</script>
<template>
  <!-- 내 댓글 -->
  <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
    <img
      @click="goToProfile"
      :src="user?.profile_img ? user?.profile_img : defaultImg"
      alt="댓글 프로필 이미지"
      class="w-[58px] h-[58px] rounded-full cursor-pointer"
    />
    <div class="flex flex-col w-full ml-[17px]">
      <div class="pl-[14px] w-full flex items-center justify-between">
        <div class="flex items-center">
          <span
            @click="goToProfile"
            class="text-[16px] text-[#191919] dark:text-[#FFFFFF] cursor-pointer"
            >{{ user?.nickname }}</span
          >
          <span class="text-[13px] ml-[8px] text-[#9A9A9A]">{{ timeDiffText }}</span>
        </div>

        <CommunityCommentModal
          :commentId="props.commentId"
          @delete="deleteHandler"
          @edit="editHandler"
        />
      </div>

      <div class="flex ml-[14px] mt-[2px] text-[16px] text-[#191919] dark:text-[#8F8F8F]">
        <form
          @submit.prevent="saveEdit"
          v-if="isEditing"
          class="w-full flex justify-between gap-[20px]"
        >
          <input
            v-model="editContent"
            class="w-full focus:outline-none focus:bg-gray-50 border-b border-b-[#9A9A9A]"
          />
          <Bone @click="saveEdit" type="editContent" class="mr-[10px] cursor-pointer text-[#191919]"
            >수정하기</Bone
          >
        </form>
        <template v-else>
          {{ props.contents }}
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
