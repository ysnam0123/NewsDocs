<script setup>
import { computed, ref } from 'vue'

// 기본 이미지 경로 (svg)
import defaultProfile from '@/assets/img/profileDog.svg'

const previewImage = ref(defaultProfile)

const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    previewImage.value = URL.createObjectURL(file)
  }
}
const isDefaultImage = computed(() => previewImage.value === defaultProfile)
</script>
<template>
  <div class="w-[146px] h-[146px]">
    <div
      class="flex w-full h-full bg-[#F6F6F6] rounded-full items-center justify-center dark:bg-[#444444] cursor-pointer relative overflow-hidden"
      @click="triggerFileInput"
    >
      <img
        :src="previewImage"
        :class="isDefaultImage ? 'w-[86px] h-[86px]' : 'w-full h-full '"
        class="rounded-full object-cover"
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
