<script setup>
import dogImg from '@/assets/img/dog-notfound.png'
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-white">
    <div class="flex flex-col justify-center items-center mt-[-200px]">
      <img :src="dogImg" alt="dog" class="w-[300px] ml-14" />
      <h1 class="font-bold text-[32px] text-[#191919] mt-10">
        어라..? 이건 본 적 없는 페이지인데요!
      </h1>
      <h2 class="font-semibold text-[18px] text-[#929292] mt-3.5">
        가끔은 길을 잃을 때가 있죠. 같이 집으로 돌아가요!
      </h2>
      <router-link to="/">
        <button
          class="font-semibold text-[20px] text-white w-[142px] h-[50px] bg-[#7537e3] rounded-lg my-[57px] cursor-pointer hover:bg-[#601ED5] shadow-lg shadow-purple-500/50 transition-all duration-300"
        >
          홈으로 가기
        </button>
      </router-link>
    </div>
  </div>
</template>
