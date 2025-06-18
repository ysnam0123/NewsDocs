<script setup>
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
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
  <div>
    <div class="w-[608px]">
      <div class="flex flex-wrap gap-[24px] mt-12 h-[792px]">
        <NewsComponent10 v-if="newsArr[0]" :news="newsArr[0]" />
        <NewsComponent10 v-if="newsArr[1]" :news="newsArr[1]" />
        <NewsComponent10 v-if="newsArr[2]" :news="newsArr[2]" />
        <NewsComponent10 v-if="newsArr[3]" :news="newsArr[3]" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
