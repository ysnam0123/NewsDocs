<script setup>
import { MessageSquare, ThumbsUp } from 'lucide-vue-next'
import defaultImg from '@/assets/img/profileDog.svg'
import { watch } from 'vue'

const { post, interestData } = defineProps({
  post: Object,
  interestData: {
    type: Array,
    required: true,
  },
})

const cateGroupMap = {
  1: '정치',
  2: '경제',
  3: '사회',
  4: '문화',
  5: '스포츠',
  6: '연예',
  7: '해외',
  8: '기타',
}

console.log('post props', post)
console.log('interdjWjrn', interestData)

watch(
  () => post,
  (val) => {
    console.log('post는?????', val)
  },
  { immediate: true },
)
console.log('post props', post)
</script>
<template>
  <div
    class="flex flex-col w-[358px] h-[243px] rounded-[16px] px-[24px] py-[24px] bg-[var(--bg-color)] border-1 border-[#E3E3E3] dark:border-[#343434]"
  >
    <div v-if="post" class="flex mb-[20px]">
      <div class="flex items-center gap-[10px]">
        <img
          :src="post.profiles?.profile_img || defaultImg"
          alt="userImg"
          class="w-[40px] h-[40px] rounded-full"
        />
        <p class="text-[var(--text-title)] text-[16px] font-semibold">
          {{ post?.profiles?.nickname }}
        </p>
      </div>
      <p class="text-[#7537E3] dark:text-[#A878FD] text-[16px] ml-auto">
        #{{ cateGroupMap[post?.category_id] }}
      </p>
    </div>
    <div class="text-[var(--text-title)] text-[16px] max-w-[310px] max-h-[107] mb-[9px] truncate">
      {{ post?.title }}
    </div>
    <div class="flex mt-auto gap-1">
      <div class="flex items-center justify-center text-[13px] text-[#B7B7B7]">
        <ThumbsUp class="w-5 mr-1.5 dark:text-[#7A7A7A]" />
        <p class="text-[14px] mr-3 mt-0.5 dark:text-[#7A7A7A]">{{ post?.like_count ?? 0 }}</p>
        <MessageSquare class="w-5 mt-0.5 mr-1.5 dark:text-[#7A7A7A]" />
        <p class="text-[14px] mt-0.5 dark:text-[#7A7A7A]">{{ post?.comments.length ?? 0 }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
