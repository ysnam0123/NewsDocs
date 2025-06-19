<script setup>
import BookmarkLine from '@/assets/icons/scrap-none.svg'
import BookmarkHover from '@/assets/icons/scrap-hover.svg'
import BookmarkFilled from '@/assets/icons/scraped.svg'
import { onMounted, ref } from 'vue'
import supabase from '@/utils/supabase'
import { useToast } from 'vue-toastification'
const toast = useToast()
const isBookmarked = ref(false)
const userId = ref(null)
const hovered = ref(false)

const props = defineProps({
  newsId: { type: String, required: true },
  showBg: { type: Boolean, default: true },
})

const toggleBookmark = async () => {
  console.log(props.newsId)
  if (!userId.value) {
    toast('로그인이 필요합니다.')
    return
  }
  //북마크 해제
  if (isBookmarked.value) {
    const { error } = await supabase
      .from('user_scraps')
      .delete()
      .eq('user_id', userId.value)
      .eq('news_id', props.newsId)
    if (!error) isBookmarked.value = false
    console.log('삭제됨')
  } else {
    // 북마크 추가
    const { error } = await supabase
      .from('user_scraps')
      .insert([{ user_id: userId.value, news_id: props.newsId }])
    if (!error) isBookmarked.value = true
    console.log('저장됨')
  }
}

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  userId.value = user.id

  const { data } = await supabase
    .from('user_scraps')
    .select('news_id')
    .eq('user_id', userId.value)
    .eq('news_id', props.newsId)
    .maybeSingle()

  isBookmarked.value = !!data
})
</script>

<template>
  <button
    class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
    :class="{
      'bg-white/80': props.showBg,
      'bg-transparent': !props.showBg,
    }"
    @click.stop="toggleBookmark"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      v-if="!isBookmarked"
      :src="hovered ? BookmarkHover : BookmarkLine"
      class="object-contain"
      alt="북마크"
    />
    <img v-else :src="BookmarkFilled" class="object-contain" />
  </button>
</template>

<style scoped></style>
