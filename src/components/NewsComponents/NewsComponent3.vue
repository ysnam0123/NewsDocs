<script setup>
import ScrapImg from './children/ScrapImg.vue'

const props = defineProps({
  news: Object,
  newsSaveHandler: Function,
  newsDetail: Function,
})
</script>
<template>
  <div v-if="props.news" class="w-[229px] h-[329px]">
    <div class="w-[229px] h-[228px] overflow-hidden rounded-3xl">
      <img
        :src="news.image_url"
        alt="news thumbnail"
        class="w-full h-full object-cover rounded-[20px]"
      />
    </div>
    <div>
      <div class="text-[15px] mt-3.5 mb-1 dark:text-[#7F7F7F]"># {{ props.news.keywords[0] }}</div>
      <div class="text-xl font-semibold break-words dark:text-white">
        {{ props.news.title }}
      </div>
    </div>
  </div>
  <ScrapImg class="absolute right-[15px] top-[10px]" />
</template>
<style scoped></style>
