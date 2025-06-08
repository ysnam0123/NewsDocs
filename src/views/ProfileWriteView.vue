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
  <div class="min-h-screen flex flex-col font-[Inter]">
    <div class="max-w-[735px] mx-auto mt-10">
      <div class="flex w-10 h-10 rounded-[50px] bg-[#F6F6F6] items-center justify-center mb-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="18"
            height="18"
            fill="white"
            fill-opacity="0.01"
            style="mix-blend-mode: multiply"
          />
          <path
            d="M5.625 9L11.25 3.375L12.0375 4.1625L7.2 9L12.0375 13.8375L11.25 14.625L5.625 9Z"
            fill="#161616"
          />
        </svg>
      </div>
      <div class="text-[28px] font-bold">내가 작성한 글</div>
      <div
        class="flex border-[#9A9A9A] border-b-[0.5px] h-[72px] items-center text-center space-x-4 mb-5"
      >
        <div
          class="font-semibold w-[103px] text-[#7537E3] text-base underline underline-offset-[27px] decoration-[2px] cursor-pointer"
        >
          전체
        </div>

        <div class="text-[#969696] w-[103px] text-base cursor-pointer">정치/경제</div>
        <div class="text-[#969696] w-[103px] text-base cursor-pointer">연예/스포츠</div>
        <div class="text-[#969696] w-[103px] text-base cursor-pointer">사회/문화</div>
        <div class="text-[#969696] w-[103px] text-base cursor-pointer">해외/기타</div>
      </div>
      <div class="flex flex-col">
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex space-x-[24px] py-5">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
