<script setup>
import { useModalStore } from '@/stores/newPostStore'
import CommunityModal from '../community/CommunityModal.vue'
import { useRouter } from 'vue-router'
defineProps({
  profileImg: String,
  nickname: String,
})
const modalStore = useModalStore()
const router = useRouter()
const goToMyPost = () => {
  router.push('/profile/write')
}
const postHandler = () => {
  modalStore.openModal()
}
</script>
<template>
  <div class="flex flex-col items-center w-[170px] min-h-[260px]">
    <!-- 프로필 -->
    <img :src="profileImg" alt="profileCardDog" class="w-[146px] h-[146px] mt-[15px]" />
    <p class="mt-4 text-xl dark:text-[#ffffff]">{{ nickname }}</p>
    <!-- 태그 -->
    <p class="mt-[6px] text-[14px] text-[#8F8F8F]">스포츠, 정치, 문화</p>

    <button
      class="mt-8 w-[170px] h-[50px] rounded-lg bg-[#7537E3] dark:bg-[#7846D2] hover:bg-[#601ED5] dark:hover:bg-[#6524D9] text-[#ffffff] text-[16px] cursor-pointer transition-all duration-300"
      @click="postHandler"
    >
      새 글 작성
    </button>
    <button
      @click="goToMyPost"
      class="mt-[10px] w-[170px] h-[50px] rounded-lg border border-[#7537E3] dark:border-[#7846D2] bg-[#ffffff] dark:bg-transparent hover:bg-[#F3ECFF] dark:hover:bg-[#2C204A] text-[#7537E3] dark:text-[#B185FF] text-[16px] cursor-pointer transition-all duration-300"
    >
      내가 작성한 글
    </button>
  </div>
  <div class="" v-if="modalStore.isModalOpen">
    <CommunityModal />
  </div>
</template>
<style scoped></style>
