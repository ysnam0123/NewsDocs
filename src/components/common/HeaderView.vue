<script setup>
import { useThemeStore } from '@/stores/useDarkmode'
import { useRoute, useRouter } from 'vue-router'
import CommunityAlarm from '../community/CommunityAlarm.vue'
import { ref } from 'vue'
import { useNotiStore } from '@/stores/useNotiStore'
import { Bell, User } from 'lucide-vue-next'
import DarkModeButton from './DarkModeButton.vue'
import dog from '../../assets/img/dog-trans.svg'
import { computed } from 'vue'
import DropBox from './DropBox.vue'

const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()
const isDark = computed(() => themeStore.isDark)
console.log('path:', route.path)
const isNotiOpen = ref(false)
const notiStore = useNotiStore()

const movePage = (path) => router.push(path)

const notiHandler = () => {
  isNotiOpen.value = !isNotiOpen.value
}
</script>
<template class="fixed top-0 left-0">
  <div
    class="md:max-w-[80%] sm:mx-auto flex items-center md:h-[100px] bg-[var(--bg-color)] backdrop-blur-[28px] sm:px-6 sm:py-4 sm:h-20 max-w h-[62px] mx-5"
  >
    <div class="flex items-center gap-[10px] cursor-pointer" @click="movePage('/')">
      <div
        class="sm:w-[46px] sm:h-[46px] w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#7B42DF]"
      >
        <img :src="dog" class="sm:w-[28px] sm:h-[26px] w-[19px] h-[17px]" />
      </div>
      <h1
        class="sm:text-[40px] mt-3 text-[21px] dark:text-white text-center font-extrabold luckiest-guy-regular"
      >
        newsDocs
      </h1>
    </div>
    <div class="ml-[56px] hidden sm:flex">
      <ul class="flex gap-[32px] select-none">
        <li
          :class="[
            'cursor-pointer flex py-[8px] duration-300 transition-all hover:text-[var(--nav-text-hover)] text-[18px]',
            route.path === '/' ? 'text-[#7A42DF] font-semibold' : 'text-[var(--nav-text)]',
          ]"
          @click="movePage('/')"
        >
          맞춤 소식
        </li>
        <li
          :class="[
            'cursor-pointer flex py-[8px] duration-300 transition-all hover:text-[var(--nav-text-hover)] text-[18px]',
            route.path === '/news' ? 'text-[#7A42DF] font-bold' : 'text-[var(--nav-text)]',
          ]"
          @click="movePage('/news')"
        >
          모든 소식
        </li>
        <li
          :class="[
            'cursor-pointer flex py-[8px] duration-300 transition-all hover:text-[var(--nav-text-hover)] text-[18px]',
            route.path === '/community' ? 'text-[#7A42DF] font-bold' : 'text-[var(--nav-text)]',
          ]"
          @click="movePage('/community')"
        >
          의견 나누기
        </li>
      </ul>
    </div>
    <div class="flex items-center sm:gap-[20px] ml-auto">
      <!-- 관심사 변경 -->
      <div class="cursor-pointer ml-[14px] sm:mr-[20px] mr-[10px]">
        <button
          class="cursor-pointer rounded-[8px] sm:w-[96px] text-[13px] text-[#7A42DF] dark:text-white sm:h-[42px] w-[84px] h-[30px] font-semibold bg-[var(--GP-button-bg)] sm:text-[var(--GP-button-text)] hover:bg-[var(--GP-button-hover)]"
          @click="movePage('/interest')"
        >
          관심사 수정
        </button>
      </div>

      <DarkModeButton />

      <div class="relative hidden sm:flex items-center sm:gap-5 justify-center">
        <!-- 알림 -->
        <div
          @click="notiHandler"
          class="relative w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[var(--element-background)] hover:bg-[var(--element-background-hover)] flex items-center justify-center ml-[12px] sm:ml-auto"
        >
          <Bell :size="24" :color="isDark ? '#f6f6f6' : '#363636'" class="relative" />
          <!-- 읽지 않은 알림이 있을 때 빨간 점 표시 -->
          <div
            v-if="notiStore.hasUnread === true"
            class="absolute top-[2px] right-[3px] w-[8px] h-[8px] rounded-full bg-[#FF0000]"
          ></div>
        </div>
        <!-- 프로필 -->
        <DropBox>
          <template #activator="{ toggle }">
            <div
              class="w-[40px] h-[40px] cursor-pointer rounded-full bg-[var(--element-background)] hover:bg-[var(--element-background-hover)] flex items-center justify-center ml-[12px] sm:ml-auto"
              @click="toggle"
            >
              <User :size="24" :color="isDark ? '#f6f6f6' : '#363636'" />
            </div>
          </template>
        </DropBox>
      </div>
      <!-- 알림 드롭다운/모달 -->
      <CommunityAlarm v-if="isNotiOpen" :close="() => (isNotiOpen = false)" />
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
