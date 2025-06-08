<script setup>
import ProfileDog from '@/components/icon/profileDog.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import SleepDog from '@/components/profile/SleepDog.vue'
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet"
  />

  <div class="min-h-screen flex flex-col font-[Inter]">
    <div class="bg-white w-full h-[100px] top-0"></div>
    <div class="max-w-[1200px] mx-auto">
      <div class="flex justify-between">
        <div class="flex space-x-5 mt-5">
          <ProfileDog />
          <div class="flex flex-col">
            <div class="text-[24px] font-semibold">유저 닉네임</div>
            <div class="flex space-x-2">
              <div class="text-[#8F8F8F] text-sm"># 스포츠</div>
              <div class="text-[#8F8F8F] text-sm"># 사회</div>
              <div class="text-[#8F8F8F] text-sm"># 문화</div>
            </div>
            <div class="mt-3">
              <button
                class="w-[106px] h-[36px] bg-[#F6F6F6] text-center rounded-[8px] text-sm cursor-pointer"
              >
                내 정보 수정
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold">내가 저장한 뉴스</div>
          <button class="text-[#626262] text-sm cursor-pointer">더보기</button>
        </div>
        <!-- <SleepDog /> -->
        <div class="flex pt-12 space-x-[24px]">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
      </div>

      <div class="mt-10 w-[735px] h-[244px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold">내가 작성한 글</div>
          <button class="text-[#626262] text-sm cursor-pointer">더보기</button>
        </div>
        <!-- <div class="w-[934px] h-[253px] my-5 bg-amber-700 rounded-[20px]"></div>
        <div class="w-[934px] h-[253px] my-5 bg-amber-700 rounded-[20px]"></div> -->
        <SleepDog />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
