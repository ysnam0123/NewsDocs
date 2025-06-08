<script setup>
import { ref } from 'vue'

const save = ref(false)
const saveHandler = () => {
  save.value = !save.value
}
</script>
<template>
  <div class="w-[292px] h-[384px]">
    <div class="relative">
      <img
        src="@/assets/img/exImage/karina.png"
        alt="karina"
        class="w-[292px] h-[384px] rounded-3xl"
      />
      <div
        class="flex flex-col px-[20px] absolute h-[187px] w-[292px] bg-linear-to-t from-black to-transparent bottom-0 z-10 rounded-[16px]"
      >
        <p class="font-bold text-[20px] text-[white] mt-auto">
          손흥민 사우디로 이적한답니다.. <br />꼭 가야만 할까요?
        </p>
        <!-- 좋아요 상자 -->
        <div class="flex gap-[8px] mb-[16px]">
          <div class="flex gap-[4px] items-center text-[13px] text-[#ffffff]">
            <img src="@/assets/img/Thumbs-up-white.svg" alt="likes" class="w-[18px] h-[18px]" />
            <p class="mt-[4px] text-[12px]">32</p>
          </div>

          <div class="flex gap-[4px] items-center text-[13px] text-[#ffffff]">
            <img src="@/assets/img/View-white.svg" alt="likes" class="w-[18px] h-[18px]" />
            <p class="mt-[4px] text-[12px]">32</p>
          </div>
        </div>
      </div>
    </div>
    <img
      v-if="!save"
      @click="saveHandler"
      src="@/assets/img/scrap.svg"
      alt="scarp"
      class="w-[45px] h-[45px] absolute right-[8px] top-[10px] cursor-pointer"
    />
    <img
      v-else
      @click="saveHandler"
      src="@/assets/img/scrapped.svg"
      alt="scarp"
      class="w-[45px] h-[45px] absolute right-[8px] top-[10px] cursor-pointer"
    />
  </div>
</template>
<style scoped></style>

<!-- <div
      class="relative bg-[linear-gradient(to_top,oklch(0.2_0.05_250/0.9),oklch(0.2_0.05_250/0.4)_30%),url('@/assets/img/lee.jpg')] bg-cover bg-center w-full h-full rounded-[16px]"
    > -->
