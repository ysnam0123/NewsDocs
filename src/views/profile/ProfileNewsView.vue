<script setup>
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import { ChevronLeft } from 'lucide-vue-next'
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
      <div class="flex space-x-2.5 mb-4">
        <button
          class="flex w-10 h-10 rounded-[50px] bg-[#F6F6F6] items-center justify-center cursor-pointer hover:bg-[#EDEDED] dark:bg-[#363636] dark:text-white dark:hover:bg-[#8F8F8F]"
          @click="goBack"
        >
          <ChevronLeft />
        </button>
        <div class="flex items-center justify-center text-base text-[#191919] dark:text-white">
          돌아가기
        </div>
      </div>
      <div class="text-[28px] font-bold dark:text-white mb-8">내가 저장한 뉴스</div>
      <div class="relative">
        <div
          class="flex border-[#9A9A9A] border-b-[0.5px] h-[52px] items-center text-center space-x-4 mb-5 relative"
        >
          <div
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="flex items-center justify-center w-[103px] h-full text-base cursor-pointer relative transition-all duration-300 dark:hover:text-[#A878FD] hover:text-[#7537E3]"
            :class="{
              'text-[#7537E3] dark:text-[#A878FD] font-semibold': activeTab === tab,
              'text-[#9D9D9D] dark:text-[#8F8F8F]': activeTab !== tab,
            }"
          >
            {{ tab }}
          </div>

          <div
            class="absolute bottom-[-1px] h-[2px] bg-[#7537E3] dark:bg-[#A878FD] transition-all duration-300"
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
