<script>
export default {
  name: 'SginUpView',
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
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[23px] font-bold mb-2 w-[640px] text-left">이메일</label>
          <div class="flex gap-[20px]">
            <input
              type="email"
              v-model="email"
              placeholder="이메일 입력"
              required
              class="w-[520px] h-[53px] text-[23px] border rounded-[10px] px-3 py-2 focus:outline-none"
            />
            <button
              type="button"
              class="w-[90px] h-[53px] text-[#7537e3] text-[20px] rounded-[10px] border font-semibold border-[#7537e3]"
            >
              확인
            </button>
          </div>
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[23px] font-bold mb-2 w-[640px] text-left">이름</label>
          <input
            type="text"
            v-model="text"
            placeholder="이름 입력"
            required
            class="w-[640px] h-[53px] text-[23px] border rounded-[10px] px-3 py-2 focus:outline-none"
          />
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[23px] font-bold mb-2 w-[640px] text-left">닉네임</label>
          <div class="flex gap-[20px]">
            <input
              type="text"
              v-model="text"
              placeholder="2-8글자 이내 한글/영문/숫자"
              required
              class="w-[520px] h-[53px] text-[23px] border rounded-[10px] px-3 py-2 focus:outline-none"
            />
            <button
              type="button"
              class="w-[90px] h-[53px] text-[#7537e3] text-[20px] rounded-[10px] border font-semibold border-[#7537e3]"
            >
              확인
            </button>
          </div>
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[23px] font-bold mb-2 w-[640px] text-left">비밀번호</label>
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호 입력"
            required
            class="w-[640px] h-[53px] text-[23px] border rounded-[10px] px-3 py-2 focus:outline-none"
          />
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label class="block text-[23px] font-bold mb-2 w-[640px] text-left">비밀번호 확인</label>
          <input
            type="password"
            v-model="password"
            placeholder="비밀번호 확인"
            required
            class="w-[640px] h-[53px] text-[23px] border rounded-[10px] px-3 py-2 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-[600px] h-[55px] bg-[#7537e3] text-white text-[25px] font-semibold rounded-[10px] mt-[10px] mx-[40px]"
        >
          회원가입
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
