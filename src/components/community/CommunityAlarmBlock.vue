<script setup>
import { fetchUser } from '@/api/fetchUser'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import profileDefault from '../../assets/img/communityImg/profileDefault.svg'
import { fetchSingleComment } from '@/api/community/comment'
import { setRead } from '@/api/community/notification'

const props = defineProps({ noti: Object })
const emit = defineEmits(['closeModal'])
const writer = ref(null)
const comment = ref(null)
const router = useRouter()
const localNoti = ref({ ...props.noti })

const goToPostDetail = async () => {
  try {
    if (!localNoti.value.is_read) {
      await setRead(localNoti.value.noti_id)
      localNoti.value.is_read = true
    }
    emit('closeModal')
    router.push(`/community/${localNoti.value.post_id}`)
  } catch (err) {
    console.error('알림읽음처리실패:', err)
  }
}

onMounted(async () => {
  try {
    writer.value = await fetchUser(localNoti.value.actor_id)
    //comment_id가 존재하면 댓글 내용 받아오기(좋아요는 null)
    if (localNoti.value?.comments_id) {
      comment.value = await fetchSingleComment(localNoti.value.comments_id)
    }
  } catch (err) {
    console.error('알림 한개 로딩 실패:', err)
  }
})
</script>
<template>
  <div
    v-if="localNoti && writer"
    @click="goToPostDetail"
    class="flex items-center w-full h-[70px] hover:bg-[#F6F6F6] dark:hover:bg-[#585858] border-t border-t-gray-300 dark:border-t-[#4D4D4D] px-[6px] cursor-pointer"
    :class="
      localNoti.is_read === true
        ? 'bg-[#F6F6F6] dark:bg-[#585858]'
        : 'bg-[#FFFFFF] dark:bg-[#343434]'
    "
  >
    <img
      :src="writer.profile_img ? writer.profile_img : profileDefault"
      alt="발신인 프로필이미지"
      class="w-[45px] h-[45px] rounded-full"
    />
    <p v-if="localNoti.type === 'like'" class="ml-[10px] text-[14px] dark:text-[#D7D7D7]">
      {{ writer.nickname }}님이 좋아요를 남겼습니다
    </p>
    <div v-else-if="localNoti.type === 'comment'" class="ml-[10px] text-[14px] dark:text-[#D7D7D7]">
      <p>{{ writer.nickname }}님이 댓글을 남겼습니다</p>
      <p class="text-[10px] dark:text-[#D7D7D7] mt-[3px]">{{ comment?.contents }}</p>
    </div>
  </div>
</template>
<style scoped></style>
