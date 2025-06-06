<script setup>
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
</script>
<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet"
  />
  <div class="bg-[#ECE8FF] min-h-screen flex flex-col font-[Inter]">
    <div class="bg-white w-full h-[100px] top-0"></div>
    <div class="w-full max-w-[1200px] bg-white mx-auto my-[60px] rounded-[20px]">
      <div class="text-[28px] font-bold p-7">내가 저장한 뉴스</div>
      <div class="flex border-[#9A9A9A] border-y-[0.5px] h-[72px] items-center space-x-4 px-7">
        <div
          class="font-semibold text-[#7537E3] text-xl underline underline-offset-[23px] decoration-[5px] cursor-pointer"
        >
          전체 보기
        </div>
        <div class="text-[#969696] text-xl cursor-pointer">정치/경제</div>
        <div class="text-[#969696] text-xl cursor-pointer">연예/스포츠</div>
        <div class="text-[#969696] text-xl cursor-pointer">사회/문화</div>
        <div class="text-[#969696] text-xl cursor-pointer">해외/기타</div>
      </div>
      <div class="flex flex-col">
        <div class="flex space-x-2.5 px-7 py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-2.5 px-7 py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-2.5 px-7 py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-2.5 px-7 py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
