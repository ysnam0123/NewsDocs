<script setup>
import SmallGrayBtn from '@/components/icon/smallGrayBtn.vue'
import SmallVioletBtn from '@/components/icon/smallVioletBtn.vue'
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="mx-auto p-[30px]">
      <div class="flex justify-between">
        <div class="flex flex-col justify-center space-y-4">
          <div class="mb-5 w-full flex flex-col items-center">
            <label
              class="block text-[24px] font-bold w-[444px] text-left text-[#191919] mb-6 dark:text-white"
              >내 정보 수정</label
            >
            <label
              class="block text-[14px] font-semibold mb-2 w-[444px] text-left text-[#191919] dark:text-white"
              >닉네임</label
            >
            <div class="relative w-[444px]">
              <input
                type="text"
                v-model="text"
                placeholder="2-8글자 이내 한글/영문/숫자"
                required
                class="w-[444px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none border-[#BDBDBD] dark:text-white dark:border-[#4D4D4D]"
              />
              <button
                type="button"
                class="w-[67px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer hover:bg-[#F3ECFF] transition-all duration-300 dark:border-[#7846D2] dark:text-[#B185FF] dark:hover:bg-[#3A3247]"
              >
                중복 확인
              </button>
            </div>
          </div>

          <div class="mb-5 w-full flex flex-col items-center">
            <label
              class="block text-[14px] font-semibold mb-2 w-[444px] text-left text-[#191919] dark:text-white"
              >비밀번호</label
            >
            <input
              type="password"
              v-model="password"
              placeholder="비밀번호 입력"
              required
              class="w-[444px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none border-[#BDBDBD] dark:text-white dark:border-[#4D4D4D]"
            />
          </div>
          <div class="mb-5 w-full flex flex-col items-center">
            <label
              class="block text-[14px] font-semibold mb-2 w-[444px] text-left text-[#191919] dark:text-white"
              >비밀번호 확인</label
            >
            <input
              type="password"
              v-model="password"
              placeholder="비밀번호 확인"
              required
              class="w-[444px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none border-[#BDBDBD] dark:text-white dark:border-[#4D4D4D]"
            />
          </div>

          <div class="text-[24px] font-bold my-5 dark:text-white">관심사 수정하기</div>
          <div
            class="w-[444px] h-[259px] border-[1px] border-[#ABABAB] rounded-[15px] dark:border-[#4D4D4D]"
          >
            <div class="w-[444px] h-[259px] flex flex-col items-center justify-center gap-y-10">
              <div class="space-x-5">
                <SmallGrayBtn> 정치 </SmallGrayBtn>
                <SmallGrayBtn> 세계사 </SmallGrayBtn>
                <SmallGrayBtn> 스포츠 </SmallGrayBtn>
              </div>
              <div class="space-x-5">
                <SmallGrayBtn> 정치2 </SmallGrayBtn>
                <SmallVioletBtn> 기타2 </SmallVioletBtn>
                <SmallGrayBtn> 스포츠2 </SmallGrayBtn>
              </div>
            </div>
          </div>
        </div>
        <div class="sticky top-[40px] self-start">
          <div class="flex flex-col items-end space-y-2 ml-[46px]">
            <button
              class="w-[123px] h-[44px] bg-[#7537E3] rounded-lg text-sm text-white cursor-pointer hover:bg-[#601ED5] dark:bg-[#7846D2] dark:hover:bg-[#6524D9]"
            >
              변경사항 저장
            </button>
            <router-link to="/profile">
              <button
                class="w-[123px] h-[44px] bg-[#F6F6F6] rounded-lg text-sm text-[#191919] cursor-pointer hover:bg-[#EDEDED] dark:bg-[#363636] dark:text-white dark:hover:bg-[#4A4A4A]"
              >
                취소하기
              </button>
            </router-link>
          </div>
        </div>
        <!-- <div>
          <ProfileDog />
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped></style>
