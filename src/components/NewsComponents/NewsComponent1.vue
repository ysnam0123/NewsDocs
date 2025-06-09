<script setup>
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'
import { ref } from 'vue'

const count = ref(20)
</script>
<template>
  <div class="w-[786px] h-[468px]">
    <div
      class="relative bg-[linear-gradient(to_top,oklch(0.2_0.05_250/0.9),oklch(0.2_0.05_250/0.4)_90%),url('@/assets/img/son.jpeg')] bg-cover bg-center w-full h-full rounded-[20px]"
    >
      <div class="absolute w-[415px] bottom-0">
        <div class="relative text-center inline-block ml-8">
          <p class="inset-0 flex text-white text-xs mb-1.5">#스포츠</p>
          <p class="text-white font-semibold text-2xl text-left w-[520px] break-words">
            토트넘, 맨유 꺾고 유로파 우승… 손흥민, 무관의 한 풀었다 (종합2보)
          </p>
        </div>
        <div class="flex ml-8 gap-3 text-white mt-5 mb-8">
          <div class="flex gap-1">
            <ThumbsUp class="w-4" />
            <span>{{ count }}</span>
          </div>
          <div class="flex gap-1">
            <Eye class="w-4" />
            <span>{{ count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
