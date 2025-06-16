<script setup>
import { ref, computed } from 'vue'
import supabase from '@/utils/supabase'
import { useToast } from 'vue-toastification'
//import { useRouter } from 'vue-router'
import router from '@/router'
//구글 로그인
import { useGoogleAuth } from '@/composables/useGoogleAuth'
import DarkModeButton from '@/components/common/DarkModeButton.vue'
const { signInWithGoogle } = useGoogleAuth()

const email = ref('')
const password = ref('')
const emailTouched = ref(false)
const isEmailValid = ref(true)

const isLoginDisabled = computed(() => !(email.value && password.value))

const toast = useToast()

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isEmailValid.value = emailPattern.test(email.value)
}

function onGoogleLogin() {
  signInWithGoogle(toast)
}

async function onLogin() {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      toast('이메일 또는 비밀번호가 올바르지 않습니다.')
    } else if (error.message.includes('Email not confirmed')) {
      toast('이메일 인증이 완료되지 않았습니다. 메일을 확인하세요.')
    } else {
      toast('로그인에 실패했습니다.', { icon: false })
    }
  }
  router.push('/')
}
</script>
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#EDEBF1] dark:bg-[#1F1F1F] relative"
  >
    <div class="absolute top-10 right-10 z-50">
      <DarkModeButton />
    </div>
    <div
      class="bg-white dark:bg-[#262626] rounded-[16px] w-[464px] h-[696px] pt-[50px] flex flex-col items-center justify-center"
    >
      <router-link to="/">
        <img src="@/assets/img/logo.svg" alt="logo" class="w-[46px] h-[46px] mx-auto" />
        <h1
          class="text-[40px] dark:text-white mb-6 text-center font-extrabold luckiest-guy-regular"
        >
          newsDocs
        </h1>
      </router-link>
      <form @submit.prevent="onLogin" class="flex flex-col items-center w-full">
        <div class="mb-4 w-full flex flex-col items-center">
          <div class="relative">
            <input
              type="email"
              v-model="email"
              placeholder=""
              required
              :class="[
                'peer w-[360px] h-[61px] text-[16px] rounded-[12px] px-4 pt-6 pb-2 border focus:outline-none transition-colors dark:text-white',
                emailTouched && !isEmailValid
                  ? 'border-[#F34040] '
                  : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
              ]"
              @blur="emailTouched = true"
              @input="validateEmail"
            />
            <label
              class="absolute left-[16px] top-[12px] text-[#BDBDBD] text-[12px] transition-all duration-200 pointer-events-none origin-[0] peer-focus:top-[12px] peer-focus:text-[12px] peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-[20px]"
              >이메일</label
            >
            <p
              v-if="emailTouched && !isEmailValid"
              class="text-[#F34040] text-[11px] mt-[6px] ml-1"
            >
              이메일 형식이 올바르지 않습니다
            </p>
          </div>
        </div>
        <div class="mb-6 w-full flex flex-col items-center">
          <div class="relative">
            <input
              type="password"
              v-model="password"
              placeholder=""
              required
              class="peer w-[360px] h-[61px] dark:text-white text-[16px] rounded-[12px] px-4 py-2 pt-6 focus:outline-none border border-[#DFDFDF] dark:border-[#4D4D4D]"
            />
            <label
              class="absolute left-[16px] top-[12px] text-[#BDBDBD] text-[12px] transition-all duration-200 pointer-events-none origin-[0] peer-focus:top-[12px] peer-focus:text-[12px] peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-[20px]"
              >비밀번호</label
            >
          </div>
        </div>
        <button
          type="submit"
          :disabled="isLoginDisabled"
          :class="[
            'w-[360px] h-[50px] text-white text-[16px] font-semibold rounded-[10px] mx-[40px] transition-colors duration-300 ',
            isLoginDisabled
              ? 'bg-[#B3B3B3] cursor-not-allowed dark:bg-[#363636]'
              : 'bg-[#7537e3]  hover:bg-[#601ED5] cursor-pointer',
          ]"
        >
          로그인
        </button>
      </form>
      <div class="flex items-center w-[360px] my-[32px]">
        <div class="flex-grow border-t border-[#ADADAD] dark:border-[#585858]"></div>
        <span class="mx-4 text-[#ADADAD] text-[16px] dark:border-[#585858]">또는</span>
        <div class="flex-grow border-t border-[#ADADAD] dark:border-[#585858]"></div>
      </div>
      <div class="flex flex-col gap-[12px] items-center w-full">
        <button
          class="flex items-center justify-center border border-[#DFDFDF] dark:hover:bg-[#3a3a3a] dark:border-[#4D4D4D] dark:text-white rounded-[8px] py-2 text-[16px] font-medium w-[360px] h-[50px] hover:bg-[#F9F9F9] transition-colors duration-300 cursor-pointer"
          @click="onGoogleLogin"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            class="w-5 h-5 mr-2"
          />
          구글 로그인
        </button>
      </div>
      <div class="text-center font-semibold text-[16px] my-[40px] text-[#929292] w-full">
        <router-link to="/signup">
          <p
            class="underline hover:text-[#191919] dark:hover:text-white transition-colors duration-300"
          >
            회원가입 하기
          </p>
        </router-link>
      </div>
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
