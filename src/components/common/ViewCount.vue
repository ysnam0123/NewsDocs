<script setup>
import { Eye } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import supabase from '@/utils/supabase'

const props = defineProps({
  newsId: Number,
})
const viewCount = ref(null)

const fetchViewCount = async (id) => {
  const { data, error } = await supabase
    .from('news')
    .select('view_count')
    .eq('news_id', id)
    .maybeSingle()

  if (error) {
    console.error('조회수 조회 실패:', error)
    return
  }

  viewCount.value = data?.view_count ?? 0
}

onMounted(async () => {
  await fetchViewCount(props.newsId)
  console.log('마운트 후 newsId:', props.newsId)
})
</script>

<template>
  <div class="flex items-center gap-1">
    <Eye class="w-4 h-4" />
    <span>{{ viewCount.value }}</span>
  </div>
</template>
