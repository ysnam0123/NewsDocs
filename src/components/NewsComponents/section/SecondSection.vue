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
  <div class="h-[460px]">
    <div class="flex gap-[24px] overflow-x-scroll">
      <div class="flex-1">
        <SlideNewsComponent v-if="newsArr[0]" :news="newsArr[0]" />
      </div>
      <div class="flex-1">
        <SlideNewsComponent v-if="newsArr[1]" :news="newsArr[1]" />
      </div>
      <div class="flex-1">
        <SlideNewsComponent v-if="newsArr[2]" :news="newsArr[2]" />
      </div>
      <div class="flex-1">
        <SlideNewsComponent v-if="newsArr[3]" :news="newsArr[3]" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
