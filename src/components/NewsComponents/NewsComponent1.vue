<script setup>
import { useNewsStore } from '@/stores/newsStore'
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  news: Object,
})
const router = useRouter()
const isOpen = ref(false)
const newsStore = useNewsStore()

const cardToggle = () => {
  isOpen.value = !isOpen.value
}

const toDetailHandler = () => {
  newsStore.selectedNews = props.news
  router.push(`/news/detail/${props.news.article_id}`)
}
</script>
<template>
  <section v-if="props.news" class="relative w-[786px] h-[468px]" @click="cardToggle">
    <div>
      <div
        v-if="isOpen"
        class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 rounded-[20px] z-20"
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-col text-white font-semibold absolute top-10 left-10 gap-6">
            <span class="text-xl font-semibold">세 줄 요약</span>
            <div class="flex flex-col gap-5 text-lg">
              <span>1. </span>
              <span>2. </span>
              <span>3. </span>
            </div>
          </div>
          <button
            @click.stop="toDetailHandler"
            class="absolute bottom-5 right-4 bg-white px-3 py-1.5 rounded-xl cursor-pointer"
          >
            원문보기
          </button>
        </div>
      </div>
    </div>
    <div class="relative w-full h-full rounded-[20px] overflow-hidden">
      <img :src="props.news.image_url" alt="news thumbnail" class="w-full object-cover" />
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.6) 20%,
            rgba(0, 0, 0, 0.3) 40%,
            transparent 50%
          );
        "
      ></div>

      <div class="absolute w-[400px] bottom-0">
        <div class="relative text-center inline-block ml-8">
          <p class="inset-0 flex text-white text-xs mb-1.5">{{ props.news.keywords }}</p>
          <p class="text-white font-semibold text-2xl text-left w-[520px] break-words">
            {{ props.news.title }}
          </p>
        </div>
        <div class="flex ml-8 gap-3 text-white mt-5 mb-8">
          <div class="flex gap-1">
            <ThumbsUp class="w-4" />
            <span>23</span>
          </div>
          <div class="flex gap-1">
            <Eye class="w-4" />
            <span>300</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
