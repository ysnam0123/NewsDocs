<script setup>
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import { computed, onMounted, ref } from 'vue'
import NewsComponent9 from '../NewsComponent9.vue'

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
    <div class="sm:block hidden w-[600px]" v-if="newsArr.length >= 2">
      <div class="flex flex-col gap-[15px]">
        <NewsComponent5 v-if="newsArr[4]" :news="newsArr[4]" />
        <NewsComponent5 v-if="newsArr[5]" :news="newsArr[5]" />
      </div>
    </div>
    <div class="block sm:hidden">
      <div class="flex flex-col gap-4 px-4 mb-14 max-w-[600px] mx-auto">
        <div class="">
          <NewsComponent9 v-if="newsArr[6]" :news="newsArr[6]" />
        </div>
        <div class="">
          <NewsComponent9 v-if="newsArr[7]" :news="newsArr[7]" />
        </div>
        <div class="">
          <NewsComponent9 v-if="newsArr[8]" :news="newsArr[8]" />
        </div>
        <div class="">
          <NewsComponent9 v-if="newsArr[9]" :news="newsArr[9]" />
        </div>
      </div>
    </div>
  </div>
</template>
