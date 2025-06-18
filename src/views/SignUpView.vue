<script setup>
import { userAuthStore } from '@/stores/authStore'
import supabase from '@/utils/supabase'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import UserForm from '@/components/UserForm.vue'
import { signUpSchema } from '@/utils/userSchema'
import DarkModeButton from '@/components/common/DarkModeButton.vue'

const toast = useToast()
const router = useRouter()
const authStore = userAuthStore()

//중복 체크 결과
const isEmailAvailable = ref(false)
const isNicknameAvailable = ref(false)
const isCheckingEmail = ref(false)
const isCheckingNickname = ref(false)

const form = ref(null)

//입력 값 감지 변화 (이메일, 닉네임)
watch(
  () => form.value?.values.email,
  () => {
    isEmailAvailable.value = false
  },
)

watch(
  () => form.value?.values.nickname,
  () => {
    isNicknameAvailable.value = false
  },
)

//이메일 중복 확인
async function checkEmailDuplicate() {
  if (!form.value) {
    console.error('Form is null in checkEmailDuplicate')
    toast.error('폼이 초기화되지 않았습니다. 다시 시도해주세요.')
    return
  }
  const { values, setFieldError } = form.value
  if (!values.email) return
  isCheckingEmail.value = true
  try {
    const { data } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', values.email)
      .maybeSingle()
    if (data) {
      setFieldError('email', '이미 등록된 이메일입니다.')
      isEmailAvailable.value = false
    } else {
      setFieldError('email', '')
      isEmailAvailable.value = true
    }
  } catch (error) {
    toast.error('이메일 확인 중 오류가 발생했습니다.')
    console.error('checkEmailDuplicate error:', error)
  } finally {
    isCheckingEmail.value = false
  }
}

//닉네임 중복 확인
async function checkNicknameDuplicate() {
  if (!form.value) {
    toast.error('폼이 초기화되지 않았습니다. 다시 시도해주세요.')
    return
  }
  const { values, setFieldError } = form.value
  if (!values.nickname) return
  isCheckingNickname.value = true
  try {
    const { data } = await supabase
      .from('profiles')
      .select('nickname')
      .eq('nickname', values.nickname)
      .maybeSingle()
    if (data) {
      setFieldError('nickname', '이미 등록된 닉네임입니다.')
      isNicknameAvailable.value = false
    } else {
      setFieldError('nickname', '')
      isNicknameAvailable.value = true
    }
  } catch (error) {
    toast.error('닉네임 확인 중 오류가 발생했습니다.')
    console.error('checkNicknameDuplicate error:', error)
  } finally {
    isCheckingNickname.value = false
  }
}

//회원 가입 post - superbase연동
async function onSignUp(values) {
  console.log(values)
  if (!isEmailAvailable.value || !isNicknameAvailable.value) {
    toast.error('이메일과 닉네임 중복 확인을 완료해주세요.')
    return
  }

  try {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
          nickname: values.nickname,
        },
      },
    })

    if (error) {
      toast.error('회원가입에 문제가 발생했습니다: ' + error.message)
      return
    }

    await authStore.fetchUser()
    toast.success('회원가입이 완료되었습니다. 이메일을 확인해주세요!')
    setTimeout(() => {
      router.push('/interest')
    }, 1200)
  } catch (error) {
    toast.error('회원가입 중 오류가 발생했습니다.')
    console.error('onSignUp error:', error)
  }
}

//회원가입 버튼 비활성화
const isDisabled = computed(() => {
  if (!form.value) return true
  const { errors, values } = form.value
  return (
    !isEmailAvailable.value ||
    !isNicknameAvailable.value ||
    Object.keys(errors).length > 0 ||
    !values.email ||
    !values.name ||
    !values.nickname ||
    !values.password ||
    !values.passwordCheck
  )
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center sm:bg-[#EDEBF1] sm:dark:bg-[#1F1F1F] dark:bg-[#262626] relative"
  >
    <!-- 다크모드 버튼 -->
    <div class="absolute sm:top-10 sm:right-10 top-6 right-6 z-50">
      <DarkModeButton />
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
      <UserForm
        ref="form"
        :schema="signUpSchema"
        :show-email="true"
        :show-name="true"
        :on-check-email="checkEmailDuplicate"
        :on-check-nickname="checkNicknameDuplicate"
        :is-email-available="isEmailAvailable"
        :is-nickname-available="isNicknameAvailable"
        :disabled="isDisabled"
        @submit="onSignUp"
        class="max-w-85"
      >
        <template #submit>회원가입</template>
      </UserForm>
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
