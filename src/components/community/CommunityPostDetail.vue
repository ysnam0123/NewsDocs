<script setup>
import { useRouter } from 'vue-router'
import profileDefault from '../../assets/img/communityImg/profileDefault.svg'
const props = defineProps({
  postId: String,
  img: String,
  title: String,
  content: String,
  category: String,
  userId: String,
  userName: String,
  userImg: String,
  currentUserId: String,
})
// console.log('유저아이디:', props.userId)
const router = useRouter()
const handleProfile = () => {
  router.push(`/profile/${props.userId}`)
}
</script>
<template>
  <div
    class="flex flex-col w-[830px] max-h-[846px] px-10 rounded-[16px] border border-gray-200 dark:bg-[#242424] dark:border-[#333333]"
  >
    <!-- 작성자 -->
    <div class="flex w-full justify-between mt-8">
      <div @click="handleProfile" class="flex gap-[10px] items-center cursor-pointer">
        <img
          :src="userImg ? userImg : profileDefault"
          alt="사용자 이미지"
          class="w-12 h-12 rounded-full"
        />
        <p class="ml-[10px] text-lg text-[#191919] dark:text-[#FFFFFF]">{{ userName }}</p>
      </div>
      <div class="flex flex-col">
        <!-- 게시글 수정,삭제 -->
        <!-- <div v-if="props.currentUserId === props.userId">
          <CommunityPostModal :postId="props.postId" @delete="deleteHandler" @edit="editHandler" />
        </div> -->
        <div class="text-[16px] text-[#7537E3]">#{{ props?.category }}</div>
      </div>
    </div>

    <img
      v-if="props.img"
      :src="props.img"
      alt="게시글 이미지"
      class="mt-6 w-auto h-auto max-w-[750px] max-h-[361px] object-contain rounded-[12px]"
    />
    <!-- 제목 -->
    <div class="mt-8 text-2xl dark:text-[#FFFFFF]">{{ props?.title }}</div>
    <!-- 내용 -->
    <div
      class="w-[750px] min-h-[100px] mt-[14px] mb-10 text-[18px] text-[#191919] dark:text-[#FFFFFF]"
    >
      <p>
        {{ props?.content }}
      </p>
    </div>
  </div>
</template>
<style scoped></style>
