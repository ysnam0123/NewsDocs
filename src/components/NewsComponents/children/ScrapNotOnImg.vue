<script setup>
import { ref } from 'vue'
import scrapLight from '@/assets/img/scrapNotOnImg/scrap-light.svg'
import scrapHover from '@/assets/img/scrapNotOnImg/scrap-light-hover.svg'
import scrappedLight from '@/assets/img/scrapNotOnImg/scrapped-light.svg'
import scrapDark from '@/assets/img/scrapNotOnImg/scrap-dark.svg'
import scrapDarkHover from '@/assets/img/scrapNotOnImg/scrap-dark-hover.svg'
import scrappedDark from '@/assets/img/scrapNotOnImg/scrapped-dark.svg'
import { useThemeStore } from '@/stores/useDarkmode'

const themeStore = useThemeStore()

const hover = ref(false)
const scrapped = ref(false)
const hoverHandler = () => {
  hover.value = true
}
const hoverOutHandler = () => {
  hover.value = false
}
const scrapHandler = () => {
  scrapped.value = !scrapped.value
}
</script>
<template>
  <div
    @mouseover="hoverHandler"
    @mouseleave="hoverOutHandler"
    @click="scrapHandler"
    class="cursor-pointer"
  >
    <div v-if="!hover && !scrapped">
      <img
        :src="themeStore.isDark ? scrapDark : scrapLight"
        alt="scrap"
        class="w-[25px] h-[25px]"
      />
    </div>
    <div v-else-if="hover && !scrapped">
      <img
        :src="themeStore.isDark ? scrapDarkHover : scrapHover"
        alt="scrapHover"
        class="w-[25px] h-[25px]"
      />
    </div>
    <div v-else-if="!hover && scrapped">
      <img
        :src="themeStore.isDark ? scrappedDark : scrappedLight"
        alt="scrapped"
        class="w-[25px] h-[25px]"
      />
    </div>
    <div v-else>
      <img
        :src="themeStore.isDark ? scrappedDark : scrappedLight"
        alt="scrappedHover"
        class="w-[25px] h-[25px]"
      />
    </div>
  </div>
</template>
<style scoped></style>
