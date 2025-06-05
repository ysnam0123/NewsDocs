<script setup>
import scrapOpacityBtn from '@/components/icon/scrapOpacityBtn.vue'
import thumbsUpOpacity from '@/components/icon/thumbsUpOpacity.vue'
import viewCountOpacityBtn from '@/components/icon/viewCountOpacity.vue'
</script>
<template>
  <div class="w-[290px] h-[318px]">
    <div
      class="relative bg-[linear-gradient(to_top,oklch(0.2_0.05_250/0.9),oklch(0.2_0.05_250/0.4)_30%),url('@/assets/img/lee.jpg')] bg-cover bg-center w-full h-full rounded-[16px]"
    >
      <scrapOpacityBtn class="absolute top-0 right-0 m-4" />
      <div class="absolute text-white text-lg font-bold p-5 bottom-[30px]">
        이동욱, “나는 얼굴에 자신이 없어 발언...수많은 남자들 자괴감에 빠져”
      </div>
      <div class="flex absolute bottom-0 left-0 space-x-2 m-5">
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
