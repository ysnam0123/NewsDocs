<script setup>
import { ThumbsUp } from 'lucide-vue-next'
import defaultImg from '@/assets/img/profileDog.svg'

const props = defineProps({
  post: Object,
})

const cateGroupMap = {
  0: '전체',
  1: '정치',
  2: '스포츠',
  3: '연예',
  4: '문화',
  5: '해외',
  6: '사회',
  7: '경제',
}
</script>
<template>
  <div
    class="flex flex-col w-[358px] h-[243px] rounded-[16px] px-[24px] py-[24px] bg-[var(--bg-color)] border border-[var(--section-community-border)]"
  >
    <div v-if="props.post?.profiles" class="flex mb-[20px]">
      <div class="flex items-center gap-[10px]">
        <img
          :src="props.post.profiles?.profile_img || defaultImg"
          alt="userImg"
          class="w-[40px] h-[40px] rounded-full"
        />
        <p class="text-[var(--text-title)] text-[16px] font-semibold">
          {{ props.post?.profiles.nickname }}
        </p>
      </div>
      <p class="text-[#7537E3] dark:text-[#A878FD] text-[16px] ml-auto">
        #{{ cateGroupMap[props.post?.category_id] || '기타' }}
      </p>
    </div>
    <div class="text-[var(--text-title)] text-[16px] max-w-[310px] max-h-[107] mb-[9px] truncate">
      {{ props.post?.contents }}
    </div>
    <div class="flex gap-[8px] mt-auto">
      <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
        <ThumbsUp />
        <p class="mt-[4px] text-[12px]">{{ props.post?.like_count ?? 0 }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
