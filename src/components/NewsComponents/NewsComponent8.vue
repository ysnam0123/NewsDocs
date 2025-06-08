<script setup>
import { ref } from 'vue'

const save = ref(false)
const saveHandler = () => {
  save.value = !save.value
}

const hovered = ref(false)
const hoverHandler = () => {
  hovered.value = !hovered.value
}
</script>
<template>
  <div class="w-[380px] h-[470px] relative cursor-pointer">
    <div class="w-[380px] h-[300px]">
      <img
        src="@/assets/img/exImage/sports.svg"
        class="w-full h-full rounded-[20px] object-cover space-y-0.5"
        @mouseover="hoverHandler"
      />
    </div>
    <div>
      <div class="text-[20px] font-bold mt-[12px] mb-[5px]">
        손흥민 유로파 리그 우승, 다음 행보는?
      </div>
      <div class="text-[16px] text-[#A8A8A8] mb-[5px]">
        기사내용입니다.기사내용입니다기사내용입니다기사내용입니다기사내용입니다기사내용입니다.기사내용...
      </div>
      <div class="flex gap-[8px] mb-[16px]">
        <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
          <img src="@/assets/img/Thumbs-up-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
          <p class="mt-[4px] text-[12px]">32</p>
        </div>
        <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
          <img src="@/assets/img/View-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
          <p class="mt-[4px] text-[12px]">32</p>
        </div>
      </div>
      <transition name="fade">
        <div
          v-if="hovered"
          class="w-[380px] h-[440px] rounded-[20px] opacity-[70%] bg-[black] absolute top-0 blur-xs"
        ></div>
      </transition>
    </div>
    <img
      v-if="!save"
      @click="saveHandler"
      src="@/assets/img/scrap.svg"
      alt="scarp"
      class="w-[45px] h-[45px] absolute right-[15px] top-[10px] cursor-pointer"
    />
    <img
      v-else
      @click="saveHandler"
      src="@/assets/img/scrapped.svg"
      alt="scarp"
      class="w-[45px] h-[45px] absolute right-[15px] top-[10px] cursor-pointer"
    />
  </div>
</template>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.7;
    transform: translateY(0);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
.fade-enter-active {
  animation: fadeIn 0.5s ease forwards;
}
.fade-leave-active {
  animation: fadeOut 0.3s ease forwards;
}
</style>
