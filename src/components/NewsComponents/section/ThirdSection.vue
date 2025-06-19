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
    <div class="sm:block hidden sm:w-[608px]">
      <div class="flex flex-wrap gap-[24px] sm:mt-12 mt-7 sm:h-[792px]">
        <NewsComponent10 v-if="newsArr[0]" :news="newsArr[0]" />
        <NewsComponent10 v-if="newsArr[1]" :news="newsArr[1]" />
        <NewsComponent10 v-if="newsArr[2]" :news="newsArr[2]" />
        <NewsComponent10 v-if="newsArr[3]" :news="newsArr[3]" />
      </div>
    </div>
    <div class="block sm:hidden mb-7">
      <div class="flex flex-col gap-4 px-2 mb-5">
        <div class="flex gap-2">
          <NewsComponent10 v-if="newsArr[0]" :news="newsArr[0]" />
          <NewsComponent10 v-if="newsArr[1]" :news="newsArr[1]" />
        </div>
        <div class="flex gap-2 mb-4">
          <NewsComponent10 v-if="newsArr[2]" :news="newsArr[2]" />
          <NewsComponent10 v-if="newsArr[3]" :news="newsArr[3]" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
