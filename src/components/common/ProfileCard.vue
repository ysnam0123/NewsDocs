<script setup>
import { useModalStore } from '@/stores/newPostStore'
import CommunityModal from '../community/CommunityModal.vue'
const modalStore = useModalStore()

const postHandler = () => {
  modalStore.openModal()
}
</script>
<template>
  <div class="flex flex-col items-center w-[170px] min-h-[260px]">
    <!-- 프로필 -->
    <img
      src="../../assets/img/profileCardDog.svg"
      alt="profileCardDog"
      class="w-[146px] h-[146px] mt-[15px]"
    />
    <p class="mt-4 text-xl font-semibold">독재자 강아지</p>
    <!-- 태그 -->
    <p class="mt-[6px] text-[14px] text-[#8F8F8F]">스포츠, 정치, 문화</p>

    <button
      class="mt-8 w-[170px] h-[50px] rounded-lg bg-[#7537E3] hover:bg-[#601ED5] text-[#ffffff] text-[16px] cursor-pointer"
      @click="postHandler"
    >
      새 글 작성
    </button>
    <button
      class="mt-[10px] w-[170px] h-[50px] rounded-lg border border-[#7537E3] bg-[#ffffff] hover:bg-[#F3ECFF] text-[#7537E3] text-[16px] cursor-pointer"
    >
      내가 작성한 글
    </button>
  </div>
  <div class="" v-if="modalStore.isModalOpen">
    <CommunityModal />
  </div>
</template>
<style scoped></style>
