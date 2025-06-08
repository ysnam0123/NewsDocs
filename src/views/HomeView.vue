<script setup>
import ButtonVue from '@/components/common/ButtonVue.vue'
import { ref } from 'vue'
import BeforeLogin from './BeforeLogin.vue'

const nextSection = ref(null)

const windowScroll = () => {
  nextSection.value.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="wrapper">
    <div class="relative min-h-[calc(100vh-100px)] bg-[var(--light-purple)] px-[130px] py-[60px]">
      <h1 class="text-[50px] font-bold mb-[150px]">NewsDocs에 오신것을 환영합니다</h1>
      <div class="flex flex-col justify-center items-center">
        <div class="flex justify-between gap-[200px] mb-[200px]">
          <img src="../assets/homeIntro/Group 151.svg" alt="" />
          <img src="../assets/homeIntro/Group 151.svg" alt="" />
        </div>
        <div>
          <ButtonVue class="w-[480px] h-[60px] text-[25px] font-bold">로그인</ButtonVue>
        </div>
      </div>
      <div
        class="scrollArrow absolute bottom-0 left-[46%] flex flex-col justify-center items-center cursor-pointer"
        @click="windowScroll"
      >
        <p class="text-[20px] font-bold">클릭해서 둘러보기</p>
        <img src="../assets/icons/scrollDown.svg" alt="arrow" class="h-[50px]" />
      </div>
    </div>
    <div ref="nextSection">
      <BeforeLogin />
    </div>
  </div>
</template>

<style scoped>
.scrollArrow {
  animation: 0.4s linear 0s infinite alternate bounce;
}
@keyframes bounce {
  from {
    transform: translateY(-1vh);
  }
  to {
    transform: translateY(0vh);
  }
}
</style>
