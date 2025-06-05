<script setup>
import sportBtn from '@/components/icon/sportBtn.vue'
</script>
<template>
  <div class="w-[832px] h-[520px]">
    <div
      class="relative bg-[linear-gradient(to_top,oklch(0.2_0.05_250/0.9),oklch(0.2_0.05_250/0.4)_90%),url('@/assets/img/son2.jpg')] bg-cover bg-center w-full h-full p-3 rounded-[20px]"
    >
      <div class="absolute w-[415px] left-0 bottom-0 p-3">
        <div class="relative text-center inline-block">
          <sportBtn />
          <p class="absolute inset-0 flex items-center justify-center text-white font-bold">
            스포츠
          </p>
        </div>
        <p class="text-white text-3xl font-bold">
          토트넘, 맨유 꺾고 유로파 우승… 손흥민, 무관의 한 풀었다 (종합2보)
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
