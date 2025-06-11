<script setup>
import { computed, onMounted, ref } from 'vue'
import defaultProfile from '@/assets/img/profileDog.svg'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'
import { updateProfileImg } from '@/api/updateProfileImg'

const currentUser = ref(null)

onMounted(async () => {
  try {
    const user = await getCurrentUser()

    currentUser.value = await fetchUser(user?.id)
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
    const result = await updateProfileImg(currentUser.value?.user_id, fileObj)

    if (result && result.length > 0) {
      currentUser.value.profile_img = result[0].profile_img
    }
  } catch (error) {
    console.error('이미지 처리 중 에러:', error)
    alert('이미지 업로드 실패')
  }
}

const isDefaultImage = computed(() => myProfile.value === defaultProfile)
const myProfile = computed(() => currentUser.value?.profile_img || defaultProfile)
</script>
<template>
  <div class="w-[146px] h-[146px]">
    <div
      class="flex w-full h-full bg-[#F6F6F6] rounded-full items-center justify-center dark:bg-[#444444] cursor-pointer relative overflow-hidden"
      @click="triggerFileInput"
    >
      <img
        :src="myProfile"
        :class="isDefaultImage ? 'w-[86px] h-[86px]' : 'w-full h-full '"
        class="rounded-full object-cover w-full h-full"
      />
      <input
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
