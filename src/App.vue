<script setup>
import { onMounted } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import { userAuthStore } from '@/stores/authStore'
//현재 로그인한 사용자 정보를 콘솔로 출력하고 싶으시면 아래 주석 풀어주시면 됩니다.
//import supabase from './utils/supabase'
const auth = userAuthStore()
// const fetchProfile = async (userId) => {
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('user_id, email, name, nickname, profile_img')
//     .eq('user_id', userId)
//     .single()
//   if (error) {
//     console.error('프로필 정보 불러오기 실패:', error)
//     return null
//   }
//   return data
// }

onMounted(async () => {
  await auth.fetchUser()
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  // if (!user) {
  //   console.log('로그인된 사용자가 없습니다.')
  //   return
  // }
  // // profiles 테이블에서 프로필 정보 가져오기
  // const profile = await fetchProfile(user.id)
  // console.log('현재 로그인한 사용자의 프로필 정보:', profile)
})
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
<style scoped></style>
