<script setup>
import { useRouter } from 'vue-router'
import DarkModeButton from './DarkModeButton.vue'
import { ChevronLeft } from 'lucide-vue-next'
const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template class="top-0 left-0">
  <div class="mt-1 flex max-w-full h-15.5 items-center gap-[75%] justify-center">
    <ChevronLeft class="cursor-pointer dark:text-white" @click="goBack" />
    <DarkModeButton />
  </div>
</template>
