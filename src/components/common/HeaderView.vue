<script setup>
import { useThemeStore } from '@/stores/useDarkmode'
import { useRouter } from 'vue-router'
import CommunityAlarm from '../community/CommunityAlarm.vue'
import { ref } from 'vue'
import { useNotiStore } from '@/stores/useNotiStore'
import { Bell, User } from 'lucide-vue-next'
import DarkModeButton from './DarkModeButton.vue'
import dog from '../../assets/img/dog-trans.svg'
import { computed } from 'vue'

const themeStore = useThemeStore()
const router = useRouter()
const isDark = computed(() => themeStore.isDark)

const isNotiOpen = ref(false)
const notiStore = useNotiStore()

const movePage = (path) => router.push(path)

const notiHandler = () => {
  isNotiOpen.value = !isNotiOpen.value
}
</script>
<template>
  <div
    class="max-w-[80%] mx-auto py-4 flex items-center md:h-[100px] h-[80px] bg-[var(--bg-color)] backdrop-blur-[28px]"
  >
    <div class="flex items-center gap-[10px] cursor-pointer">
      <div class="w-[46px] h-[46px] rounded-full flex justify-center items-center bg-[#7B42DF]">
        <img :src="dog" class="w-[28px] h-[26px]" />
      </div>
      <h1 class="text-[40px] dark:text-white text-center font-extrabold luckiest-guy-regular">
        newsDocs
      </h1>
    </div>
    <div class="ml-[56px]">
      <ul class="flex gap-[32px] select-none">
        <li
          class="text-[var(--nav-text)] cursor-pointer flex py-[8px] duration-300 transition-all hover:text-[var(--nav-text-hover)] hover:font-bold text-[18px]"
          @click="movePage('/myinterest')"
        >
          맞춤 소식
        </li>
        <li
          class="text-[var(--nav-text)] cursor-pointer flex py-[8px] duration-300 transition-all hover:text-[var(--nav-text-hover)] hover:font-bold text-[18px]"
          @click="movePage('/news')"
        >
          모든 소식
        </li>
        <li
          class="text-[var(--nav-text)] cursor-pointer flex py-[8px] duration-300 transition-all hover:text-[var(--nav-text-hover)] hover:font-bold text-[18px]"
          @click="movePage('/community')"
        >
          의견 나누기
        </li>
      </ul>
    </div>
    <div class="flex items-center gap-[10px] ml-auto">
      <!-- 관심사 변경 -->
      <div class="cursor-pointer ml-[14px] mr-[20px]">
        <button
          class="cursor-pointer rounded-[8px] w-[96px] h-[42px] font-semibold bg-[var(--GP-button-bg)] text-[var(--GP-button-text)] hover:bg-[var(--GP-button-hover)]"
          @click="movePage('/interest')"
        >
          관심사 수정
        </button>
      </div>

      <DarkModeButton />

      <!-- 알림 -->
      <div
        @click="notiHandler"
        class="relative w-[40px] h-[40px] rounded-[100%] bg-[var(--element-background)] hover:bg-[var(--element-background-hover)] flex items-center justify-center ml-[12px]"
      >
        <Bell :size="24" :color="isDark ? '#f6f6f6' : '#363636'" class="relative cursor-pointer" />
        <div
          v-if="notiStore.hasUnread === true"
          class="absolute top-[1px] right-[3px] w-[9px] h-[9px] rounded-full bg-[#FF0000]"
        ></div>
        <CommunityAlarm v-if="isNotiOpen" />
      </div>

      <!-- 프로필 -->
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[var(--element-background)] hover:bg-[var(--element-background-hover)] flex items-center justify-center ml-[12px]"
        @click="movePage('/profile')"
      >
        <User :size="24" :color="isDark ? '#f6f6f6' : '#363636'" />
      </div>
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
