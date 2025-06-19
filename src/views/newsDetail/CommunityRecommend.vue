<script setup>
import supabase from '@/utils/supabase'
import { ThumbsUp, MessageSquare } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import sleepDog from '@/components/icon/sleepDog.vue'

const props = defineProps({
  categoryId: Number,
  categoryLabel: String,
})
const router = useRouter()
const posts = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('category_id', props.categoryId)

  if (!error) {
    posts.value = data
  } else {
    console.log('카테고리 id', props.categoryId)
    console.error('추천 게시글 불러오기 실패', error)
  }
})

const moreViewHandler = (post) => {
  router.push(`/community/${post.categoryId}`)
}
</script>
<template>
  <div>
    <div class="flex my-10 justify-between">
      <h2 class="text-xl font-semibold justify-between dark:text-white">
        <span class="text-[#7537E3] dark:text-[#A878FD]">{{ props.categoryLabel }} </span>에 대한
        다른 유저의 생각
      </h2>
      <button
        class="text-sm cursor-pointer mt-0.5 underline underline-offset-2 dark:text-[#AEAEAE]"
        @click="moreViewHandler"
      >
        더보기
      </button>
    </div>
    <div v-if="posts.length > 0">
      <div
        v-for="post in posts"
        :key="post.id"
        class="border-1 border-gray-200 dark:border-[#282828] rounded-2xl pt-5 mb-4 hover:bg-[#F6F6F6] dark:hover:bg-[#222222] transition duration-300"
      >
        <div class="sm:h-26">
          <div class="block mt-1 ml-4">
            <p class="text-lg text-gray-800 dark:text-white text-left font-semibold">
              {{ post.title }}
            </p>
            <div class="flex justify-between">
              <span class="mt-5 text-left text-sm justify-between dark:text-white">
                {{ post.contents }}
              </span>
              <div class="flex justify-center items-center gap-3 mr-5">
                <ThumbsUp class="text-[#B7B7B7] w-4" />
                <MessageSquare class="text-[#B7B7B7] w-4" /><span>{{
                  post.comments.length || 0
                }}</span>
              </div>
            </div>
          </div>
          <hr class="text-gray-300 mt-4 dark:text-[#282828]" />
        </div>
      </div>
    </div>
    <div v-else class="mb-20">
      <div class="flex flex-col items-center justify-center">
        <sleepDog />
        <span class="mt-5">추천할 게시글이 없습니다.</span>
      </div>
    </div>
  </div>
</template>
