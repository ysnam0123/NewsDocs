<script>
export default {
  name: 'LoginView',
  data() {
    return {}
  },
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-[#ECE1FF]">
    <div
      class="bg-white rounded-[20px] w-[770px] h-[920px] flex flex-col items-center justify-center"
    >
      <img src="@/assets/img/logo.png" alt="logo" class="w-[110px] h-[110px] mx-auto" />
      <h1 class="text-[50px] mb-6 text-center font-extrabold">newsDocs</h1>
      <form @submit.prevent="onLogin" class="flex flex-col items-center w-full">
        <div class="mb-4 w-full flex flex-col items-center">
          <label class="block text-[23px] font-bold mb-2 w-[640px] text-left">이메일</label>
          <input
            type="email"
            v-model="email"
            placeholder="이메일 입력"
            required
            class="w-[640px] h-[53px] text-[23px] border rounded-[10px] px-3 py-2 focus:outline-none"
          />
        </div>
        <div class="mb-6 w-full flex flex-col items-center">
          <label class="block text-[23px] font-bold mb-2 w-[640px] text-left">비밀번호</label>
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호 입력"
            required
            class="w-[640px] h-[53px] text-[23px] border rounded-[10px] px-3 py-2 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-[600px] h-[55px] bg-[#7537e3] text-white text-[25px] font-semibold rounded-[10px] mx-[40px]"
        >
          로그인
        </button>
      </form>
      <div class="flex items-center my-6 w-[610px]">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-black text-[20px]">또는</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>
      <div class="flex flex-col gap-[22px] mb-4 mt-[30px] items-center w-full">
        <button
          class="flex items-center justify-center border py-2 hover:bg-gray-50 transition text-[25px] font-semibold w-[610px] h-[65px]"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            class="w-5 h-5 mr-2"
          />
          구글 로그인
        </button>
        <button
          class="flex items-center justify-center border py-2 hover:bg-gray-50 transition text-[25px] font-semibold w-[610px] h-[65px]"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="naver"
            class="w-5 h-5 mr-2"
          />
          네이버 로그인
        </button>
      </div>
      <div class="text-center font-bold text-[20px] text-[#7537e3] w-full mt-[27px]">
        <a href="#" class="hover:underline">아이디가 없으신가요? 회원가입 하기 &gt;</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
