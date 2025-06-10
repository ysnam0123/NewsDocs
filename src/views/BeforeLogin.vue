<script setup>
import NewsComponent10 from '@/components/NewsComponents/NewsComponent10.vue'
import NewsComponent2 from '@/components/NewsComponents/NewsComponent2.vue'
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import NewsComponent6 from '@/components/NewsComponents/NewsComponent6.vue'
import NewsComponent7 from '@/components/NewsComponents/NewsComponent7.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import NewsComponent9 from '@/components/NewsComponents/NewsComponent9.vue'
import NewsComponentCommunity from '@/components/NewsComponents/NewsComponentCommunity.vue'
</script>
<template>
  <div class="mx-auto max-w-[1240px] pt-[50px]">
    <!-- 섹션 1 -->
    <div class="section1 mb-[44px]">
      <!-- 스포츠 제목 -->
      <div class="mb-[30px]">
        <h1 class="flex gap-[10px] items-center">
          <img src="../assets/icons/sportsIcon.svg" alt="sportsIcon" />
          <p class="text-[30px] font-bold">스포츠</p>
        </h1>
      </div>
      <div class="flex gap-[40px]">
        <div class="flex gap-[20px]">
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
        <div class="flex flex-col gap-[24px]">
          <NewsComponent2 />
          <NewsComponent2 />
          <NewsComponent2 />
        </div>
      </div>

      <div class="flex justify-between ]">
        <NewsComponent9 />
        <NewsComponent9 />
        <NewsComponent9 />
        <NewsComponent9 />
      </div>
    </div>

    <!-- 섹션 2 : 커뮤니티로 접근 -->
    <div class="rounded-[24px] bg-[#F8F8F8] w-[1240px] h-[510px] px-[60px] py-[53px] mb-[60px]">
      <h1 class="text-[30px] font-bold mb-[32px]">나의 관심사에 대해 사람들과 이야기해보세요!</h1>
      <div class="flex flex-row justify-between gap-[24px]">
        <NewsComponentCommunity />
        <NewsComponentCommunity />
        <NewsComponentCommunity />
      </div>
      <button
        class="mx-auto mt-[42px] flex rounded-[8px] justify-center items-center w-[194px] h-[50px] text-white font-bold text-[16px] bg-[#7537E3] cursor-pointer hover:bg-[#b394e7] active:scale-[0.98]"
      >
        글쓰러 가기
      </button>
    </div>
    <!-- 섹션 3 : 슬라이드 카드뉴스 -->
    <div class="w-[100%] h-[524px]">
      <!-- 제목 -->
      <div class="mb-[30px]">
        <h1 class="flex gap-[10px] items-center">
          <img src="../assets/icons/sportsIcon.svg" alt="sportsIcon" />
          <p class="text-[30px] font-bold">스포츠</p>
        </h1>
      </div>
    </div>
  </div>

  <NewsComponent5 />
  <NewsComponent6 />
  <NewsComponent7 />
  <NewsComponent10 />
</template>
<style scoped></style>
