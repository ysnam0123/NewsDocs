<script setup>
import SlideNewsComponent from '@/components/NewsComponents/SlideNewsComponent.vue'
import { useInterestStore } from '@/stores/interestStore'
import { computed, onMounted, ref } from 'vue'

const randomIndex = ref(0)
const interestStore = useInterestStore()
const interestList = computed(() => interestStore.interestList)

const props = defineProps({
  newsArr: {
    type: Array,
  },
  loading: {
    type: Boolean,
  },
  newsSaveHandler: Function,
  newsDetail: Function,
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
  <div class="h-[524px]">
    <!-- 제목 -->
    <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
      <h1 class="flex gap-[10px] items-center">
        <img :src="interestList[1].icon" alt="sports" />
        <p class="text-[30px] text-[var(--text-title)] font-bold">{{ interestList[1].label }}</p>
      </h1>
      <div class="flex">
        <h2 class="text-[var(--text-sub-purple)] text-[16px]">내가 가장 관심있는</h2>
      </div>
      <div class="ml-auto cursor-pointer">
        <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
          더보기
        </h3>
      </div>
    </div>
    <div class="flex gap-[24px] overflow-x-scroll">
      <!-- 슬라이드 아직 구현 안함 -->
      <SlideNewsComponent
        :news-save-handler="newsSaveHandler"
        v-if="newsArr[0]"
        :news="newsArr[0]"
      />
      <SlideNewsComponent
        :news-save-handler="newsSaveHandler"
        v-if="newsArr[1]"
        :news="newsArr[1]"
      />
      <SlideNewsComponent
        :news-save-handler="newsSaveHandler"
        v-if="newsArr[2]"
        :news="newsArr[2]"
      />
      <SlideNewsComponent
        :news-save-handler="newsSaveHandler"
        v-if="newsArr[3]"
        :news="newsArr[3]"
      />
    </div>
  </div>
</template>
<style scoped></style>
