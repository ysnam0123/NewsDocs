<script setup>
import NewsComponent7 from '@/components/NewsComponents/NewsComponent7.vue'
import { useInterestStore } from '@/stores/interestStore'
import { computed, onMounted, ref } from 'vue'

const randomIndex = ref(0)
const interestStore = useInterestStore()
const interestList = computed(() => interestStore.interestList)

const props = defineProps({
  newsArr: {
    type: Array,
    required: true,
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
  <!-- 제목 -->
  <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
    <h1 class="flex gap-[10px] items-center">
      <img :src="interestList[5].icon" alt="interestList[5].label" />
      <p class="text-[30px] text-[var(--text-title)] font-bold">
        {{ interestList[5].label }}
      </p>
    </h1>
    <div class="flex">
      <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
    </div>
    <div class="ml-auto cursor-pointer">
      <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">더보기</h3>
    </div>
  </div>
  <div class="w-full">
    <div class="flex gap-[30px]">
      <div class="flex flex-col gap-[15px]">
        <NewsComponent7 v-if="newsArr[0]" :newsObj="newsArr[0]" />
        <NewsComponent7 v-if="newsArr[1]" :newsObj="newsArr[1]" />
      </div>
      <div class="flex flex-col gap-[15px]">
        <NewsComponent7 v-if="newsArr[2]" :newsObj="newsArr[2]" />
        <NewsComponent7 v-if="newsArr[3]" :newsObj="newsArr[3]" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
