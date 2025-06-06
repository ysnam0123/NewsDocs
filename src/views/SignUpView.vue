<script>
export default {
  name: 'SginUpView',
  data() {
    return {
      email: '',
      isEmailValid: true,
      emailTouched: false,
    }
  },
  methods: {
    //이메일 검사
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //이메일 정규식
      this.isEmailValid = emailPattern.test(this.email)
    },
  },
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-[#ECE1FF]">
    <div
      class="bg-white rounded-[20px] w-[464px] h-[779px] flex flex-col items-center justify-center"
    >
      <img src="@/assets/img/logo.svg" alt="logo" class="w-[46px] h-[46px] mx-auto" />
      <h1 class="text-[40px] mb-6 text-center font-extrabold luckiest-guy-regular">newsDocs</h1>
      <form @submit.prevent="onLogin" class="flex flex-col items-center w-full">
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919]"
            >이메일</label
          >
          <div class="relative flex flex-col">
            <div class="flex items-center relative">
              <input
                type="email"
                v-model="email"
                placeholder="이메일 입력"
                required
                :class="[
                  'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none',
                  emailTouched && !isEmailValid ? 'border-[#F34040] ' : 'border-[#DFDFDF]',
                ]"
                @blur="emailTouched = true"
                @input="validateEmail"
              />
              <button
                type="button"
                class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer"
              >
                확인
              </button>
            </div>
            <p
              v-if="emailTouched && !isEmailValid"
              class="text-[#F34040] text-[11px] mt-[6px] ml-1"
            >
              이메일 형식이 올바르지 않습니다
            </p>
          </div>
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919]"
            >이름</label
          >
          <input
            type="text"
            v-model="text"
            placeholder="이름 입력"
            required
            class="w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none border-[#BDBDBD]"
          />
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919]"
            >닉네임</label
          >
          <div class="relative w-[363px]">
            <input
              type="text"
              v-model="text"
              placeholder="2-8글자 이내 한글/영문/숫자"
              required
              class="w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none border-[#BDBDBD]"
            />
            <button
              type="button"
              class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919]"
            >비밀번호</label
          >
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호 입력"
            required
            class="w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none border-[#BDBDBD]"
          />
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919]"
            >비밀번호 확인</label
          >
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호 확인"
            required
            class="w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none border-[#BDBDBD]"
          />
        </div>

        <button
          type="submit"
          class="w-[360px] h-[50px] bg-[#7537e3] text-white text-[16px] font-semibold rounded-[8px] mt-[10px] mx-[40px] hover:bg-[#601ED5] cursor-pointer transition-colors duration-300"
        >
          회원가입
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Jersey+10&family=Luckiest+Guy&family=Noto+Sans+KR:wght@100..900&display=swap');
.luckiest-guy-regular {
  font-family: 'Luckiest Guy', cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
