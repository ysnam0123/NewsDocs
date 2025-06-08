<script setup>
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'

import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

const goBack = () => {
  router.back()
}

const activeTab = ref('전체')

const tabs = ['전체', '정치/경제', '연예/스포츠', '사회/문화', '해외/기타']
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-[735px] mx-auto mt-10">
      <button
        class="flex w-10 h-10 rounded-[50px] bg-[#F6F6F6] items-center justify-center mb-4 cursor-pointer hover:bg-[#EDEDED]"
        @click="goBack"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="18"
            height="18"
            fill="white"
            fill-opacity="0.01"
            style="mix-blend-mode: multiply"
          />
          <path
            d="M5.625 9L11.25 3.375L12.0375 4.1625L7.2 9L12.0375 13.8375L11.25 14.625L5.625 9Z"
            fill="#161616"
          />
        </svg>
      </button>
      <div class="text-[28px] font-bold">내가 저장한 뉴스</div>
      <div class="relative">
        <div
          class="flex border-[#9A9A9A] border-b-[0.5px] h-[72px] items-center text-center space-x-4 mb-5 relative"
        >
          <div
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="flex items-center justify-center w-[103px] h-full text-base cursor-pointer relative transition-all duration-300 hover:text-[#7537E3]"
            :class="{
              'text-[#7537E3] font-semibold': activeTab === tab,
              'text-[#969696]': activeTab !== tab,
            }"
          >
            {{ tab }}
          </div>

          <div
            class="absolute bottom-[-1px] h-[2px] bg-[#7537E3] transition-all duration-300"
            :style="{
              left: `${tabs.indexOf(activeTab) * 119}px`,
              width: '103px',
            }"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
