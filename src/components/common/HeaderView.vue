<script setup>
import logo from '@/assets/img/logo_newsdocs.png'
import logoWhite from '@/assets/img/dark_logo.png'
import { useThemeStore } from '@/stores/useDarkmode'
import { useRouter } from 'vue-router'
import lightIcon from '@/assets/icons/toLightMode.svg'
import darkIcon from '@/assets/icons/toDarkMode.svg'
import notification from '@/assets/icons/notification.svg'
import notificationWhite from '@/assets/icons/notification-white.svg'
import profile from '@/assets/icons/profile.svg'
import profileWhite from '@/assets/icons/profile-white.svg'

const themeStore = useThemeStore()
const route = useRouter()

const movePage = (path) => {
  route.push(path)
}

const changeInterest = () => {
  route.push('/interest')
}

const gotohome = () => {
  route.push('/myinterest')
}

const seeNews = () => {
  route.push('/news')
}
</script>
<template>
  <div
    class="max-w-[80%] mx-auto py-4 flex items-center md:h-[100px] h-[80px] bg-[var(--bg-color)] backdrop-blur-[28px]"
  >
    <div class="flex items-center gap-[10px] cursor-pointer">
      <img
        :src="themeStore.isDark ? logoWhite : logo"
        alt="logoImg"
        class="w-[202px] h-11.5"
        @click="gotohome"
      />
    </div>
    <div class="ml-[56px]">
      <ul class="flex gap-[32px] select-none">
        <li
          class="text-[var(--nav-text)] cursor-pointer flex py-[8px] ease-in duration-75 hover:text-[var(--nav-text-hover)] hover:font-bold text-[18px]"
          @click="movePage('/myinterest')"
        >
          맞춤 소식
        </li>
        <li
          class="text-[var(--nav-text)] cursor-pointer flex py-[8px] ease-in duration-75 hover:text-[var(--nav-text-hover)] hover:font-bold text-[18px]"
          @click="seeNews"
        >
          다른 소식
        </li>
        <li
          class="text-[var(--nav-text)] cursor-pointer flex py-[8px] ease-in duration-75 hover:text-[var(--nav-text-hover)] hover:font-bold text-[18px]"
          @click="movePage('/community')"
        >
          의견 나누기
        </li>
      </ul>
    </div>
    <div class="flex items-center gap-[10px] ml-auto">
      <!-- 검색창 -->
      <div class="ml-[40px] relative">
        <input
          type="text"
          class="w-[280px] h-[40px] px-[10px] py-[5px] border border-[var(--input-border)] rounded-[8px] placeholder:text-[#e0e0e0]"
          placeholder="키워드로 뉴스를 검색해보세요"
        />
        <img
          src="../../assets/icons/searchIcon.svg"
          alt="searchIcon"
          class="absolute right-[10px] top-[8px] cursor-pointer"
        />
      </div>
      <!-- 관심사 변경 -->
      <div class="cursor-pointer ml-[14px]">
        <button
          class="cursor-pointer rounded-[8px] w-[96px] h-[41px] font-semibold bg-[var(--GP-button-bg)] text-[var(--GP-button-text)] hover:bg-[var(--GP-button-hover)]"
          @click="changeInterest"
        >
          관심사 수정
        </button>
      </div>

      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[var(--element-background)] hover:bg-[var(--element-background-hover)] flex items-center justify-center ml-[14px]"
      >
        <img
          :src="themeStore.isDark ? lightIcon : darkIcon"
          @click="themeStore.toggleDark()"
          alt="modeToggle"
          class="w-[24px] h-[24px]"
        />
      </div>

      <!-- 알림 -->
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[var(--element-background)] hover:bg-[var(--element-background-hover)] flex items-center justify-center ml-[12px]"
      >
        <img
          :src="themeStore.isDark ? notificationWhite : notification"
          alt="notification"
          class="w-[22px] h-[22px]"
        />
      </div>

      <!-- 프로필 -->
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[var(--element-background)] hover:bg-[var(--element-background-hover)] flex items-center justify-center ml-[12px]"
      >
        <img
          :src="themeStore.isDark ? profileWhite : profile"
          alt="profile"
          class="w-[24px] h-[24px]"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
