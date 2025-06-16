<script setup>
import { useRouter } from 'vue-router'
import { SquareUserRound, LogOut } from 'lucide-vue-next'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { userAuthStore } from '@/stores/authStore'
import supabase from '@/utils/supabase'
import { useNotiStore } from '@/stores/useNotiStore'

const authStore = userAuthStore() // 인증 상태 스토어
const notiStore = useNotiStore() // 알림 스토어

const isOpen = ref(false)
const dropdownRef = ref(null)
const router = useRouter()

const open = () => {
  isOpen.value = true
}
const close = () => {
  isOpen.value = false
}
const toggle = () => {
  isOpen.value = !isOpen.value
}

const goToMypage = () => {
  router.push('/profile')
  close()
}

const logoutHandler = async () => {
  try {
    //로그아웃시 해당 사용자 알림 렌더링 지우기
    await notiStore.removeChannel()
    notiStore.clearNoti()

    const { error } = await supabase.auth.signOut()
    if (error) throw error

    close()
    router.push('/')
  } catch (error) {
    console.error('로그아웃 실패:', error.message)
  }
}

const handleClickOutside = (event) => {
  if (isOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    close()
  }
}

const handleProfileClick = () => {
  if (!authStore.isLoggedIn) {
    router.push('/login') // 로그인되지 않은 경우 로그인 페이지로 이동
  } else {
    toggle() // 로그인된 경우 드롭다운 열기
  }
}

onMounted(() => {
  authStore.initialize()
  console.log('Initial isLoggedIn:', authStore.isLoggedIn)
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

defineExpose({ open, close, toggle, isOpen })
</script>

<template>
  <div class="relative inline-block z-[1000]" ref="dropdownRef">
    <slot name="activator" :toggle="handleProfileClick" :isOpen="isOpen" />
    <div
      v-if="isOpen"
      class="absolute top-[44px] right-0 w-[157px] min-h-[128px] bg-[#FFFFFF] dark:bg-[#363636] rounded-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.16)]"
    >
      <ul class="w-full text-[12px] text-[#C9C9C9] dark:text-[#7A7A7A]">
        <span class="ml-3 mt-3 block">내 계정</span>
        <li
          @click="goToMypage"
          class="flex items-center gap-[6px] w-full h-[46px] mt-[7px] px-3 py-[13px] cursor-pointer text-[14px] text-[#191919] dark:text-[#FFFFFF] hover:bg-gray-100 dark:hover:bg-[#404040] transition-all duration-300"
        >
          <SquareUserRound class="w-4 h-4 dark:text-[#FFFFFF]" />
          마이페이지 가기
        </li>
        <li
          @click="logoutHandler"
          class="flex items-center gap-[6px] w-full h-[46px] px-3 py-[13px] cursor-pointer text-[14px] text-[#E03333] dark:text-[#FF4D4D] hover:bg-gray-100 dark:hover:bg-[#404040] transition-all duration-300"
        >
          <LogOut class="w-4 h-4" />
          로그아웃
        </li>
      </ul>
    </div>
  </div>
</template>
