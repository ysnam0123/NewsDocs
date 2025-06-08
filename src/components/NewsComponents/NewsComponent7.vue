<script setup></script>
<template>
  <div>
    <div class="w-[600px] h-[118px] rounded-[16px] p-[20px] border-1 border-[#EBEBEB]">
      <div class="flex flex-col gap-[12px]">
        <h1 class="w-[425px] text-[18px] font-bold">
          NH농협은행, 예금금리 최고 0.3%p 내려…"시장금리 반영"
        </h1>
        <div class="flex">
          <p class="text-[#8f8f8f] text-[14px] font-medium w-[425px]">
            NH농협은행은 이날 홈페이지에서 거치식 예금 금리를 이날부터 0.25~0.30%포인트(p)
            인하한다고 고객들에게 안내했다. 아울러 적립식 예
          </p>
          <!-- 좋아요 박스 -->
          <div class="flex gap-[5px] ml-auto mt-auto">
            <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
              <img src="@/assets/img/Thumbs-up-opacity.svg" alt="likes" class="w-[18px] h-[18px]" />
              <p class="mt-[4px] text-[12px]">32</p>
            </div>
            <div class="flex gap-[2px] items-center text-[13px] text-[#939393]">
              <img src="@/assets/img/View-opacity.svg" alt="likes" class="w-[19px] h-[19px]" />
              <p class="mt-[4px] text-[12px]">32</p>
            </div>
          </div>
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
