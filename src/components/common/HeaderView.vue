<script setup>
import logo from '@/assets/img/logo_newsdocs.png'
import { useThemeStore } from '@/stores/useDarkmode'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()

const route = useRouter()
const movePage = (path) => {
  route.push(path)
}
</script>
<template>
  <div class="w-[1240px] mx-auto py-[0px] flex items-center h-[100px]">
    <div class="flex items-center gap-[10px] cursor-pointer">
      <img :src="logo" alt="logoImg" class="w-[202px] h-11.5" />
    </div>
    <div class="ml-[56px]">
      <ul class="flex gap-[32px] select-none">
        <li
          class="cursor-pointer flex py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
          @click="movePage('/myinterest')"
        >
          맞춤 소식
        </li>
        <li
          class="cursor-pointer flex py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
        >
          다른 소식
        </li>
        <li
          class="cursor-pointer flex py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
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
          class="w-[280px] h-[40px] px-[10px] py-[5px] border-1 border-[#939393] rounded-[8px]"
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
        <img
          src="@/assets/icons/changeInterest.svg"
          alt="changeInterest"
          class="w-[96px] h-[41px]"
        />
      </div>
      <!-- 다크모드  -->
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[#F6F6F6] flex items-center justify-center ml-[14px]"
      >
        <img
          src="@/assets/icons/toDarkMode.svg"
          @click="themeStore.toggleDark()"
          alt="modeToggle"
          class="w-[24px] h-[24px]"
        />
      </div>

      <!-- 알림 -->
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[#F6F6F6] flex items-center justify-center ml-[12px]"
      >
        <img src="@/assets/icons/notification.svg" alt="notification" class="w-[24px] h-[24px]" />
      </div>

      <!-- 프로필 -->
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[#F6F6F6] flex items-center justify-center ml-[12px]"
      >
        <img src="@/assets/icons/profile.svg" alt="profile" class="w-[24px] h-[24px]" />
      </div>
    </div>
  </div>
</template>
