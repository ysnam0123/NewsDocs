<script setup>
import BlackBtn from '@/components/icon/blackBtn.vue'
import ProfileDog from '@/components/icon/profileDog.vue'
import SmallGrayBtn from '@/components/icon/smallGrayBtn.vue'
import SmallVioletBtn from '@/components/icon/smallVioletBtn.vue'
import SmallWhiteBtn from '@/components/icon/smallWhiteBtn.vue'
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
      class="w-full max-w-[1200px] bg-white mx-auto my-[60px] p-[30px] rounded-[20px] pl-[140px] pr-[60px]"
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
          <div class="flex items-center">
            <input
              class="w-[407px] h-[54px] border-[1px] border-[#ABABAB] rounded-2xl p-2"
              placeholder="비밀번호 확인"
            />
            <div class="ml-5">
              <img src="@/assets/img/correct.svg" />
            </div>
          </div>
          <div class="relative w-[120px] h-[40px]">
            <BlackBtn />
            <div
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-[15px]"
            >
              변경하기
            </div>
          </div>
          <div class="text-[30px] font-bold my-5">관심사 수정하기</div>
          <div class="w-[651px] h-[259px] border-[1px] border-[#ABABAB] rounded-[15px]">
            <div class="w-[651px] h-[259px] flex flex-col items-center justify-center gap-y-10">
              <div class="space-x-5">
                <SmallGrayBtn> 정치 </SmallGrayBtn>
                <SmallGrayBtn> 세계사 </SmallGrayBtn>
                <SmallGrayBtn> 스포츠 </SmallGrayBtn>
                <SmallVioletBtn> 기타 </SmallVioletBtn>
              </div>
              <div class="space-x-5">
                <SmallGrayBtn> 정치2 </SmallGrayBtn>
                <SmallVioletBtn> 기타2 </SmallVioletBtn>
                <SmallGrayBtn> 스포츠2 </SmallGrayBtn>
                <SmallVioletBtn> 기타3 </SmallVioletBtn>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ProfileDog />
        </div>
      </div>
      <div class="flex justify-end gap-4 m-5">
        <SmallWhiteBtn textColor="#E70808"> 취소 </SmallWhiteBtn>
        <SmallWhiteBtn textColor="#6046CF"> 저장 </SmallWhiteBtn>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
