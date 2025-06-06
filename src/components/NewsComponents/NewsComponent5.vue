<script setup>
import scrapBtn from '@/components/icon/scrapBtn.vue'
import thumbsUp from '@/components/icon/thumbsUp.vue'
import viewCountBtn from '@/components/icon/viewCount.vue'
</script>
<template>
  <div class="relative flex w-[600px] h-[233px] border-1 border-[#EBEBEB] rounded-2xl">
    <div class="w-[197px] h-[233px]">
      <img
        src="@/assets/img/lee.jpg"
        class="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
      />
    </div>
    <scrapBtn class="absolute top-0 right-0 m-4" />
    <div class="flex flex-col">
      <div class="font-bold text-[18px] w-[272px] m-4">
        이동욱, “나는 얼굴에 자신이 없어 발언.. 수많은 남자들 자괴감에 빠져”
      </div>
      <div class="text-sm text-[#8F8F8F] w-[237px] m-4">
        이동욱이 양심없는 발언을 하여 논란이 되었다. 이날 이동욱은 자신의 외모는 평균 이하라며 말도
        안되는 소리를 연이어 토해내어 절경이 펼쳐졌다.
      </div>
      <div class="flex absolute bottom-0 right-0 space-x-2 m-4">
        <div class="flex items-center space-x-1">
          <thumbsUp />
          <div class="text-[11px] text-[#7F7F7F]">32</div>
        </div>
        <div class="flex items-center space-x-1">
          <viewCountBtn />
          <div class="text-[11px] text-[#7F7F7F]">168</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
