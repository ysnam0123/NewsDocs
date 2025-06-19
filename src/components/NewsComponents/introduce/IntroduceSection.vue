<script setup>
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'
import { computed, onMounted, ref } from 'vue'

const randomIndex = ref(0)

const props = defineProps({
  newsArr: {
    type: Array,
  },
  loading: {
    type: Boolean,
  },
})

// 안전하게 newsArr 변수 생성
const newsArr = computed(() => props.newsArr || [])

onMounted(async () => {
  if (newsArr.value.length > 0) {
    randomIndex.value = Math.floor(Math.random() * props.newsArr.length)
  }
})
</script>

<template>
  <div class="h-[480px]">
    <div class="flex gap-[24px] overflow-x-scroll">
      <SlideNewsComponent :news="newsArr[0]" />
      <SlideNewsComponent :news="newsArr[1]" />
      <SlideNewsComponent :news="newsArr[2]" />
      <SlideNewsComponent :news="newsArr[3]" />
    </div>
  </div>
</template>
<style scoped></style>
