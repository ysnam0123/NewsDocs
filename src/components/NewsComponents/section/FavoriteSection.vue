<script setup>
// import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import NewsComponent9 from '@/components/NewsComponents/NewsComponent9.vue'
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
  <div class="mb-[60px]">
    <!-- <div class="flex gap-[40px] mb-[50px]"></div> -->
    <div class="flex gap-4 justify-between mb-8">
      <div class="flex-1">
        <NewsComponent8 v-if="newsArr[0]" :news="newsArr[0]" />
      </div>
      <div class="flex-1">
        <NewsComponent8 v-if="newsArr[1]" :news="newsArr[1]" />
      </div>
      <div class="flex-1">
        <NewsComponent8 v-if="newsArr[2]" :news="newsArr[2]" />
      </div>
    </div>
    <!-- <div class="flex flex-col gap-[24px]">
        <NewsComponent2 :news-save-handler="newsSaveHandler" v-if="newsArr[2]" :news="newsArr[2]" />
        <NewsComponent2 :news-save-handler="newsSaveHandler" v-if="newsArr[3]" :news="newsArr[3]" />
        <NewsComponent2 :news-save-handler="newsSaveHandler" v-if="newsArr[4]" :news="newsArr[4]" />
      </div> -->

    <div class="flex justify-between gap-4">
      <div class="flex-1">
        <NewsComponent9 v-if="newsArr[5]" :news="newsArr[5]" />
      </div>
      <div class="flex-1">
        <NewsComponent9 v-if="newsArr[7]" :news="newsArr[7]" />
      </div>
      <div class="flex-1">
        <NewsComponent9 v-if="newsArr[6]" :news="newsArr[6]" />
      </div>
      <div class="flex-1">
        <NewsComponent9 v-if="newsArr[8]" :news="newsArr[8]" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
