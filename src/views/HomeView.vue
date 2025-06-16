<script setup>
import { useAuthStore } from '@/stores/auth'
import supabase from '@/utils/supabase'
import { onMounted } from 'vue'

const authStore = useAuthStore()

// 컴포넌트 마운트 시 사용자 상태 확인
onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    authStore.setAuth(user, null) // 프로필은 필요 시 추가 로직
  } else {
    authStore.clearAuth()
  }
})
</script>

<template>
  <div>
    <h1>HomeView Vue가 될 곳...</h1>
    <!-- 로그인 상태에 따라 조건부 렌더링 -->
    <div v-if="authStore.user">
      <h2>환영합니다, {{ authStore.user.email }}!</h2>
      <p>로그인된 사용자 전용 콘텐츠입니다.</p>
    </div>
    <div v-else>
      <h2>로그인해주세요</h2>
      <p>로그인 후 더 많은 기능을 이용할 수 있습니다.</p>
      <button @click="$router.push('/login')">로그인</button>
    </div>
  </div>
</template>
