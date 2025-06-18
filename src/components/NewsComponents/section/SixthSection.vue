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
  <div class="w-full">
    <div class="flex gap-[30px]">
      <div class="flex flex-col gap-[15px]">
        <NewsComponent7 v-if="newsArr[0]" :news="newsArr[0]" />
        <NewsComponent7 v-if="newsArr[1]" :news="newsArr[1]" />
      </div>
      <div class="flex flex-col gap-[15px]">
        <NewsComponent7 v-if="newsArr[2]" :news="newsArr[2]" />
        <NewsComponent7 v-if="newsArr[3]" :news="newsArr[3]" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
