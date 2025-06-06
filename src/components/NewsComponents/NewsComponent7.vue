<script setup>
import scrapBtn from '@/components/icon/scrapBtn.vue'
import thumbsUp from '@/components/icon/thumbsUp.vue'
import viewCountBtn from '@/components/icon/viewCount.vue'
</script>
<template>
  <div class="relative w-[589px] h-[119px] border-1 border-[#EBEBEB] rounded-2xl p-5 space-y-3">
    <scrapBtn class="absolute top-0 right-0 m-4" />
    <div class="w-[414px] font-bold text-lg text-[#313131]">
      NH농협은행, 예금금리 최고 0.3%p 내려…"시장...
    </div>
    <div class="w-[414px] font-medium text-sm text-[#8F8F8F]">
      NH농협은행은 이날 홈페이지에서 거치식 예금 금리를 이날부터 0.25~0.30%포인트(p) 인하한다고
      고객들에게 안내했다.
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
</template>
<style scoped></style>
