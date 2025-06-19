<script setup>
import firstIcon from '@/assets/icons/mobile/1.svg'
import secondIcon from '@/assets/icons/mobile/2.svg'
import thirdIcon from '@/assets/icons/mobile/3.svg'
import fourthIcon from '@/assets/icons/mobile/4.svg'
import fifthIcon from '@/assets/icons/mobile/5.svg'

import activeFirstIcon from '@/assets/icons/mobile/active1.svg'
import activeSecondIcon from '@/assets/icons/mobile/active2.svg'
import activeThirdIcon from '@/assets/icons/mobile/active3.svg'
import activeFifthIcon from '@/assets/icons/mobile/active5.svg'

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const movePage = (path) => router.push(path)
const isActive = (path) => route.path === path
</script>
<template>
  <div class="fixed bottom-0 w-full h-[72px] sm:hidden bg-[var(--bg-color)] z-50">
    <ul class="flex w-full h-full">
      <li class="flex-1 flex flex-col items-center justify-center" @click="movePage('/')">
        <img :src="isActive('/') ? activeFirstIcon : firstIcon" alt="home" class="w-6 h-6 mb-1" />
        <span
          :class="
            isActive('/')
              ? 'text-[var(--mobile-active-text: #191919;)]'
              : 'text-[var(--mobile-text)]'
          "
          class="text-xs"
          >맞춤소식</span
        >
      </li>

      <li class="flex-1 flex flex-col items-center justify-center" @click="movePage('/news')">
        <img
          :src="isActive('/news') ? activeSecondIcon : secondIcon"
          alt="search"
          class="w-6 h-6 mb-1"
        />
        <span
          :class="
            isActive('/news')
              ? 'text-[var(--mobile-active-text: #191919;)]'
              : 'text-[var(--mobile-text)]'
          "
          class="text-xs"
          >모든소식</span
        >
      </li>

      <li class="flex-1 flex flex-col items-center justify-center" @click="movePage('/community')">
        <img
          :src="isActive('/community') ? activeThirdIcon : thirdIcon"
          alt="write"
          class="w-6 h-6 mb-1"
        />
        <span
          :class="
            isActive('/community')
              ? 'text-[var(--mobile-active-text: #191919;)]'
              : 'text-[var(--mobile-text)]'
          "
          class="text-xs"
          >의견 나누기</span
        >
      </li>

      <li class="flex-1 flex flex-col items-center justify-center">
        <img :src="fourthIcon" alt="bookmark" class="w-6 h-6 mb-1" />
        <span class="text-xs text-[var(--mobile-text)]">알림</span>
      </li>

      <li class="flex-1 flex flex-col items-center justify-center" @click="movePage('/profile')">
        <img
          :src="isActive('/profile') ? activeFifthIcon : fifthIcon"
          alt="mypage"
          class="w-6 h-6 mb-1"
        />
        <span
          :class="
            isActive('/profile')
              ? 'text-[var(--mobile-active-text: #191919;)]'
              : 'text-[var(--mobile-text)]'
          "
          class="text-xs"
          >내정보</span
        >
      </li>
    </ul>
  </div>
</template>
