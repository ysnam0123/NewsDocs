<script setup>
import { userAuthStore } from '@/stores/authStore'
import supabase from '@/utils/supabase'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import UserForm from '@/components/UserForm.vue'
import { editProfileSchema } from '@/utils/userSchema'
import { getCurrentUser } from '@/api/getCurrentUser'
import { fetchUser } from '@/api/fetchUser'

const toast = useToast()
const authStore = userAuthStore()
const router = useRouter()
const currentUser = ref(null)
//중복 체크 결과
const isNicknameAvailable = ref(false)
const isCheckingNickname = ref(false)

const form = ref(null)

onMounted(async () => {
  try {
    const user = await getCurrentUser()
    currentUser.value = await fetchUser(user?.id)
  } catch (e) {
    alert(e.message)
  }
})

//입력 값 감지 변화 (이메일, 닉네임)

watch(
  () => form.value?.values.nickname,
  () => {
    isNicknameAvailable.value = false
  },
)

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

//회원 정보 수정
async function onEdit(values) {
  console.log(values)

  if (!isNicknameAvailable.value) {
    toast.error('닉네임 중복 확인을 완료해주세요.')
    return
  }

  try {
    // 현재 로그인 유저 정보 새로 받아오기
    const user = await getCurrentUser()
    if (!user?.id) throw new Error('로그인된 유저 정보를 찾을 수 없습니다.')
    const profileUser = await fetchUser(user.id)
    if (!profileUser?.user_id) throw new Error('프로필 정보를 찾을 수 없습니다.')
    const now = new Date().toISOString()

    if (values.password) {
      const { error: pwError } = await supabase.auth.updateUser({
        password: values.password,
      })

      if (pwError) {
        toast.error('비밀번호 변경 중 오류 발생: ' + pwError.message)
        return
      }
    }

    const { error: dateError } = await supabase.auth.updateUser({
      updated_at: Date.now(),
    })

    if (dateError) {
      toast.error('업데이트 날짜 변경 중 오류 발생: ' + dateError.message)
      return
    }

    // 프로필 닉네임 업데이트
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ nickname: values.nickname, updated_at: now })
      .eq('user_id', profileUser.user_id)

    if (profileError) {
      toast.error('프로필 닉네임 업데이트 중 오류 발생: ' + profileError.message)
      return
    }

    await authStore.fetchUser()
    toast.success('회원정보 수정이 완료되었습니다.')
    setTimeout(() => {
      router.push('/profile')
    }, 1200)
  } catch (error) {
    toast.error('회원정보 수정 중 알 수 없는 오류가 발생했습니다.')
    console.error('onEdit error:', error)
  }
}

//회원정보 수정 버튼 비활성화
const isDisabled = computed(() => {
  if (!form.value) return true
  const { errors, values } = form.value
  return (
    !isNicknameAvailable.value ||
    Object.keys(errors).length > 0 ||
    !values.nickname ||
    !values.password ||
    !values.passwordCheck
  )
})
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <div class="mx-auto p-[30px]">
      <div class="flex justify-between">
        <div class="flex flex-col justify-center space-y-4"></div>
        <div class="sticky top-[40px] self-start">
          <div class="flex flex-col items-end space-y-2 ml-[46px]">
            <UserForm
              ref="form"
              :schema="editProfileSchema"
              :show-email="false"
              :show-name="false"
              :on-check-nickname="checkNicknameDuplicate"
              :is-nickname-available="isNicknameAvailable"
              :disabled="isDisabled"
              @submit="onEdit"
            >
              <template #submit>
                <button
                  class="w-[123px] h-[44px] bg-[#7537E3] rounded-lg text-sm text-white cursor-pointer hover:bg-[#601ED5] dark:bg-[#7846D2] dark:hover:bg-[#6524D9]"
                >
                  변경사항 저장
                </button></template
              >
            </UserForm>

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
