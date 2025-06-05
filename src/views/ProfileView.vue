<script setup>
import ProfileDog from '@/components/icon/profileDog.vue'
import ProfileEditBtn from '@/components/icon/profileEditBtn.vue'
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

  <div class="bg-[#ECE8FF] min-h-screen flex flex-col font-[Inter]">
    <div class="bg-white w-full h-[100px] top-0"></div>
    <div
      class="w-full max-w-[1200px] bg-white mx-auto my-[60px] p-[30px] rounded-[20px] px-[140px]"
    >
      <div class="flex justify-between">
        <div class="flex space-x-5 mt-5">
          <ProfileDog />
          <div class="flex flex-col">
            <div class="flex space-x-5">
              <div class="text-[#6B6B6B] text-xl font-bold"># 스포츠</div>
              <div class="text-[#6B6B6B] text-xl font-bold"># 사회</div>
              <div class="text-[#6B6B6B] text-xl font-bold"># 문화</div>
            </div>
            <div class="text-[32px] font-bold m-4">유저 닉네임</div>
          </div>
        </div>
        <div class="top-0 mt-5">
          <ProfileEditBtn />
        </div>
      </div>
      <div class="mt-[100px]">
        <div class="flex justify-between">
          <div class="text-[32px] font-bold">내가 저장한 뉴스</div>
          <button class="text-[#626262] text-sm cursor-pointer">더보기</button>
        </div>
        <!-- <SleepDog /> -->
        <div class="flex pt-12 space-x-[32px] p-2">
          <NewsComponent8 />
          <NewsComponent8 />
          <NewsComponent8 />
        </div>
      </div>

      <div class="mt-[100px] mb-[60px]">
        <div class="flex justify-between">
          <div class="text-[32px] font-bold">내가 쓴 글</div>
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
