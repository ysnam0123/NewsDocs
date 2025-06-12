<script setup>
import { useSummaryStore } from '@/stores/summaryNews'
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'
import { computed, onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/utils/supabase'
import { fetchOpenAi } from '@/api/fetchOpenAi'
import { useNewsStore } from '@/stores/newsStore'
import Typed from 'typed.js'

const props = defineProps({
  news: Object,
  newsSaveHandler: Function,
  newsDetail: Function,
})

const router = useRouter()
const isOpen = ref(false)
const summaryStore = useSummaryStore()
const newsStore = useNewsStore()
const isLoading = ref(true)
const isNewsLoading = computed(() => !props.news?.image_url)
const typedTarget = ref(null)
let typedInstance = null

const handleClick = async () => {
  if (newsStore.selectedNews?.article_id !== props.news.article_id) {
    await props.newsSaveHandler(props.news)
  }
  if (!props.news.description) return
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    if (!summaryStore.summaryNews) {
      await summarizeHandler()
    } else {
      await runTyped(summaryStore.summaryNews)
    }
  }
}

const runTyped = async (text) => {
  await nextTick()

  if (typedTarget.value) {
    if (typedInstance) {
      typedInstance.destroy()
    }
    typedTarget.value.innerText = ''
    new Typed(typedTarget.value, {
      strings: [text],
      typeSpeed: 20,
      showCursor: false,
    })
  } else {
    console.warn('value is null')
  }
}

const summarizeHandler = async () => {
  try {
    if (!props.news.description) return

    const { data: savedSummary } = await supabase
      .from('summaries')
      .select('summaries_contents')
      .eq('news_id', props.news.article_id)
      .maybeSingle()

    if (savedSummary && savedSummary.summaries_contents) {
      summaryStore.summaryNews = savedSummary.summaries_contents
      await runTyped(savedSummary.summaries_contents)
      return
    }
    const result = await fetchOpenAi(props.news.description)
    summaryStore.summaryNews = result
    await runTyped(result)
    const { error } = await supabase
      .from('summaries')
      .insert([{ news_id: props.news.article_id, summaries_contents: result }])
      .select()

    if (error) {
      console.error('요약 저장 실패', error)
      const { error } = await supabase
        .from('summaries')
        .select('*')
        .eq('news_id', props.news.article_id)
    }
  } catch (err) {
    console.error('요약 중 요류', err)
  } finally {
    isLoading.value = false
  }
}

const toDetailHandler = () => {
  router.push(`/news/detail/${props.news.article_id}`)
}
onMounted(() => {
  if (props.news) {
    isLoading.value = false
  }
})
</script>
<template>
  <div class="flex gap-4">
    <section
      v-if="isNewsLoading"
      class="flex flex-shrink-0 w-[786px] h-[468px] bg-gray-400 animate-pulse rounded-[20px]"
    ></section>
    <section
      @click="handleClick"
      class="relative w-[786px] h-[468px] group rounded-[20px] overflow-hidden cursor-pointer"
    >
      <template v-if="props.news">
        <div
          v-if="!isOpen"
          class="absolute inset-0 bg-transparent hover:bg-black/30 z-10 flex items-center justify-center"
        >
          <span class="absolute hidden group-hover:flex text-white px-3 py-1.5 rounded-xl"
            >요약보기</span
          >
        </div>

        <div v-else>
          <div
            class="absolute inset-0 bg-black/70 hover:bg-black/80 flex flex-col items-center justify-center gap-4 rounded-[20px] z-20 backdrop-blur-lg"
          >
            <div v-if="summaryStore.summaryNews" class="flex flex-col">
              <div class="flex flex-col text-white absolute top-10 left-10 gap-4">
                <h2 class="text-xl mb-6 text-white font-semibold">세 줄 요약</h2>

                <div class="flex flex-col">
                  <div class="flex flex-col whitespace-pre-line text-xl mr-16 leading-8">
                    <span ref="typedTarget" class="text-white"></span>
                  </div>
                </div>
              </div>
              <button
                @click.stop="toDetailHandler"
                class="absolute bottom-5 right-4 bg-white px-3 py-1.5 rounded-xl cursor-pointer"
              >
                원문보기
              </button>
            </div>
          </div>
        </div>
        <div class="relative w-full h-full rounded-[20px] overflow-hidden">
          <img
            :src="props.news.image_url"
            alt="news thumbnail"
            class="w-full h-full object-cover rounded-[20px]"
          />
          <div
            class="absolute inset-0"
            style="
              background: linear-gradient(
                to top,
                rgba(0, 0, 0, 0.6) 20%,
                rgba(0, 0, 0, 0.3) 40%,
                transparent 50%
              );
            "
          ></div>

          <div class="absolute w-[400px] bottom-0">
            <div class="relative text-center inline-block ml-8">
              <p class="inset-0 flex text-white text-xs mb-1.5">{{ props.news.source_name }}</p>
              <p class="text-white font-semibold text-2xl text-left w-[520px] break-words">
                {{ props.news.title }}
              </p>
            </div>
            <div class="flex ml-8 gap-3 text-white mt-5 mb-8">
              <div class="flex gap-1">
                <ThumbsUp class="w-4" />
                <span>23</span>
              </div>
              <div class="flex gap-1">
                <Eye class="w-4" />
                <span>300</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>
<style scoped></style>
