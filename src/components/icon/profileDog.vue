<script setup>
import { computed, onMounted, ref } from 'vue'
import defaultProfile from '@/assets/img/profileDog.svg'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { fetchUserByNickname } from '@/api/fetchUserByNickname'
import { updateProfileImg } from '@/api/updateProfileImg'
import { useRoute } from 'vue-router'

const route = useRoute()
const profileUser = ref(null)
const currentUser = ref(null)

const nicknameParam = route.params.nickname
const isMyProfile = computed(() => {
  return currentUser.value?.user_id === profileUser.value?.user_id
})

onMounted(async () => {
  try {
    const user = await getCurrentUser()
    currentUser.value = await fetchUser(user?.id)

    if (nicknameParam) {
      profileUser.value = await fetchUserByNickname(nicknameParam)
    } else {
      profileUser.value = currentUser.value
    }
  } catch (e) {
    alert(e.message)
  }
})

const previewImage = ref(defaultProfile)

const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = async (e) => {
  const fileObj = e.target.files[0]
  if (!fileObj) return

  try {
    previewImage.value = URL.createObjectURL(fileObj)
    const result = await updateProfileImg(profileUser.value?.user_id, fileObj)
    // 임시로 새로고침 넣었습니다
    window.location.reload()
    if (result && result.length > 0) {
      profileUser.value.profile_img = result[0].profile_img
    }
  } catch (error) {
    console.error('이미지 처리 중 에러:', error)
    alert('이미지 업로드 실패')
  }
}

const isDefaultImage = computed(() => profileUser.value?.profile_img === null)
const myProfile = computed(() => profileUser.value?.profile_img || defaultProfile)
</script>
<template>
  <div class="w-[146px] h-[146px]">
    <div
      class="flex w-full h-full bg-[#F6F6F6] rounded-full items-center justify-center dark:bg-[#444444] relative overflow-hidden"
      :class="{ 'cursor-pointer': isMyProfile }"
      @click="isMyProfile && triggerFileInput()"
    >
      <img
        :src="myProfile"
        :class="[isDefaultImage ? 'w-[86px] h-[86px]' : 'w-full h-full']"
        class="rounded-full object-cover"
      />
      <input
        v-if="isMyProfile"
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFileChange"
        class="hidden"
      />
    </div>
  </div>
</template>
<style scoped></style>
