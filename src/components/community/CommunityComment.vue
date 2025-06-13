<script setup>
import { fetchUser } from '@/api/fetchUser'
import { onMounted, ref } from 'vue'
import defaultImg from '@/assets/img/communityImg/profileDefault.svg'
import { userRelativeTime } from '@/composables/userRelativeTime'
const props = defineProps({
  commentId: Number,
  userId: String,
  contents: String,
  createdAt: String,
})
const user = ref(null)
const { timeDiffText, calculateDate } = userRelativeTime(props.createdAt)
onMounted(async () => {
  const userData = await fetchUser(props.userId)
  user.value = userData
  calculateDate()
})
</script>
<template>
  <div class="flex min-w-[830px] min-h-[58px] items-center mt-6">
    <img
      :src="user?.profile_img ? user?.profile_img : defaultImg"
      alt="댓글 프로필 이미지"
      class="w-[58px] h-[58px] rounded-full"
    />
    <div class="flex flex-col ml-[17px]">
      <div class="ml-[14px] flex items-center">
        <span class="text-[16px] text-[#191919] dark:text-[#FFFFFF]">{{ user?.nickname }}</span>
        <span class="text-[13px] ml-[8px] text-[#9A9A9A]">{{ timeDiffText }}</span>
      </div>
      <p class="ml-[14px] mt-[2px] text-[16px] text-[#191919] dark:text-[#8F8F8F]">
        {{ props.contents }}
      </p>
    </div>
  </div>
</template>
<style scoped></style>
