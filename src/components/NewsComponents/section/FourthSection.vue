<script setup>
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
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
  <div class="flex flex-col">
    <!-- 뉴스 목록 -->
    <div class="w-[600px]" v-if="newsArr.length >= 2">
      <div class="flex flex-col gap-[15px]">
        <NewsComponent5 v-if="newsArr[0]" :news="newsArr[0]" />
        <NewsComponent5 v-if="newsArr[1]" :news="newsArr[1]" />
      </div>
    </div>
  </div>
</template>
