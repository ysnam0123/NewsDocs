<script setup>
import { ref } from 'vue'

const save = ref(false)
const saveHandler = () => {
  save.value = !save.value
}
</script>
<template>
  <div
    class="relative flex gap-[22px] w-[600px] h-[184px] border-1 border-[#EBEBEB] rounded-[16px]"
  >
    <img src="@/assets/img/exImage/trump.png" class="w-[200px] h-[184px] rounded-l-[16px]" />

    <div class="flex flex-col gap-[10px] py-[18px] h-[184px]">
      <div class="font-bold text-[18px] w-[272px]">
        트럼프, “나는 미국에 자신이 없어 발언.. 수많은 미국인들 자괴감에 빠져”
      </div>
      <div class="text-sm text-[#8F8F8F] w-[237px]">
        트럼프가 양심없는 발언을 하여 논란이 되었다. 이날 트럼프는 미국은 평균 이하라며 말도 안되는
        소리를 연이어 토해내어...
      </div>
      <!-- 좋아요 박스 -->
      <div class="flex gap-[8px]">
        <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
          <img src="@/assets/img/Thumbs-up-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
          <p class="mt-[4px] text-[12px]">32</p>
        </div>
        <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
          <img src="@/assets/img/View-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
          <p class="mt-[4px] text-[12px]">32</p>
        </div>
      </div>
    </div>
    <img
      v-if="!save"
      @click="saveHandler"
      src="@/assets/img/scrap.svg"
      alt="scarp"
      class="w-[60px] h-[60px] absolute right-[5px] top-[0px] cursor-pointer"
    />
    <img
      v-else
      @click="saveHandler"
      src="@/assets/img/scrapped.svg"
      alt="scarp"
      class="w-[60px] h-[60px] absolute right-[5px] top-[0px] cursor-pointer"
    />
  </div>
</template>
<style scoped></style>
