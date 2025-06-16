<script setup>
import { useThemeStore } from '@/stores/useDarkmode'
import { useRouter } from 'vue-router'
import DarkModeButton from './DarkModeButton.vue'
import dog from '../../assets/img/dog-trans.svg'
import { computed } from 'vue'

const themeStore = useThemeStore()
const router = useRouter()
const isDark = computed(() => themeStore.isDark)

const movePage = (path) => router.push(path)
</script>
<template class="fixed top-0 left-0">
  <div
    class="max-w-[80%] mx-auto py-4 flex items-center md:h-[100px] h-[80px] bg-[var(--bg-color)] backdrop-blur-[28px]"
  >
    <div class="flex items-center gap-[10px] cursor-pointer" @click="movePage('/')">
      <div class="w-[46px] h-[46px] rounded-full flex justify-center items-center bg-[#7B42DF]">
        <img :src="dog" class="w-[28px] h-[26px]" />
      </div>
      <h1 class="text-[40px] dark:text-white text-center font-extrabold luckiest-guy-regular">
        newsDocs
      </h1>
    </div>
    <div class="ml-auto">
      <DarkModeButton />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Jersey+10&family=Luckiest+Guy&family=Noto+Sans+KR:wght@100..900&display=swap');
.luckiest-guy-regular {
  font-family: 'Luckiest Guy', cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
