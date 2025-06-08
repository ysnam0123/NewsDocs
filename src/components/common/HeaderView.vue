<script setup>
import logo from '@/assets/img/logo_newsdocs.png'
import { useThemeStore } from '@/stores/useDarkmode'

const themeStore = useThemeStore()
</script>
<template>
  <div class="w-[1240px] mx-auto py-[0px] flex items-center h-[100px]">
    <div class="flex items-center gap-[10px] cursor-pointer">
      <img :src="logo" alt="logoImg" class="w-[202px] h-11.5" />
    </div>
    <div class="ml-[30px]">
      <ul class="flex gap-[7px] select-none">
        <li
          class="cursor-pointer w-[120px] px-[12px] py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
        >
          맞춤 소식
        </li>
        <li
          class="cursor-pointer w-[120px] px-[12px] py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
        >
          다른 소식
        </li>
        <li
          class="cursor-pointer w-[120px] px-[12px] py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
        >
          의견 나누기
        </li>
      </ul>
    </div>
    <div class="flex items-center gap-[10px] ml-auto">
      <div class="ml-[40px] relative">
        <input
          type="text"
          class="w-[300px] h-[40px] px-[10px] py-[5px] border-1 border-[#939393] rounded-xl"
          placeholder="키워드로 뉴스 검색"
        />
        <img
          src="../../assets/icons/searchIcon.svg"
          alt="searchIcon"
          class="absolute right-[10px] top-[8px] cursor-pointer"
        />
      </div>
      <div class="cursor-pointer">
        <img
          src="@/assets/icons/changeInterest.svg"
          alt="changeInterest"
          class="w-[96px] h-[41px]"
        />
      </div>
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[#F6F6F6] flex items-center justify-center"
      >
        <img
          src="@/assets/icons/toDarkMode.svg"
          @click="themeStore.toggleDark()"
          alt="modeToggle"
          class="w-[24px] h-[24px]"
        />
      </div>
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[#F6F6F6] flex items-center justify-center"
      >
        <img src="@/assets/icons/notification.svg" alt="notification" class="w-[24px] h-[24px]" />
      </div>
      <div
        class="w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[#F6F6F6] flex items-center justify-center"
      >
        <img src="@/assets/icons/profile.svg" alt="profile" class="w-[24px] h-[24px]" />
      </div>
    </div>
  </div>
</template>
