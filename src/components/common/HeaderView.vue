<script setup>
import ButtonVue from './ButtonView.vue'
</script>
<template>
  <div class="px-[30px] py-[0px]">
    <div class="px-[30px] py-[0px] flex items-center">
      <div class="flex items-center gap-[10px] cursor-pointer">
        <img src="../../assets/icons/headerLogoImg.svg" alt="logoImg" />
        <h1 class="text-[40px] select-none">NewsDocs</h1>
      </div>
      <div class="ml-[30px]">
        <ul class="flex gap-[15px] seelct-none mt-[10px]">
          <li
            class="cursor-pointer w-[120px] px-[12px] py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
          >
            맞춤 소식
          </li>
          <li
            class="cursor-pointer w-[120px] px-[12px] py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
          >
            다른 소식
          </li>
          <li
            class="cursor-pointer w-[120px] px-[12px] py-[8px] ease-in duration-75 hover:text-[#7537e3] hover:font-bold text-[18px]"
          >
            의견 나누기
          </li>
        </ul>
      </div>
      <div class="flex gap-[10px] ml-auto">
        <div class="ml-[40px] relative">
          <input
            type="text"
            class="w-[300px] h-[40px] px-[10px] py-[5px] border-1 border-[#939393] rounded-xl"
            placeholder="키워드로 뉴스 검색"
          />
          <img
            src="../../assets/icons/searchIcon.svg"
            alt="searchIcon"
            class="absolute right-[10px] top-[8px] cursor-pointer"
          />
        </div>
        <ButtonVue
          class="w-[100px] h-[40px] px-[10px] py-[5px] ease-in duration-75 hover:bg-[#7956bf] active:scale-[0.95]"
          >로그인</ButtonVue
        >
      </div>
    </div>
  </div>
</template>
<style scoped></style>
