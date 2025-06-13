<script setup>
import { ref } from 'vue'

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
    @click.stop="scrapHandler"
    class="cursor-pointer"
  >
    <div v-if="!hover && !scrapped">
      <img src="@/assets/img/scrap.svg" alt="scrap" class="w-[38px] h-[38px]" />
    </div>
    <div v-else-if="hover && !scrapped">
      <img src="@/assets/img/scrap-hover.svg" alt="scrapHover" class="w-[38px] h-[38px]" />
    </div>
    <div v-else-if="!hover && scrapped">
      <img src="@/assets/img/scrapped.svg" alt="scrapped" class="w-[38px] h-[38px]" />
    </div>
    <div v-else>
      <img src="@/assets/img/scrapped-hover.svg" alt="scrappedHover" class="w-[38px] h-[38px]" />
    </div>
  </div>
</template>
<style scoped></style>
