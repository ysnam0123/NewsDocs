<script setup>
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'
import { ref } from 'vue'

const { news, onClickDetailView } = defineProps({
  news: Object,
  newsDetail: Function,
})

const count = ref(20)
</script>
<template>
  <div
    class="w-[786px] h-[468px] cursor-pointer"
    @click="onClickDetailView(onClickDetailView(news.news_id))"
  >
    <div
      class="relative bg-[linear-gradient(to_top,oklch(0.2_0.05_250/0.9),oklch(0.2_0.05_250/0.4)_90%),url('@/assets/img/son.jpeg')] bg-cover bg-center w-full h-full rounded-[20px]"
    >
      <div class="absolute w-[415px] bottom-0">
        <div class="relative text-center inline-block ml-8">
          <p class="inset-0 flex text-white text-xs mb-1.5">{{ news.keywords }}</p>
          <p class="text-white font-semibold text-2xl text-left w-[520px] break-words">
            {{ news.title }}
          </p>
        </div>
        <div class="flex ml-8 gap-3 text-white mt-5 mb-8">
          <div class="flex gap-1">
            <ThumbsUp class="w-4" />
            <span>{{ count }}</span>
          </div>
          <div class="flex gap-1">
            <Eye class="w-4" />
            <span>{{ count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
