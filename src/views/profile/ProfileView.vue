<script setup>
import ProfileDog from '@/components/icon/profileDog.vue'
import NewsComponent8 from '@/components/NewsComponents/NewsComponent8.vue'
import SleepDog from '@/components/profile/SleepDog.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
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
              <router-link to="/profile/edit">
                <button
                  class="w-[106px] h-[36px] bg-[#F6F6F6] text-center rounded-[8px] text-sm cursor-pointer hover:bg-[#EDEDED]"
                >
                  내 정보 수정
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 w-[735px]">
        <div class="flex justify-between">
          <div class="text-[20px] font-bold">내가 저장한 뉴스</div>
          <router-link to="/profile/news">
            <button
              class="text-[#626262] text-sm cursor-pointer hover:text-[#191919] hover:underline"
            >
              더보기
            </button>
          </router-link>
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
          <router-link to="/profile/write">
            <button
              class="text-[#626262] text-sm cursor-pointer hover:text-[#191919] hover:underline"
            >
              더보기
            </button>
          </router-link>
        </div>
        <!-- <div class="w-[934px] h-[253px] my-5 bg-amber-700 rounded-[20px]"></div>
        <div class="w-[934px] h-[253px] my-5 bg-amber-700 rounded-[20px]"></div> -->
        <SleepDog />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
