<script setup>
import { useModalStore } from '@/stores/newPostStore'
import CommunityModal from '../community/CommunityModal.vue'
import { useRouter } from 'vue-router'
import defaultImg from '../../assets/img/communityImg/profileDefault.svg'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { onMounted, ref } from 'vue'
import { fetchInterest } from '@/api/fetchInterest'
import { fetchCategory } from '@/api/community/fetchCategory'
const currentUser = ref(null)
const modalStore = useModalStore()
const router = useRouter()
const interests = ref([])
const interestArr = ref([])

const goToMyPost = () => {
  router.push('/profile/write')
}
const goToLogin = () => {
  router.push('/login')
}
const goToProfile = () => {
  router.push('/profile')
}
const postHandler = () => {
  modalStore.openModal()
}

onMounted(async () => {
  try {
    const user = await getCurrentUser()
    // console.log(user.id)
    if (user) {
      currentUser.value = await fetchUser(user?.id)
      interests.value = await fetchInterest(user?.id)

      if (interests.value) {
        interestArr.value = await Promise.all(
          interests.value.map((interest) => fetchCategory(interest.category_id)),
        )
        // console.log(interestArr.value)
      }
    }
  } catch (e) {
    console.error(e.message)
  }
})
</script>
<template>
  <div class="relative flex flex-col items-center w-[170px] min-h-[260px]">
    <!-- 프로필 -->
    <div class="w-full flex flex-col items-center">
      <img
        @click="goToProfile"
        :src="currentUser && currentUser.profile_img ? currentUser.profile_img : defaultImg"
        alt="프로필이미지"
        class="w-[146px] h-[146px] mt-[15px] rounded-full object-cover cursor-pointer"
      />
      <p class="mt-4 text-xl dark:text-[#ffffff]">{{ currentUser?.nickname }}</p>
      <p class="mt-[6px] text-[14px] text-[#8F8F8F]">
        {{ interestArr.map((i) => i.title).join(', ') }}
      </p>
    </div>

    <!-- 버튼 -->
    <button
      class="mt-8 w-[170px] h-[50px] rounded-lg bg-[#7537E3] dark:bg-[#7846D2] hover:bg-[#601ED5] dark:hover:bg-[#6524D9] text-[#ffffff] text-[16px] transition-all duration-300 cursor-pointer"
      @click="postHandler"
    >
      새 글 작성
    </button>
    <button
      @click="goToMyPost"
      class="mt-[10px] w-[170px] h-[50px] rounded-lg border border-[#7537E3] dark:border-[#7846D2] bg-[#ffffff] dark:bg-transparent hover:bg-[#F3ECFF] dark:hover:bg-[#2C204A] text-[#7537E3] dark:text-[#B185FF] text-[16px] transition-all duration-300 cursor-pointer"
    >
      내가 작성한 글
    </button>

    <!-- 비로그인시 로그인 하러가기 버튼-->
    <div
      v-if="!currentUser"
      class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 dark:bg-black/30 text-center"
    >
      <p class="text-[14px] font-medium text-[#7537E3] dark:text-[#C2A5FF]">로그인이 필요합니다</p>
      <button
        @click="goToLogin"
        class="mt-3 px-3 py-1.5 bg-[#7537E3] text-white text-sm rounded-md hover:bg-[#5E2BC0] transition cursor-pointer"
      >
        로그인 하러가기
      </button>
    </div>
  </div>

  <div v-if="modalStore.isModalOpen">
    <CommunityModal />
  </div>
</template>
<style scoped></style>
