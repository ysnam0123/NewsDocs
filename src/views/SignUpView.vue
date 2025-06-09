<script setup>
import { userAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/useDarkmode'
import supabase from '@/utils/supabase'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const email = ref('')
const name = ref('')
const nickname = ref('')
const password = ref('')
const passwordCheck = ref('')

const errorMsg = ref('')
const nicknameError = ref('')
const emailError = ref('')
const nameError = ref('')
const passwordError = ref('')
const passwordCheckError = ref('')

const router = useRouter()
const authStore = userAuthStore()

const { toggleDark } = useThemeStore()

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = '이메일을 입력해주세요.'
  } else if (!emailPattern.test(email.value)) {
    emailError.value = '이메일 형식이 올바르지 않습니다.'
  } else {
    emailError.value = ''
  }
}

function validateName() {
  const namePattern = /^[가-힣]{2,12}$/
  if (!name.value) {
    nameError.value = '이름을 입력해주세요.'
  } else if (!namePattern.test(name.value)) {
    nameError.value = '2-12글자 한글로 입력해주세요.'
  } else {
    nameError.value = ''
  }
}

function validateNickName() {
  const nicknamePattern = /^[A-Za-z0-9가-힣]{2,8}$/
  if (!nickname.value) {
    nicknameError.value = '닉네임을 입력해주세요.'
  } else if (!nicknamePattern.test(nickname.value)) {
    nicknameError.value = '특수문자, 공백 제외 2~8글자로 입력해주세요.'
  } else {
    nicknameError.value = ''
  }
}

function validatePassword() {
  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,14}$/
  if (!password.value) {
    passwordError.value = '비밀번호를 입력해주세요.'
  } else if (!pwPattern.test(password.value)) {
    passwordError.value = '8~14자 영문, 숫자, 특수기호를 포함해주세요.'
  } else {
    passwordError.value = ''
  }
}

function validatePasswordCheck() {
  if (!passwordCheck.value) {
    passwordCheckError.value = '비밀번호 확인을 입력해주세요.'
  } else if (password.value !== passwordCheck.value) {
    passwordCheckError.value = '비밀번호가 일치하지 않습니다.'
  } else {
    passwordCheckError.value = ''
  }
}

//input 값 변경시 검증 실행
watch(email, () => validateEmail())
watch(name, () => validateName())
watch(nickname, () => validateNickName())
watch(password, () => validatePassword())
watch(passwordCheck, () => validatePasswordCheck())

//회원 가입 post - superbase연동
async function onSignUp() {
  validateEmail()
  validateName()
  validateNickName()
  validatePassword()
  validatePasswordCheck()

  if (
    emailError.value ||
    nameError.value ||
    nicknameError.value ||
    passwordError.value ||
    passwordCheckError.value
  ) {
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value,
        nickname: nickname.value,
      },
    },
  })

  if (error) {
    errorMsg.value = error.message
    return
  }
  toast.success('회원가입이 완료되었습니다. 이메일을 확인해주세요.')
  router.push('/login')
}

//회원가입 버튼 비활성화
const isDisabled = computed(
  () =>
    emailError.value ||
    nameError.value ||
    nicknameError.value ||
    passwordError.value ||
    passwordCheckError.value ||
    !email.value ||
    !name.value ||
    !nickname.value ||
    !password.value ||
    !passwordCheck.value,
)
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-[#EDEBF1] relativ dark:bg-[#1F1F1F]">
    <!-- 다크모드 버튼 -->
    <div
      class="absolute top-10 right-10 w-[40px] h-[40px] cursor-pointer rounded-[100%] bg-[#F6F6F6] dark:bg-[#262626] hover:bg-white flex items-center justify-center z-50 transition-colors duration-300"
      @click="toggleDark()"
    >
      <img src="@/assets/icons/toDarkMode.svg" alt="modeToggle" class="w-[24px] h-[24px]" />
    </div>
    <div
      class="bg-white dark:bg-[#262626] rounded-[20px] w-[464px] min-h-[779px] py-10 flex flex-col items-center justify-center"
    >
      <router-link to="/">
        <img src="@/assets/img/logo.svg" alt="logo" class="w-[46px] h-[46px] mx-auto" />
        <h1
          class="text-[40px] mb-6 text-center font-extrabold luckiest-guy-regular dark:text-white"
        >
          newsDocs
        </h1>
      </router-link>
      <form @submit.prevent="onSignUp" class="flex flex-col items-center w-full">
        <div class="mb-5 w-full flex flex-col items-center">
          <label
            class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
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
                  'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
                  emailError ? 'border-[#F34040] ' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
                ]"
              />
              <button
                type="button"
                class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer dark:text-[#B185FF] dark:border-[#B185FF] dark:hover:border-[#6524D9] dark:hover:bg-[#6524D9] hover:dark:text-white transition-all duration-300"
              >
                확인
              </button>
            </div>
            <p v-if="emailError" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
              {{ emailError }}
            </p>
          </div>
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label
            class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
            >이름</label
          >

          <div class="relative flex flex-col">
            <input
              type="text"
              v-model="name"
              placeholder="이름 입력"
              required
              :class="[
                'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
                nameError ? 'border-[#F34040] ' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
              ]"
            />
            <p v-if="nameError" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
              {{ nameError }}
            </p>
          </div>
          <div class="mb-5 w-full flex flex-col items-center"></div>
          <label
            class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
            >닉네임</label
          >
          <div class="relative flex flex-col">
            <div class="flex items-center relative">
              <input
                type="text"
                v-model="nickname"
                placeholder="특수문자, 공백 제외 2-8글자"
                required
                :class="[
                  'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
                  nicknameError ? 'border-[#F34040] ' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
                ]"
              />
              <button
                type="button"
                class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer dark:text-[#B185FF] dark:border-[#B185FF] dark:hover:border-[#6524D9] dark:hover:bg-[#6524D9] hover:dark:text-white transition-all duration-300"
              >
                확인
              </button>
            </div>
            <p v-if="nicknameError" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
              {{ nicknameError }}
            </p>
          </div>
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label
            class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
            >비밀번호</label
          >
          <div class="relative flex flex-col">
            <input
              type="password"
              v-model="password"
              placeholder="비밀번호 입력"
              required
              :class="[
                'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
                passwordError ? 'border-[#F34040] ' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
              ]"
            />
            <p v-if="passwordError" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
              {{ passwordError }}
            </p>
          </div>
        </div>
        <div class="mb-5 w-full flex flex-col items-center">
          <label
            class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
            >비밀번호 확인</label
          >
          <div class="relative flex flex-col">
            <input
              type="password"
              v-model="passwordCheck"
              placeholder="비밀번호 확인"
              required
              :class="[
                'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white ',
                passwordCheckError ? 'border-[#F34040] ' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
              ]"
            />
            <p
              v-if="passwordCheckError"
              class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]"
            >
              {{ passwordCheckError }}
            </p>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isDisabled"
          class="w-[360px] h-[50px] bg-[#7537e3] text-white text-[16px] font-semibold rounded-[8px] mt-[10px] mx-[40px] hover:bg-[#601ED5] cursor-pointer transition-colors duration-300 disabled:bg-[#F2F2F2] disabled:text-[#B3B3B3] disabled:cursor-not-allowed disabled:hover:bg-[#F2F2F2]"
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
