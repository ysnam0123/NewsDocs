<script setup>
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import NewsComponent9 from '@/components/NewsComponents/NewsComponent9.vue'
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
  <!-- 제목 -->
  <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
    <h1 class="flex gap-[10px] items-center">
      <img :src="interestList[0].icon" alt="sports" />
      <p class="text-[30px] text-[var(--text-title)] font-bold">{{ interestList[0].label }}</p>
    </h1>
    <div class="flex">
      <h2 class="text-[var(--text-sub-purple)] text-[16px]">내가 가장 관심있는</h2>
    </div>
    <div class="ml-auto cursor-pointer">
      <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">더보기</h3>
    </div>
  </div>

  <div class="mb-[44px]">
    <div class="flex gap-[40px] mb-[50px]">
      <div class="flex gap-[20px]">
        <NewsComponent8 v-if="newsArr[0]" :newsObj="newsArr[0]" />
        <NewsComponent8 v-if="newsArr[1]" :newsObj="newsArr[1]" />
      </div>
      <div class="flex flex-col gap-[24px]">
        <NewsComponent2 v-if="newsArr[2]" :newsObj="newsArr[2]" />
        <NewsComponent2 v-if="newsArr[3]" :newsObj="newsArr[3]" />
        <NewsComponent2 v-if="newsArr[4]" :newsObj="newsArr[4]" />
      </div>
    </div>

    <div class="flex justify-between">
      <NewsComponent9 v-if="newsArr[5]" :newsObj="newsArr[5]" />
      <NewsComponent9 v-if="newsArr[6]" :newsObj="newsArr[6]" />
      <NewsComponent9 v-if="newsArr[7]" :newsObj="newsArr[7]" />
      <NewsComponent9 v-if="newsArr[8]" :newsObj="newsArr[8]" />
    </div>
  </div>
</template>
<style scoped></style>
