<script setup>
import scrapOpacityBtn from '@/components/icon/scrapOpacityBtn.vue'
import thumbsUpOpacity from '@/components/icon/thumbsUpOpacity.vue'
import viewCountOpacityBtn from '@/components/icon/viewCountOpacity.vue'
</script>
<template>
  <div class="relative flex w-[600px] h-[152px]">
    <div
      class="relative bg-[linear-gradient(to_top,oklch(0.2_0.05_250/0.9),oklch(0.2_0.05_250/0.4)_90%),url('@/assets/img/forest.png')] bg-cover bg-center w-full h-full p-3 rounded-[20px]"
    >
      <scrapOpacityBtn class="absolute top-0 right-0 m-4" />
      <div class="absolute flex left-0 bottom-0 text-white font-bold m-5">
        DMZ·근현대 정원서 자연유산 찾는다…천연보호구역 조정 검토
      </div>
      <div class="flex absolute bottom-0 right-0 space-x-2 m-4">
        <div class="flex items-center space-x-1">
          <thumbsUpOpacity />
          <div class="text-[11px] text-[#E4E4E4]">32</div>
        </div>
        <div class="flex items-center space-x-1">
          <viewCountOpacityBtn />
          <div class="text-[11px] text-[#E4E4E4]">168</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
