<script setup>
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBackHandler = () => {
  router.go(-1)
}
</script>
<template>
  <div class="mt-10 sticky top-[60px]">
    <div class="flex w-[170px] h-10 cursor-pointer">
      <div
        class="w-10 h-10 relative flex items-center justify-center bg-[#f6f6f6] dark:bg-[#363636] hover:bg-[#ededed] dark:hover:bg-[#4A4A4A] transition duration-300 rounded-full mr-2.5"
        @click="goBackHandler"
      >
        <ChevronLeft class="text-[#161616] dark:text-white" />
      </div>
      <span class="flex text-md items-center justify-center text-[#191919] dark:text-white"
        >돌아가기</span
      >
    </div>
  </div>
</template>
<style scoped></style>
