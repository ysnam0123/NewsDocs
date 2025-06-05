<script setup>
import ProfileDog from '@/components/icon/profileDog.vue'
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
      <div class="flex justify-between pt-8">
        <div class="flex flex-col justify-center space-y-4">
          <div class="text-[30px] font-bold">닉네임 변경</div>
          <input
            class="w-[407px] h-[54px] border-[1px] border-[#ABABAB] rounded-2xl p-2 mb-10"
            placeholder="유저 닉네임"
          />

          <div class="text-[30px] font-bold">비밀번호 변경</div>
          <input
            class="w-[407px] h-[54px] border-[1px] border-[#ABABAB] rounded-2xl p-2 mb-10"
            placeholder="새 비밀번호"
          />

          <div class="text-[30px] font-bold">비밀번호 확인</div>
          <div class="flex">
            <input
              class="w-[407px] h-[54px] border-[1px] border-[#ABABAB] rounded-2xl p-2 mb-10"
              placeholder="비밀번호 확인"
            />
            <div class="justify-center">
              <img src="@/assets/img/correct.svg" />
            </div>
          </div>
        </div>
        <div>
          <ProfileDog />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
